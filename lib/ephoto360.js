const axios = require("axios")
const cheerio = require("cheerio")
const FormData = require("form-data")

module.exports.ephoto360 = (text, url) => {
  return new Promise(async (resolve, reject) => {
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
          if(res.data.success) {
            let url = val.build_server + res.data.image
            resolve({status: true, image: url})
          } else {
            reject("Terjadi kesalahan.")
          }
        }).catch((e) => {
          reject(e.message)
        })
      }).catch((e) => {
        reject(e.message)
      })
    }).catch((e) => {
      reject(e.message)
    })
  })
}