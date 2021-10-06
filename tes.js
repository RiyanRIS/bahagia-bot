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
const {spawn} = require('child_process');
const {exec} = require('child_process');

// Main Pribahasa
// const {tebakpribahasa} = require("./lib/game")
// tebakpribahasa().then((res) => {
//   console.log(res)
// }).catch(console.log())

// const db_pribahasa = JSON.parse(fs.readFileSync("./src/pribahasa.json"))
// const rndm = Math.floor(Math.random() * db_pribahasa.length)
// const data_acak = db_pribahasa[rndm]

// const pribahasa_soal = data_acak.pribahasa.split(" ")
// const rndm1 = Math.floor(Math.random() * pribahasa_soal.length)
// const jawaban = pribahasa_soal[rndm1]
// const soal = data_acak.pribahasa.replace(jawaban, "....")
// const res = {
//   soal: soal,
//   jawaban: jawaban,
//   arti: data_acak.arti
// }
// console.log(res)

// (function() {
//   var childProcess = require("child_process");
//   var oldSpawn = childProcess.spawn;
//   function mySpawn() {
//       console.log('spawn called');
//       console.log(arguments);
//       var result = oldSpawn.apply(this, arguments);
//       return result;
//   }
//   childProcess.spawn = mySpawn;
// })();
// return

// SPLIT TEXT
(async () => {
  let longMessage = 'Lelaki tua dengan kaki kanan yang pincang itu hidup dalam keadaan yang sangat memilukan. Ia tidak punya anak dan istri, bapak,ibu, dan saudara-saudaranya sudah meninggal, ia hidup sendirian sebatang kara di gubuk reyot di tepi kampung. Makanan sehari-hari yang bisa ia makan bergantung pada perolehan kayu bakar yang ia cari di hutan lalu ia jual. Ketika kemudian ada iklan penggalangan donasi untuk membantu lelaki malang itu yang digalang oleh salah satu yayasan lewat di beranda Facebook saya, maka tak butuh waktu yang lama bagi saya untuk segera membukanya dan segera mentransfer sejumlah uang. Tentu saja saya berharap donasi yang saya berikan itu akan bermanfaat dan membantu kehidupan si lelaki tua.',
  charLimit = 85,
  maxSplits = 30,
  placeholder,
  indicator,
  breakPoint,
  messages = [],
  n,
  m,
  splits,
  
  totN = 0,
  newarrayyy = [],
  kal = "",
  baris = 0,
  diagX = 129;

  const font = ['nulisa']
  const ran = Math.floor(Math.random() * font.length)
  // const fixHeight = text
  const pathbef = './src/gambar/nulisbukusebelumkanan.jpg'
  const pathres = './public/nulisbukukanan.jpg'

  let arrNew = longMessage.split(" ")
  for (let index = 0; index < arrNew.length; index++) {
    totN += arrNew[index].length
    if(65 < totN){
      tesP = totN + arrNew[index + 1].length
      if(tesP > 79){
      }
      baris++
      console.log(baris, kal)
      if(baris == 1){
        spawn('convert', [
          pathbef,
          '-font',
          `./src/font/${font[ran]}.ttf`,
          '-size',
          '960x1280',
          '-pointsize',
          '20',
          '-annotate',
          `+130+${diagX}`,
          kal,
          pathres
        ])
        .on('error', (e) => console.log(e.message))
        .on('exit', () => console.log("baris ke " + baris))
      } else {
        diagX += 38
        spawn('convert', [
          pathres,
          '-font',
          `./src/font/${font[ran]}.ttf`,
          '-size',
          '960x1280',
          '-pointsize',
          '20',
          '-annotate',
          `+130+${diagX}`,
          kal,
          pathres
        ])
        .on('error', (e) => console.log(e.message))
        .on('exit', () => console.log("baris ke " + baris))
      }
      totN = 0
      kal = arrNew[index] + " "
      await new Promise(r => setTimeout(r, 500));
    } else {
      kal += arrNew[index] + " "
    }
  }
  console.log(++baris, kal)
  spawn('convert', [
    pathres,
    '-font',
    `./src/font/${font[ran]}.ttf`,
    '-size',
    '960x1280',
    '-pointsize',
    '20',
    '-annotate',
    `+130+${diagX += 38}`,
    kal,
    pathres
  ])
  .on('error', (e) => console.log(e.message))
  .on('exit', () => console.log("baris ke " + baris))
})()



