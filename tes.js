const fun = require("./helpers/function")
const dl = require("./helpers/downloader")
const {ttdl} = require("./lib/ttdl")
const {pengumum} = require("./lib/game")
const axios = require("axios")
const cheerio = require("cheerio")
const FormData = require("form-data")
const FileType = require('file-type')
const got = require('got')
const fs = require("fs")
const qs = require("qs")
const request = require("request")
const {spawn} = require('child_process');
const {exec} = require('child_process');
const hit = require('./database/hit')
const {lirik, search} = require('./lib/liriklagu')
const {sms_matahari} = require('./lib/bombsms')
const { title } = require("process")

// hit.addtoday().catch((e) => console.log(e))

// TWITTER DL          
dl.twdl("https://twitter.com/maudyayunda/status/1211563785892184064?s=20").then((res) => console.log(res)).catch((e) => console.log(e))

// IG DOWNLOADER
// dl.igdl2("https://www.instagram.com/p/CU67fT6vNky/").then((res) => console.log(res))

// YT DOWNLOADER
// dl.yotube("https://www.youtube.com/watch?v=f7P3mwEcuEg").then((res) => {
//   dl.yotube_download(res.id, res.url_id, res.ext_hd, res.kualitas_hd).then((res) => {
//     console.log(res)
//   })
// })

// SCRAPING LIRIK LAGU
// let param = "Semua tentang kita"
// const BASE = "https://www.musixmatch.com"
// const link = `${BASE}/search/${encodeURI(param)}`

// axios(link, {
//   method: 'get'
// }).then(({data}) => {
//   const $ = cheerio.load(data)
//   let url = $("a.title").attr("href")
//   if(url == undefined){
//     console.log(false)
//   } else {
//     axios.get(BASE + url).then(({data}) => {
//       const $ = cheerio.load(data)
//       let judul = $(".mxm-track-title__track").text().replace("Lyrics", " ").replace("\"", "").trim()
//       let band = $("a.mxm-track-title__artist").text()
//       let lirik = $(".lyrics__content__ok").first().text()
//       let lirik2 = $(".lyrics__content__ok").last().text()
//       let result = {
//         judul: judul,
//         nama_lagu: judul,
//         band: band,
//         lirik: lirik +"\n"+ lirik2,
//       }
//     })
//   }
// })


// SCRAPING LIRIK LAGU
// link = "https://lirik.kapanlagi.com/artis/peterpan/semua-tentang-kita/"
// axios(link, {
//   method: 'get'
// }).then(({data}) => {
//   const $ = cheerio.load(data)
//   const title1 = $("title").text().replace("Lirik Lagu ", "").split("-")
//   const judul = title1[0] + "-" + title1[1]

//   console.log($(`#line_13`).children("p").length)

//   const lirikk = $(".lirik_line")
//   let lirik = ''
//   for (let index = 1; index <= lirikk.length; index++) {
//     if($(`#line_${index}`).children("p").length == 0){
//       if(lirikk.length == index){
//         lirik += $(`#line_${index}`).text()
//       } else {
//         lirik += $(`#line_${index}`).text() + "\n"
//         if($(`#line_${index}`).next("br").length){
//           lirik += "\n"
//         }
//       }
//     }
//   }
//   let result = {
//     judul: judul.trim(),
//     nama_lagu: title1[0].trim(),
//     band: title1[1].trim(),
//     lirik: lirik,
//   }
//   // console.log(result)
// }).catch((e) => console.log(e.message))
// lirik(link).then((res) => console.log(res))

// SCRAPING GOOGLE
// let judul = "Sempurna Andra"
// judul += "site:lirik.kapanlagi.com"
// const encodedString = encodeURI(judul);

// const AXIOS_OPTIONS = {
//   headers: {
//     "User-Agent":
//       "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36",
//   },
// };

// function getOrganicResults() {
//   return axios
//     .get(
//       `https://www.google.com/search?q=${encodedString}&hl=en&gl=us`,
//       AXIOS_OPTIONS
//     )
//     .then(function ({ data }) {
//       let $ = cheerio.load(data);

//       const links = [];
//       const titles = [];
//       const snippets = [];

//       $(".yuRUbf > a").each((i, el) => {
//         links[i] = $(el).attr("href");
//       });
//       $(".yuRUbf > a > h3").each((i, el) => {
//         titles[i] = $(el).text();
//       });
//       $(".IsZvec").each((i, el) => {
//         snippets[i] = $(el).text().trim();
//       });

//       const result = [];
//       for (let i = 0; i < links.length; i++) {
//         result[i] = {
//           link: links[i],
//           title: titles[i],
//           snippet: snippets[i],
//         };
//       }

//       console.log(result);
//     });
// }

// getOrganicResults();