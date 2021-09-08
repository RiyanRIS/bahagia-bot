// Module Tiktok Downloader
// SPECIAL THANKS TO :
//    https://ttdownloader.com
//    http://sosmeeed.herokuapp.com:80
//    https://recoders-area.caliph.repl.co/api

const axios = require("axios")
const fs = require("fs")
const http = require("https")
const cheerio = require("cheerio")
const FormData = require('form-data')
const qs = require('qs')
const api = require('../src/api_key')
const FileType = require('file-type')
const got = require('got')

const pesan = {
  url_tidak_ditemukan: `Url video tidak valid atau kami tidak menemukan apapun!`,
  tidak_berhasil_alasan_server: `Maaf, terjadi kesalahan pada server atau url yang kamu beri tidak mengandung video, ulangi beberapa saat lagi.`
}

const ttdl = async (url) => {
  console.log("ttdl process", url)

  const path = "./public/ttdl.mp4"

  let res = {
    status: false,
    msg: null,
    link: null,
    tipe: null
  }

  // https://ttdownloader.com/
  const ttdownloader = async (url) => {
    await axios.get('https://ttdownloader.com/',{
        headers: {
          "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
          "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
          "cookie": "PHPSESSID=9ut8phujrprrmll6oc3bist01t; popCookie=1; _ga=GA1.2.1068750365.1625213061; _gid=GA1.2.842420949.1625213061"
        }
    })
      .then(async ({ data }) => {
        const $ = cheerio.load(data)
        let token = $('#token').attr('value')
        let config = {
          'url': url,
          'format': '',
          'token': token
        }
        await axios('https://ttdownloader.com/req/',{
          method: 'POST',
          data : new URLSearchParams(Object.entries(config)),
          headers: {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
            "cookie": "PHPSESSID=9ut8phujrprrmll6oc3bist01t; popCookie=1; _ga=GA1.2.1068750365.1625213061; _gid=GA1.2.842420949.1625213061"
          }
        })
          .then(async ({ data }) => {
            const $ = cheerio.load(data)
            const link_download = $('div:nth-child(2) > div.download > a').attr('href')
            if(link_download){
              const stream = got.stream(link_download)

              stream
                .on("downloadProgress", ({ transferred, total, percent }) => {
                  const percentage = Math.round(percent * 100)
                  console.error(`progress: ${transferred}/${total} (${percentage}%)`)
                })
                .on("error", (error) => {
                  console.error(`Download failed: ${error.message}`, e)
                })

              const filetype = await FileType.fromStream(stream)
              if(filetype.ext == "mp4"){
                res = {
                  status: true,
                  msg: "Berhasil mendapatkan data",
                  link: link_download,
                  tipe: filetype
                }
              }
            }
          })
      })
  }

  await ttdownloader(url)

  // cek keberhasilan
  if(res.status){
    console.log("percobaan ttdownloader.com berhasil")
    return res
  }
  
  const percobaan_pertama = async (url) => {
    await axios.post("http://sosmeeed.herokuapp.com:80/api/tiktok/video", {
      url: url.split("?")[0]
    })
      .then(async (res) => {
        if(res.data.success){
          console.log("downloading")
          const link_download = res.data.data.video
          const file = fs.createWriteStream(path)
          const request = http.get(link_download, function (response) {
            response.pipe(file)
          })

          await new Promise((resolve, reject) => {
            file.on("error", reject)
            request.on("error", reject)
            file.on("finish", resolve)
          })
            .then(() => {
              res = {
                status: true,
                data: path,
                link: link_download
              }
            })
            .catch((e) => {
              console.error(e)
            })
        }
      })
  }
  
  await percobaan_pertama(url)

  // cek keberhasilan
  if(res.status){
    console.log("percobaan pertama berhasil")
    return res
  }

  const percobaan_kedua = async (url) => {
    await axios.get('https://recoders-area.caliph.repl.co/api/tiktod/?url=' + url)
      .then(async (res) => {
        if(res.data.status == 200){
          console.log("downloading")
          const link_download = res.data.result.nowatermark
          if(link_download){
            const file = fs.createWriteStream(path)
            const request = http.get(link_download, function (response) {
              response.pipe(file);
            })
            await new Promise((resolve, reject) => {
              file.on("error", reject(e))
              request.on("error", reject(e))
              file.on("finish", resolve)
            })
              .then((res) => {
                console.log("berhasil download")
                res = {
                  status: true,
                  data: path,
                  link: link_download
                }
              })
              .catch((e) => {
                console.error(e)
              })
          }
        }
    })
  }

  await percobaan_kedua(url)

  // cek keberhasilan
  if(res.status){
    console.log("percobaan kedua berhasil")
    return res
  }

  res.msg = pesan.tidak_berhasil_alasan_server
  return res
}

module.exports = {
  ttdl
}