// var totalLength = longMessage.length + (9 * 5);

// if (totalLength <= (charLimit * 9)) {
//     placeholder = '\v';
// }
// else {
//     placeholder = '\v\v';
// }

// for (n = 0, m = 0; n < longMessage.length / charLimit && n < maxSplits; n++) {
//     m = n * charLimit;
//     indicator = '\n';
//     breakPoint = m + charLimit - indicator.length;
//     longMessage = longMessage.substring(0, breakPoint) + indicator + longMessage.substring(breakPoint);
// }

// longMessage = longMessage.replace(/\v+/g, n);

// splits = n;

// for (n = 0; n < splits; n++) {
//     m = n * charLimit;
//     messages.push(longMessage.substring(m, m + charLimit));
// }

// // spit out each message
//     console.log(messages)

// NULIS
// const { nulis } = require("./lib/nulis")

// const mes = "-no 43 -kls XI IPA 2 -t Lelaki tua dengan kaki kanan yang pincang itu hidup dalam keadaan yang sangat memilukan. Ia tidak punya anak dan istri, bapak,ibu, dan saudara-saudaranya sudah meninggal, ia hidup sendirian sebatang kara di gubuk reyot di tepi kampung. Makanan sehari-hari yang bisa ia makan bergantung pada perolehan kayu bakar yang ia cari di hutan lalu ia jual. Ketika kemudian ada iklan penggalangan donasi untuk membantu lelaki malang itu yang digalang oleh salah satu yayasan lewat di beranda Facebook saya, maka tak butuh waktu yang lama bagi saya untuk segera membukanya dan segera mentransfer sejumlah uang. Tentu saja saya berharap donasi yang saya berikan itu akan bermanfaat dan membantu kehidupan si lelaki tua."

// const args = mes.split(" ")

// nulis(args).then(async(res) => {
//  console.log(res)
// }).catch((e) => console.log(e))

// let nama = "", namasa = false, kelas = "", kelasa = false, no = "", nosa = false,  txt = "", textsa = false
// // CEK NAMA
// if (args.includes('-nama') || args.includes('--nama')) {
//   for (let i = 0; i < args.length; i++) {
//     // Enables data collection when keyword found in index!
//     if (args[i].includes('-n') || args[i].includes('--nama')) {
//       namasa = true;
//     }
//     if (args[i].includes('-no') || args[i].includes('--nomor') || args[i].includes('-kls') || args[i].includes('--kelas') || args[i].includes('-t') || args[i].includes('--text')) {
//       namasa = false;
//     }
//     // If data collection is enabled and args length is more then one it will start appending!
//     if (namasa == true) {
//       nama = nama + args[i] + ' '
//     }
//   }
//   // Check if variable contain unnecessary startup word!
//   if (nama.startsWith('-nama ')) {
//     nama = `${nama.split('-nama ')[1]}`
//   }
//   if (nama.startsWith('--nama ')) {
//     nama = `${nama.split('--nama ')[1]}`
//   }
// }

// // CEK NOMOR
// if (args.includes('-no') || args.includes('--nomor')) {
//   for (let i = 0; i < args.length; i++) {
//     // Enables data collection when keyword found in index!
//     if (args[i].includes('-no') || args[i].includes('--nomor')) {
//       nosa = true
//     }
//     if (args[i].includes('-nama') || args[i].includes('--nama') || args[i].includes('-kls') || args[i].includes('--kelas') || args[i].includes('-t') || args[i].includes('--text')) {
//       nosa = false;
//     }
//     // If data collection is enabled and args length is more then one it will start appending!
//     if (nosa == true) {
//       no = no + args[i] + ' '
//     }
//   }
//   // Check if variable contain unnecessary startup word!
//   if (no.startsWith('-no ')) {
//     no = `${no.split('-no ')[1]}`
//   }
//   if (no.startsWith('--nomor ')) {
//     no = `${no.split('--nomor ')[1]}`
//   }
// }

