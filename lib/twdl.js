// Module Twitter Downloader
// SPECIAL THANKS TO :
//    https://twdown.net/download.php
//    http://sosmeeed.herokuapp.com:80
//    https://zekais-api.herokuapp.com

const axios = require("axios")
const http = require("https")
const fs = require("fs")
const cheerio = require("cheerio")
const qs = require("qs")
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

  // via https://twdown.net
  const twdown = async (url) => {
    let config = {
			'URL': url
		}
		await axios.post('https://twdown.net/download.php', qs.stringify(config),{
			headers: {
				"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
				"sec-ch-ua": '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
				"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
				"cookie": "_ga=GA1.2.1388798541.1625064838; _gid=GA1.2.1351476739.1625064838; __gads=ID=7a60905ab10b2596-229566750eca0064:T=1625064837:RT=1625064837:S=ALNI_Mbg3GGC2b3oBVCUJt9UImup-j20Iw; _gat=1"
			}
		})
      .then(async ({ data }) => {
      const $ = cheerio.load(data)
      const link_download = $('tbody > tr:nth-child(1) > td:nth-child(4) > a').attr('href')
      if(!link_download){ // Jika versi HD ndak ada maka ambil yang versi kecil
        link_download = $('tr:nth-child(2) > td:nth-child(4) > a').attr('href')
      }

      if(link_download){
        console.log("downloading")
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
  }

  await twdown(url)

  if(res.status){
    console.log("percobaan www.twdown.net berhasil")
    return res
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