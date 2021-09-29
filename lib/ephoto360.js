const axios = require("axios")
const cheerio = require("cheerio")
const FormData = require("form-data")
const fs = require("fs")

module.exports.ephoto360 = (text, url, image = null) => {
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
      console.log("getting token: " + token)
  
      const form = new FormData()
      if(text != null){ 
        if (typeof text === "string") text = [text]
        for (let texts of text) form.append("text[]", texts)
      }
  
      if(image != null) {
        form.append("image[]", image)
        form.append("file_image_input", '')
      }
  
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
  
        console.log("get second token: "+val.token)
  
        const form = new FormData()
        if(text != null){ 
          if (typeof text === "string") text = [text]
          for (let texts of text) form.append("text[]", texts)
        }
    
        if(image != null) {
          if (typeof image === "string") image = [image]
          for (let texts of image) form.append("image[]", texts)
          form.append("file_image_input", '')
        }
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
          console.log("success: " + url)
          resolve({status: true, image: url})
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

module.exports.ephoto360img = (url, path, text = null) => {
  return new Promise(async (resolve, reject) => {
    let formData = new FormData()
    let imagefile = fs.readFileSync(path)
    formData.append("file", imagefile, "sayangkamu.png")

    let headersss = {
      'accept': '*/*',
      'origin': 'https://en.ephoto360.com',
      'referer': 'https://en.ephoto360.com/',
      'Content-Type': 'multipart/form-data',
      ...formData.getHeaders(),
    }

    await axios.post("https://e2.yotools.net/upload", formData.getBuffer(), { headers: headersss })
      .then(async(res) => {
        let imagee = {
          image: res.data.uploaded_file,
          image_thumb: res.data.thumb_file,
          icon_file: res.data.icon_file,
          x:90.8545727136432,
          y:-4.00152883312704,
          width:280,
          height:280,
          rotate:0,
          scaleX:1,
          scaleY:1,
          thumb_width:400
        }
        await this.ephoto360(text, url, JSON.stringify(imagee))
          .then((res) => {
            resolve(res)
          })
          .catch((e) => {
            reject(e)
          })
      })
      .catch((e) => {
        reject(e.message)
      })
  })
}