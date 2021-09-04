const ytdl = require("ytdl-core")
const fs = require("fs")

const dotenv = require('dotenv')
dotenv.config()
const {
  URL
} = process.env

const pesan = {
  url_tidak_ditemukan: `Url video tidak valid atau kami tidak menemukan apapun!`,
  tidak_berhasil_alasan_server: `Maaf, terjadi kesalahan pada server atau url yang kamu beri tidak mengandung video, ulangi beberapa saat lagi.`
}

const ytmp3 = async (url) => {
  console.log("ytmp3 processing ", url)
  
  const path = `./public/ytdl.mp3`

  let res = {
    status: false,
    msg: null,
    data: null,
    link: null
  }

  // Validasi url yang diberikan, apakah bener dari YouTube
  if (!ytdl.validateURL(url)) {
    res.msg = pesan.url_tidak_ditemukan
    return res
  }

  // percobaan pertama
  const percobaan_pertama = async (url) => {

    const videoID = ytdl.getURLVideoID(url)
    const info = await ytdl.getInfo(videoID)
  
    let stream = ytdl(url, {
      filter: info => info.audioBitrate == 160 || info.audioBitrate == 128
    })
  
    console.log("downloading")

    let simp = fs.createWriteStream(path)
    let simpen = stream.pipe(simp)

    await new Promise((resolve, reject) => {
      simpen.on("error", reject)
      simp.on("error", reject)
      simpen.on("finish", resolve)
    })
      .then(() => {
        res.status = true
        res.data = path
        res.link = URL + "/public/ytdl.mp3"
      })
      .catch((e) => {
        console.error(e)
      })
  }

  await percobaan_pertama(url)

  // Cek keberhasilan
  if(res.status){
    console.log("percobaan pertama berhasil")
    return res
  }

  // Kami telah berupaya semaksimal mungkin
  res.msg = pesan.tidak_berhasil_alasan_server
  return res
}

const ytmp4 = async (url) => {
  console.log("ytmp4 processing ", url)
  
  const path = `./public/ytdl.mp4`

  let res = {
    status: false,
    msg: null,
    data: null,
    link: null
  }

  // Validasi url yang diberikan, apakah bener dari youtube.com ??
  if (!ytdl.validateURL(url)) {
    res.msg = pesan.url_tidak_ditemukan
    return res
  }

  // percobaan pertama
  const percobaan_pertama = async (url) => {

    const videoID = ytdl.getURLVideoID(url)
    const info = await ytdl.getInfo(videoID)
  
    let stream = ytdl(url, {
      filter: info => info.itag == 22 || info.itag == 18
    })
  
    console.log("downloading")

    let simp = fs.createWriteStream(path)
    let simpen = stream.pipe(simp)

    await new Promise((resolve, reject) => {
      simpen.on("error", reject)
      simp.on("error", reject)
      simpen.on("finish", resolve)
    })
      .then(() => {
        res.status = true
        res.data = path
        res.link = URL + "/public/ytdl.mp4"
      })
      .catch((e) => {
        console.error(e)
      })
  }

  await percobaan_pertama(url)

  // Cek keberhasilan
  if(res.status){
    console.log("percobaan pertama berhasil")
    return res
  }

  // Kami telah berupaya semaksimal mungkin
  res.msg = pesan.tidak_berhasil_alasan_server
  return res
}

module.exports = {
  ytmp3, ytmp4
}
