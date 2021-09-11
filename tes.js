const { json } = require("express")
const downloader = require("./helpers/downloader")

const tw1 = "https://twitter.com/jowoshitpost/status/1435836493897998339?s=20"
const yt1 = "https://www.youtube.com/watch?v=JQnxH-JU9Bg"
const id_invalid = "543101548994"

downloader.pln(id_invalid)
  .then((res) => {
    console.log(res)
  })
  .catch((e) => {
    console.error(e)
  })

