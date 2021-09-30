const axios = require("axios")
const cheerio = require("cheerio")
const FormData = require("form-data")
const fs = require("fs")

module.exports.textpro = (text, url, image = null) => {
  return new Promise(async (resolve, reject) => {
    if (!/^https:\/\/textpro\.me\/.+\.html$/.test(url)) {
      reject("Enter a Valid URL")
    }

    await axios.get(url, {
      withCredentials: true,
      headers: {
        "User-Agent": "GoogleBot",
      },
    }).then(async(res)=> {
      const $ = cheerio.load(res.data)
      const cookies = res.headers['set-cookie'].toString()
      const token = $('input[name="token"]').attr("value")
      console.log("getting token: " + token)

      const form = new FormData()
      if (typeof text === "string") text = [text]
      for (let texts of text) form.append("text[]", texts)
      form.append("submit", "Go")
      form.append("token", token)
      form.append("build_server", "https://textpro.me")
      form.append("build_server_id", 1)

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
        fs.writeFile("hi.html", ress.data, () => {})
        const $ = cheerio.load(ress.data)
        const input = $("#form_value").first().text()
        const token2 = /<div.*?id="form_value".+>(.*?)<\/div>/.exec(ress.data);
        const token2json = JSON.parse(token2[1])
        const val = JSON.parse(input)
        console.log("get second token: " + val.token)
        let encode = encodeURIComponent;
        let body = Object.keys(token2json)
          .map((key) => {
            let vals = token2json[key]
            let isArray = Array.isArray(vals)
            let keys = encode(key + (isArray ? "[]" : ""))
            if (!isArray) vals = [vals]
            let out = []
            for (let valq of vals) out.push(keys + "=" + encode(valq))
            return out.join("&")
          })
          .join("&")
        const full_url = `https://textpro.me/effect/create-image?${body}`
        await axios(full_url, {
          method: 'GET',
          headers: headersss,
        }).then((res) => {
          resolve({
            status: true,
            image: "https://textpro.me" + res.data.fullsize_image
          })
        }).catch((e) => {
          reject(e.message)
        })
      }).catch((e) => {
        reject(e.message)
      })

    }).catch((e) => {
      reject(e.message)
    })
    
   
    // const caritoken2 = await geturl2.text();
    // const token2 = /<div.*?id="form_value".+>(.*?)<\/div>/.exec(caritoken2);
    // if (!token2) throw new Error("Error! This token is not acceptable!");
    // const prosesimage = await post(
    //   "https://textpro.me/effect/create-image",
    //   JSON.parse(token2[1]),
    //   hasilcookie
    // );
    // const hasil = await prosesimage.json();
    // return `https://textpro.me${hasil.fullsize_image}`
  })

}