// // CEK KELAS
// if (args.includes('-kls') || args.includes('--kelas')) {
//   for (let i = 0; i < args.length; i++) {
//     // Enables data collection when keyword found in index!
//     if (args[i].includes('-kls') || args[i].includes('--kelas')) {
//       kelasa = true;
//     }
//     if (args[i].includes('-nama') || args[i].includes('--nama') || args[i].includes('-no') || args[i].includes('--nomor') || args[i].includes('-t') || args[i].includes('--text')) {
//       kelasa = false;
//     }
//     // If data collection is enabled and args length is more then one it will start appending!
//     if (kelasa == true) {
//       kelas = kelas + args[i] + ' '
//     }
//   }
//   // Check if variable contain unnecessary startup word!
//   if (kelas.startsWith('-kls ')) {
//     kelas = `${kelas.split('-kls ')[1]}`
//   }
//   if (kelas.startsWith('--kelas ')) {
//     kelas = `${kelas.split('--kelas ')[1]}`
//   }
// }

// // CEK TEXT
// if (args.includes('-t') || args.includes('--text')) {
//   for (let i = 0; i < args.length; i++) {
//     // Enables data collection when keyword found in index!
//     if (args[i].includes('-t') || args[i].includes('--text')) {
//       textsa = true;
//     }
//     if (args[i].includes('-nama') || args[i].includes('--nama') || args[i].includes('-no') || args[i].includes('--nomor') || args[i].includes('-kls') || args[i].includes('--kelas')) {
//       textsa = false;
//     }
//     // If data collection is enabled and args length is more then one it will start appending!
//     if (textsa == true) {
//       txt = txt + args[i] + ' '
//     }
//   }
//   // Check if variable contain unnecessary startup word!
//   if (txt.startsWith('-t ')) {
//     txt = `${txt.split('-t ')[1]}`
//   }
//   if (txt.startsWith('--text ')) {
//     txt = `${txt.split('--text ')[1]}`
//   }
// }
// if(nama == "") nama = null
// console.log(nama)
// nuliskanan(text, "Riyan Risky Widya S", null, "XI IPA 2")

//   break
// case 'nuliskiri':                     
// if (!args.length >= 1) return piyo.reply(from, 'Kirim /nuliskiri teks', id) 
// const tulisan = body.slice(11)
// piyo.sendText(from, 'sabar ya lagi nulis')
// const splitText = tulisan.replace(/(\S+\s*){1,9}/g, '$&\n')
// const fixHeight = splitText.split('\n').slice(0, 31).join('\n')
// spawn('convert', [
// './media/images/buku/sebelumkiri.jpg',
// '-font',
// './lib/font/Indie-Flower.ttf',
// '-size',
// '960x1280',
// '-pointsize',
// '22',
// '-interline-spacing',
// '2',
// '-annotate',
// '+140+153',
// fixHeight,
// './media/images/buku/setelahkiri.jpg'
// ])
// .on('error', () => piyo.reply(from, 'Error gan', id))
// .on('exit', () => {
// piyo.sendImage(from, './media/images/buku/setelahkiri.jpg', 'after.jpg', `Wes rampung dik, donasi dong buat biaya server. bales /donasi untuk melihat cara donasi\nDitulis selama: ${processTime(t, moment())} _detik_`, id)
// })
// break
// case 'foliokiri': {
//   //if (!isPremium) return piyo.reply(from, 'Maaf, ini adalah fitur premium, untuk menggunakan fitur ini silahkan donasi, Kirim #donasi untuk melihat info donasi', id)
//   if (!args.length >= 1) return piyo.reply(from, 'Kirim /foliokiri teks', id) 
//   const tulisan = body.slice(11)
//   piyo.sendText(from, 'sabar ya lagi nulis')
//   const splitText = tulisan.replace(/(\S+\s*){1,13}/g, '$&\n')
//   const fixHeight = splitText.split('\n').slice(0, 38).join('\n')
//   spawn('convert', [
//       './media/images/folio/sebelumkiri.jpg',
//       '-font',
//       './lib/font/Indie-Flower.ttf',
//       '-size',
//       '1720x1280',
//       '-pointsize',
//       '23',
//       '-interline-spacing',
//       '4',
//       '-annotate',
//       '+48+185',
//       fixHeight,
//       './media/images/folio/setelahkiri.jpg'
//   ])
//   .on('error', () => piyo.reply(from, 'Error gan', id))
//   .on('exit', () => {
//       piyo.sendImage(from, './media/images/folio/setelahkiri.jpg', 'after.jpg', `Wes rampung dik, donasi dong buat biaya server. bales /donasi untuk melihat cara donasi\nDitulis selama: ${processTime(t, moment())} _detik_`, id)
//   })
// }
//   break
// case 'foliokanan': {
//   if (!args.length >= 1) return piyo.reply(from, 'Kirim /foliokanan teks', id) 
//   const tulisan = body.slice(12)
//   piyo.sendText(from, 'sabar ya lagi nulis')
//   const splitText = tulisan.replace(/(\S+\s*){1,13}/g, '$&\n')
//   const fixHeight = splitText.split('\n').slice(0, 38).join('\n')
//   spawn('convert', [
//       './media/images/folio/sebelumkanan.jpg',
//       '-font',
//       './lib/font/Indie-Flower.ttf',
//       '-size',
//       '960x1280',
//       '-pointsize',
//       '23',
//       '-interline-spacing',
//       '3',
//       '-annotate',
//       '+89+190',
//       fixHeight,
//       './media/images/folio/setelahkanan.jpg'
//   ])
//   .on('error', () => piyo.reply(from, 'Error gan', id))
//   .on('exit', () => {
//       piyo.sendImage(from, './media/images/folio/setelahkanan.jpg', 'after.jpg', `Wes rampung dik, donasi dong buat biaya server. bales /donasi untuk melihat cara donasi\nDitulis selama: ${processTime(t, moment())} _detik_`, id)
//   })
// }
//   break

