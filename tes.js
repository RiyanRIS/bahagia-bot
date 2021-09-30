const fun = require("./helpers/function")
const dl = require("./helpers/downloader")
const {ttdl} = require("./lib/ttdl")
const axios = require("axios")
const cheerio = require("cheerio")
const FormData = require("form-data")
const FileType = require('file-type')
const got = require('got')
const fs = require("fs")
const request = require("request")

// let no = "089677249060"
// let no = "6289677249060"
// let no = "+6289677249060"
let no = "89677249060"

if(no.startsWith("08")){
  no = no.slice(1,100)
}else if(no.startsWith("62")){
  no = no.slice(2,100)
}else if(no.startsWith("+62")){
  no = no.slice(3,100)
}

console.log(no)

// SPAM SMS
// const {sms_oyo, sms_mapclub, sms_icq, sms_fave, sms_kredinesia, smscall_random, call_jagreward, call_nutriclub, sms_olx,  sms_maucash} = require("./lib/bombsms")

// sms_maucash("85162656460")
//   .then((res) => console.log(res))
//   .catch((e) => console.log(e))

// SCRAPING from en.ephoto360.com
// const {ephoto360} = require("./lib/ephoto360")
// ephoto360("Riyan", "https://en.ephoto360.com/write-in-sand-summer-beach-online-576.html")
//   .then((res) => {
//     console.log(res)
//   }).catch((e) => console.log("error: ", e))

// SCRAPING from textpro.me
// const {textpro} = require("./lib/textpro")

// textpro("Hi", "https://textpro.me/create-a-sketch-text-effect-online-1044.html")
//   .then((res) => {
//     console.log(res)
//   }).catch((e) => console.log(e))

// AI COLORIZE menggunakan algoritmia
// const Algorithmia = require("algorithmia")

// function base64_encode(file) {
//   let bitmap = fs.readFileSync(file);
//   return new Buffer.from(bitmap).toString('base64');
// }
// let base64str = base64_encode("./src/colorize.jpeg")

// var input = {
//   "image": "data:image/png;base64," + base64str
// }
// Algorithmia.client("sim0fQz4awLwB0OwNDifIxJLGgt1")
// .algo("deeplearning/ColorfulImageColorization/1.1.14?timeout=300") // timeout is optional
// .pipe(input)
// .then((response) => {
//   // console.log(response.get())
//   if(!response.error){
//     const path = response.result.output.split("//")[1]
//     let url = "https://algorithmia.com/v1/data/" + path
//     console.log(url)
//   } else {
//     console.log(response.error.message)
//   }
// })

// AI DEEP AI COLORIZE PAKE REQUEST API
// var headers = {
//     'api-key': '2f488865-1a7b-498c-8fe4-01c15a402c9a'
// };

// var options = {
//     url: 'https://api.deepai.org/api/colorizer',
//     method: 'POST',
//     headers: headers
// };

// function callback(error, response, body) {
//     if (!error && response.statusCode == 200) {
//         console.log(body);
//     } else {
//       console.log(error)
//     }
//     console.log(response)
// }

// request(options, callback);

// AI DEEP AI COLORIZE PAKE LIBRARY
// const deepai = require('deepai')
// deepai.setApiKey('2f488865-1a7b-498c-8fe4-01c15a402c9a');

// (async function() {
//     var resp = await deepai.callStandardApi("colorizer", {
//             image: fs.createReadStream("./src/img.jpg"),
//     })
//     console.log(resp);
// })()

// SCRAPER EPHOTO360
// let url = "https://en.ephoto360.com/sketch-effect-42.html"

// let formData = new FormData()
// let imagefile = fs.readFileSync('./src/imgg.png')
// formData.append("file", imagefile, "hai.png")

// let headersss = {
//   'accept': '*/*',
//   'origin': 'https://en.ephoto360.com',
//   'referer': 'https://en.ephoto360.com/',
//   'Content-Type': 'multipart/form-data',
//   ...formData.getHeaders(),
// }

// axios.post("https://e2.yotools.net/upload", formData.getBuffer(), { headers: headersss })
//   .then((res) => {
//     let imagee = {
//       image: res.data.uploaded_file,
//       image_thumb: res.data.thumb_file,
//       icon_file: res.data.icon_file,
//       x:90.8545727136432,
//       y:-2.00152883312704,
//       width:240,
//       height:250,
//       rotate:0,
//       scaleX:1,
//       scaleY:1,
//       thumb_width:400
//     }
//     tes(null, url, JSON.stringify(imagee))
//   })

// const tes = async (text, url, image = null) => {
//   return new Promise(async (resolve, reject) => {
//   await axios.get(url, {
//     withCredentials: true,
//     headers: {
//       "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
//       "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
//     }
//   }).then(async (res) => { // Get pertama, ambil token sama kuki
//     const $ = cheerio.load(res.data)
//     const cookies = res.headers['set-cookie'].toString()
//     const token = $('input[name="token"]').attr("value")
//     console.log("getting token: " + token)

//     const form = new FormData()
//     if(text != null){ 
//       if (typeof text === "string") text = [text]
//       for (let texts of text) form.append("text[]", texts)
//     }

//     if(image != null) {
//       form.append("image[]", image)
//       form.append("file_image_input", '')
//     }

//     form.append("submit", "GO")
//     form.append("token", token)
//     form.append("build_server", "https://e2.yotools.net")
//     form.append("build_server_id", 6)

//     let headersss = {
//       'accept': '*/*',
//       'origin': 'https://en.ephoto360.com',
//       'cookie': cookies,
//       'referer': url,
//       'Content-Type': 'multipart/form-data',
//       ...form.getHeaders(),
//     }

//     await axios(url, {
//       method: 'POST',
//       data: form.getBuffer(),
//       headers: headersss,
//     }).then(async (ress) => { // POST kirim data
//       const $ = cheerio.load(ress.data)
//       const input = $("#form_value_input").attr("value")
//       const val = JSON.parse(input)

//       console.log("get second token: "+val.token)

//       const form = new FormData()
//       if(text != null){ 
//         if (typeof text === "string") text = [text]
//         for (let texts of text) form.append("text[]", texts)
//       }
  
//       if(image != null) {
//         if (typeof image === "string") image = [image]
//         for (let texts of image) form.append("image[]", texts)
//         form.append("file_image_input", '')
//       }
//       form.append("id", val.id)
//       form.append("token", val.token)
//       form.append("build_server", val.build_server)
//       form.append("build_server_id", val.build_server_id)

//       let headersss = {
//         'accept': '*/*',
//         'origin': 'https://en.ephoto360.com',
//         'cookie': cookies,
//         'referer': url,
//         'Content-Type': 'multipart/form-data',
//         ...form.getHeaders(),
//       }

//       await axios("https://en.ephoto360.com/effect/create-image", {
//         method: "POST",
//         data: form.getBuffer(),
//         headers: headersss,
//       }).then(async (res) => {
//         let url = val.build_server + res.data.image
//         console.log("success: " + url)
//         resolve({status: true, image: url})
//       }).catch((e) => {
//         reject(e.message)
//       })
//     }).catch((e) => {
//       reject(e.message)
//     })
//   }).catch((e) => {
//     reject(e.message)
//   })
// })

// }

// tes([`Riyan`, `Icha`], "https://en.ephoto360.com/write-letters-on-the-balloons-love-189.html")

// const he = async () => {
//   let url = "https://e2.yotools.net/images/user_image/2021/09/61531f84f3795.jpg"
//   let buffer_data = await axios.get(url, { responseType: 'arraybuffer'})
// 	console.log(await FileType.fromBuffer(buffer_data))
// }
// he()

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