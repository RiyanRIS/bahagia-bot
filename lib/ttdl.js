// Module Tiktok Downloader
// SPECIAL THANKS TO :
// 1. http://sosmeeed.herokuapp.com:80
// 2. https://recoders-area.caliph.repl.co/api

const axios = require("axios")
const fs = require("fs")
const http = require("https")
const cheerio = require("cheerio")
const FormData = require('form-data')
const qs = require('qs')
const api = require('../src/api_key')
const { resolve } = require("path")
const { reject } = require("async")

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
    data: null,
    link: null
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