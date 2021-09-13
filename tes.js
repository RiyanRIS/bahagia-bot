const downloader = require("./helpers/downloader")

const tw = "https://twitter.com/jowoshitpost/status/1435836493897998339?s=20"
const yt = "https://www.youtube.com/watch?v=JQnxH-JU9Bg"
const tt = "https://www.tiktok.com/@tiktok/video/6800111723257941253"
// const id_invalid = "543101548994" // PLN nomor ga ada
// const id_valid = "514030090860" // PLN nomor sudah bayar
const id_cek = "511810935121" // PLN nomor belum bayar
const igs = "https://www.instagram.com/p/CMAMhvgsVal/" // multi video and image)
const ig_vid = "https://www.instagram.com/p/CK1i-IXHpgC/" // video only
const ig_img = "https://www.instagram.com/p/CFy-rDDgPKK/" // iamge only

const no = "89677249060"
// sms_oyo
// sms_mapclub
// sms_icq
// sms_fave

downloader.pln(id_cek)
  .then((res) => {
    console.log(res)
  })
  .catch((e) => {
    console.error(e)
  })

