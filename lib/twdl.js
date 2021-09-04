// Module Twitter Downloader
// SPECIAL THANKS TO :
// 1. http://sosmeeed.herokuapp.com:80
// 2. https://zekais-api.herokuapp.com

const axios = require("axios")
const http = require("https")
const fs = require("fs")
const api = require("../src/api_key")

const pesan = {
  url_tidak_ditemukan: `Url video tidak valid atau kami tidak menemukan apapun!`,
  tidak_berhasil_alasan_server: `Maaf, terjadi kesalahan pada server atau url yang kamu beri tidak mengandung video, ulangi beberapa saat lagi.`
}

const twdl = async (url) => {
  console.log("twd1 processing", url)

  const path = "./public/tw_video.mp4"

  let res = {
    status: false,
    msg: null,
    data: null,
    link: null
  }

  // Percobaan pertama
  const percobaan_pertama = async (url) => {
    await axios.post("http://sosmeeed.herokuapp.com:80/api/twitter/video", {
      url: url.split("?")[0]
    })
      .then(async (response) => {
        if(response.data.success){
          console.log("downloading")
          const link_download = response.data.data.data[0].link
          const file = fs.createWriteStream(path)
          const request = http.get(link_download, function (response) {
            response.pipe(file)
          })
  
          await new Promise((resolve, reject) => {
            file.on('error', reject)
            request.on('error', reject)
            file.on('finish', resolve)
          })
            .then(() => {
              res.status = true
              res.data = path
              res.link = link_download
            })
            .catch((e) => {
              console.log(e)
            })
        }
      })
      .catch((e) => {
        console.log(e)
      })
  }
  
  await percobaan_pertama(url)

  // Jika masih kosong gunakan Percobaan kedua
  if(res.status){
    console.log("percobaan pertama berhasil")
    return res
  }

  // Percobaan kedua
  const percobaan_kedua = async (url) => {
    axios.get('https://zekais-api.herokuapp.com/twtdl?url=' + url + `&apikey=${api.key.zekais.satu}`)
      .then(async (res) => {
        if(res.data.status == 200){
          console.log("downloading")
          const link_download = res.data.result
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
        }
      })
      .catch((e) => {
        console.error(e)
      })
  }

  console.log("percobaan pertama gagal, memulai percobaan kedua")
  await percobaan_kedua(url)

  // Jika masih kosong gunakan Percobaan ketiga
  if(res.status){
    console.log("percobaan kedua berhasil")
    return res
  }

  // Percobaan ketiga
  const percobaan_ketiga = async (url) => {
    axios.get('https://zekais-api.herokuapp.com/twtdl?url=' + url + `&apikey=${api.key.zekais.dua}`)
      .then(async (res) => {
        if(res.data.status == 200){
          console.log("downloading")
          const link_download = res.data.result
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
        }
      })
      .catch((e) => {
        console.error(e)
      })
  }

  console.log("percobaan kedua gagal, memulai percobaan ketiga")
  await percobaan_ketiga(url)

  // Jika masih kosong gunakan percobaan keempat
  if(res.status){
    console.log("percobaan ketiga berhasil")
    return res
  }

  // Kami telah berupaya semaksimal mungkin
  res.msg = pesan.tidak_berhasil_alasan_server
  return res

}

module.exports = {
  twdl
}