// KBBI
// const {kbbi} = require('./lib/kamus');

// kbbi("katak").then((res) => {
//   res.forEach((v, i) => {
//     console.log(v)
//   })
// }).catch((e) => reply(e))
// Bausastra Scraping
// let text = "pekok"
// axios("https://budiarto.id/bausastra/words/search/" + text, {
//   method: "GET"
// }).then(({data}) => {
//   if(data.result.length >= 1){
//     let result = data.result[0]
//     console.log(`*${result.entry}*_${result.javanese}_\n${result.meaning}\n\n_~ ${result.citation}_`)
//   }else{
//     console.log("Kami tidak menemukan apapun.")
//   }
  
// }).catch((e) => console.log(e))

// Array Manipulation
// let tes = ["-l", "id", "halo", "riyan", "Ini", "Kalimat", "hahha"]

// let tes1 = tes.splice(2)
// tes1 = tes1.join(" ")
// console.log(tes1)

// TTS google
// const {gtts} = require("./lib/gtts")

// let text = `Sudah bukan rahasia lagi bahwa selama ini kita lazim mengetahui kucing-kucing di lingkungan sekitar kita dinamai dengan nama yang khas kucing yang umumnya sangat “barat” seperti Meow, Kiko, Amber, Lily, Coco, Kitty, Leo, Bella, Eroe, Miko, dan lain sebangsanya. Bahkan untuk kucing yang sebenarnya adalah kucing lokal sekalipun.

// Jarang sekali kita tahu kucing di lingkungan kita yang menggunakan nama yang sangat lokal atau Indonesia. Padahal, kucing, seperti layaknya orang, juga bisa diberi nama yang sangat lokal, termasuk nama-nama orang di sekitar kita.

// Hal tersebut berbeda dengan anjing yang memang di lingkungan kita masih dianggap sebagai hewan yang cukup “hina” sebab anjing, selain karena stigma kenajisannya, juga masih identik dengan bentuk makian. Karena itulah menjadi tak lumrah dan agak tak sopan jika menamai anjing dengan nama kawan atau orang-orang di sekitar kita.

// Seiring dengan berjalannya waktu, makin banyak orang yang menamai kucingnya dengan nama yang lokal dan cukup ngindonesia. Ada banyak orang yang mulai menamai kucingnya dengan nama seseorang yang mereka kagumi, nama artis favorit, atau bahkan nama orang yang mereka cintai.

// Nah, berikut ini adalah beberapa rekomendasi nama kucing khas Indonesia rekomendasi netizen yang sudah saya himpun melalui Twitter. Yah, siapa tahu ada banyak pembaca yang mendapatkan hibah anak kucing dan pengin menamai kucingnya dengan nama yang sangat Indonesia.`

