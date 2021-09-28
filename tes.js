const fun = require("./helpers/function")
const dl = require("./helpers/downloader")
const {ttdl} = require("./lib/ttdl")
const axios = require("axios")
const cheerio = require("cheerio")
const FormData = require("form-data")
const fs = require("fs")
const request = require("request")

const tes = async (text, url) => {
  return new Promise((resolve, reject) => {
  await axios.get(url, {
    withCredentials: true,
    headers: {
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    }
  }).then(async (res) => { // Get pertama, ambil token sama kuki
    const $ = cheerio.load(res.data)
    const cookies = res.headers['set-cookie'].toString()
    const token = $('input[name="token"]').attr("value")

    const form = new FormData()
    if (typeof text === "string") text = [text]
    for (let texts of text) form.append("text[]", texts)
    form.append("submit", "GO")
    form.append("token", token)
    form.append("build_server", "https://e2.yotools.net")
    form.append("build_server_id", 6)

    let headersss = {
      'accept': '*/*',
      'origin': 'https://en.ephoto360.com',
      'cookie': cookies,
      'referer': url,
      'Content-Type': 'multipart/form-data',
      ...form.getHeaders(),
    }

    await axios(url, {
      method: 'POST',
      data: form.getBuffer(),
      headers: headersss,
    }).then(async (ress) => { // POST kirim data
      const $ = cheerio.load(ress.data)
      const input = $("#form_value_input").attr("value")
      const val = JSON.parse(input)

      const form = new FormData()
      if (typeof text === "string") text = [text]
      for (let texts of text) form.append("text[]", texts)
      form.append("id", val.id)
      form.append("token", val.token)
      form.append("build_server", val.build_server)
      form.append("build_server_id", val.build_server_id)

      let headersss = {
        'accept': '*/*',
        'origin': 'https://en.ephoto360.com',
        'cookie': cookies,
        'referer': url,
        'Content-Type': 'multipart/form-data',
        ...form.getHeaders(),
      }

      await axios("https://en.ephoto360.com/effect/create-image", {
        method: "POST",
        data: form.getBuffer(),
        headers: headersss,
      }).then(async (res) => {
        let url = val.build_server + res.data.image
        resolve({status: true, image: url})
      }).catch((r) => {
        reject(e.message)
      })
    }).catch((e) => {
      reject(e.message)
    })
  }).catch((r) => {
    reject(e.message)
  })
})

}

tes([`Riyan`, `Icha`], "https://en.ephoto360.com/write-letters-on-the-balloons-love-189.html")
// for (let index = 0; index < 10; index++) {
  // let base = "https://cors-tiktok.herokuapp.com/?u="
  // let url = "https://ttdownloader.com/dl.php?v=YTo0OntzOjk6IndhdGVybWFyayI7YjoxO3M6NzoidmlkZW9JZCI7czozMjoiZjVkOWJkNDc0MzUxNzI2NTU1ZWJkYzUxYTUyZjkwMDMiO3M6MzoidWlkIjtzOjMyOiJmMGNjOTg3MmFjOGNlMjc2N2M2Yjk0OWM3ZmViMjMwOCI7czo0OiJ0aW1lIjtpOjE2MzI1NTI4MzQ7fQ=="
  // let url1 = "https://www.tiktok.com/@boqirgracia/video/7011748220388789531?sender_device=pc&sender_web_id=7003580153716557313&is_from_webapp=v1&is_copy_url=0"
  // let urls = "https://www.youtube.com/watch?v=0SlInpIqHiE"
  // let url_ig = "https://www.instagram.com/vincentrompies/"

// const { textpro } = require("./lib/textpro")

// textpro("https://textpro.me/create-a-cool-graffiti-text-on-the-wall-1010.html", ["ini adalah asem kecut", "riyanris"])

  // const ax = async () => {
  //   await dl.igstory(url_ig)
  //     .then(async (igs) => {
  //       try {
  //         igs.forEach(async (element) => {
  //           console.log(element)
  //         })
  //       } catch(e) {
  //         console.log(e)
  //       }
  //     })
  //     .catch((e) => {
  //       console.log(e)
  //     })
  // }
  // ax()
  // axios.get(base + url1).then(({data}) => {
  //   console.log(data)
  // })


// }