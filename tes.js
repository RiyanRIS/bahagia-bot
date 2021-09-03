const axios = require("axios")
const cheerio = require("cheerio")
const FormData = require('form-data');
const qs = require('qs');

let url_ig = "https://www.instagram.com/p/CTSCLOEBUl6/"

const igdl1 = async (url_ig) => {
console.log("igdl1 processing", url_ig)
axios.get("https://keeppost.com/")
  .then(async (res) => {
    const $ = cheerio.load(res.data)
    const build_id = $("input[name=build_id]").attr("value")
    const build_key = $("input[name=build_key]").attr("value")

    let formdata = new FormData();

    const tes = {
      url: url_ig,
      build_id,
      build_key
    }

    axios.post('https://keeppost.com/process.php', qs.stringify(tes), { header: formdata.getHeaders()})
      .then( (res) => {
        const $ = cheerio.load(res.data)
        const url_video = $("a").attr("href")
        console.log(url_video)
      })
  })
  .catch((e) => {
    console.error(e)
  })
}

igdl1(url_ig)