// gtts(text).catch((e) => console.log(e))


// MEME HARTA TAHTA
// let { spawn } = require('child_process')
// let text = "Ayunda"
//   try {

//     let img = "./src/gambar/1.jpeg"
//     let font = "./src/font/hartatahta.ttf"
//     let w = 1024
//     let h = w
//     let s = w + 'x' + h
//     let xF = `(${noise('X', 2, w, 1)}+${noise('Y', 1, h, 1)})/2+128`
//     let yF = `((${pickRandom(['', '-'])}${45 * w / 2048}*${pickRandom(['sin', 'cos'])}(X/${w}*4*PI))+${noise('X', 5, w, 0.8)}+${noise('Y', 2, h, 1)})/1.7+128`
//     let fsize = 320 / 2048 * w
//     let lh = 1.5
//     let format = ',format=rgb24'
//     let layers = [
//       `[v:0]scale=${s}${format}[im]`,
//       textArgs('HARTA', 'black', 'white', fsize, font, '(w-text_w)/2', `(h-text_h)/2-(text_h*${lh})`, w, h) + format + '[top]',
//       textArgs('TAHTA', 'black', 'white', fsize, font, '(w-text_w)/2', `(h-text_h)/2`, w, h) + format + '[mid]',
//       textArgs(text.toUpperCase(), 'black', 'white', fsize, font, '(w-text_w)/2', `(h-text_h)/2+(text_h*${lh})`, w, h) + format + '[bot]',
//       '[top][mid]blend=all_mode=addition[con]',
//       '[con][bot]blend=all_mode=addition[txt]',
//       `nullsrc=s=${s},geq='r=${xF}:g=${xF}:b=${xF}'[dx]`,
//       `nullsrc=s=${s},geq='r=${yF}:g=${yF}:b=${yF}'[dy]`,
//       '[txt][dx][dy]displace[wa]',
//       '[im][wa]blend=all_mode=multiply:all_opacity=1'
//     ]

//     let o = './public/_harta_tahta.png'
//     let args = [
//       '-y',
//       '-i', img,
//       '-filter_complex', layers.join(';'),
//       '-frames:v', '1',
//       o
//     ]
//     console.log(layers)
//     console.log('ffmpeg', ...args)

//     spawn('ffmpeg', args)
//       .on('error', (e) => console.log(e))
//       .on('exit', () => {
//         console.log(0)
//       })
//   } catch (e) {
//     console.log(e.message)
//   }

//   function noise(_var, depth = 4, s = 1024, freq) {
//     let forms = []
//     for (let i = 0; i < depth; i++) forms.push(
//       formula(
//         _var,
//         freq * rand(40, 80) * (s / 2048)/ s * ((i + 1) / 5),
//         rand(-Math.PI, Math.PI),
//         (i + 1) / depth * 8,
//         0
//       )
//     )
//     return forms.join('+')
//   }

//   function formula(_var, freq, offset, amp, add) {
//     return `(${add.toFixed(3)}+${amp.toFixed(4)}*sin(${offset.toFixed(6)}+2*PI*${_var}*${freq.toFixed(6)}))`
//   }
  
//   function textArgs(text, background, color, size, fontfile, x = '200' , y = '200', w = 1024, h = 1024) {
//     return `color=${background}:s=${w}x${h},drawtext=text='${text.replace(/[\\]/g, '\\$&')}':fontfile='${fontfile.replace(/[\\]/g, '\\$&')}':x=${x}:y=${y}:fontsize=${size}:fontcolor=${color}`
//   }
  
//   function pickRandom(list) {
//     return list[Math.floor(Math.random() * list.length)]
//   }
  
//   function rand(min, max, q = 0.001) {
//     return Math.floor((Math.random() * (max - min)) / q) * q
//   }

// CONVERT NO HP
// let no = "089677249060"
// let no = "6289677249060"
// let no = "+6289677249060"
// let no = "89677249060"

// if(no.startsWith("08")){
//   no = no.slice(1,100)
// }else if(no.startsWith("62")){
//   no = no.slice(2,100)
// }else if(no.startsWith("+62")){
//   no = no.slice(3,100)
// }

// console.log(no)

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