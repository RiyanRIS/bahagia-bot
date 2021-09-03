const axios = require("axios")
const cheerio = require("cheerio")
const FormData = require('form-data')
const qs = require('qs')

let url = "https://www.tiktok.com/@eizanetsuya/video/6930475406512393473?sender_device=mobile&sender_web_id=6989058540183455233&is_from_webapp=v1&is_copy_url=0"

const tt_downloader = async (url) => {
  console.log("ttdl1 process", url)
  let formdata = new FormData();

  const tes = {
    url: url,
    format: null,
    token: "5bc156b2e8e9c1cca71d97efb7f298c641c07ce92ac8cae0509611330d6725f7"
  }

  axios.post('https://ttdownloader.com/req/', qs.stringify(tes))
    .then((res) => {
      console.log("downloading")
      const $ = cheerio.load(res.data)
      // const dl = $("#wmarked_link")
      console.log(res.data)
     
      return

    })
    .catch((e) => {
      console.error(e)
    })
}

tt_downloader(url)