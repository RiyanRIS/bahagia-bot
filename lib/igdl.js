// Module Instagram Downloader
// SPECIAL THANKS TO :
// 1. https://keeppost.com/
// 2. https://github.com/Ayesh/InstagramDownload
// 3. https://zekais-api.herokuapp.com

const axios = require("axios")
const fs = require("fs")
const http = require("https")
const cheerio = require("cheerio")
const FormData = require('form-data')
const qs = require('qs')
const api = require('../src/api_key')

const pesan = {
  url_tidak_ditemukan: `Url video tidak valid atau kami tidak menemukan apapun!`,
  tidak_berhasil_alasan_server: `Maaf, terjadi kesalahan pada server atau url yang kamu beri tidak mengandung video, ulangi beberapa saat lagi.`
}

const igdl = async (url) => {
  console.log("igdl process", url)

  const path = "./public/igdl.mp4"

  let res = {
    status: false,
    msg: null,
    data: null,
    link: null
  }
  
  const percobaan_pertama = async (url) => {
    await axios.get("https://keeppost.com/")
      .then(async (res) => {
        const $ = cheerio.load(res.data)
        const build_id = $("input[name=build_id]").attr("value")
        const build_key = $("input[name=build_key]").attr("value")

        let formdata = new FormData();

        const tes = {
          url,
          build_id,
          build_key
        }

        await axios.post('https://keeppost.com/process.php', qs.stringify(tes), { header: formdata.getHeaders()})
          .then(async (res) => {

            console.log("downloading")

            const $ = cheerio.load(res.data)
            const link_download = $("a").attr("href")

            if(link_download){
              const file = fs.createWriteStream(path)
              const request = http.get(link_download, function (response) {
                response.pipe(file);
              })

              await new Promise((resolve, reject) => {
                file.on("error", reject)
                request.on("error", reject)
                file.on("finish", resolve)
              })
                .then(() => {
                  res.status = true
                  res.data = path
                  res.link = link_download
                })
                .catch((e) => {
                  console.error(e)
                })
            }
        })
        .catch((e) => {
          console.error(e)
        })
    })
    .catch((e) => {
      console.error(e)
    })
  }
  
  await percobaan_pertama(url)

  // cek keberhasilan
  if(res.status){
    console.log("percobaan pertama berhasil")
    return res
  }

  const percobaan_kedua = async (url) => {
    await axios.get('https://zekais-api.herokuapp.com/igdl2?url=' + url + `&apikey=${api.key.zekais.tiga}`)
    .then(async (res) => {
      if(res.data.status == 200){
        const link_download = res.data.result[0].url
        if(link_download){
          console.log("downloading")

          const file = fs.createWriteStream(path)
          const request = http.get(link_download, function (response) {
            response.pipe(file)
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
  igdl
}