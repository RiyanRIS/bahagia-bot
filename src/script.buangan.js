// // DOWNLOAD TWITTER BY PUPPETER
// // DI LOCAL JALAN TAPI DI SERVER ENGGAK SOALNYA PUPETERNYA HARUS ADA GUI NYA
// (async () => {
//   let browser
//   try {
//     browser = await puppeteer.launch({
//       headless: false,
//       args: ['--no-sandbox', '--disable-setuid-sandbox']
//     })
//   } catch(e) {
//     reply('error')
//   }
//   const page = await browser.newPage();
//   await page
//     .goto("https://id.savefrom.net/download-from-twitter", {
//       waitUntil: "networkidle2",
//     })
//     .then(async () => {
//       await page.type("#sf_url", args[0]);
//       await page.click("#sf_submit");
//       await new Promise(resolve => setTimeout(resolve, 5000));
//       try {
//         await page.waitForSelector("#sf_result");
//         const element = await page.$("a.link-download");
//         const link = await (await element.getProperty("href")).jsonValue();
//         const text = await (await element.getProperty("download")).jsonValue();

//         const filename = new Date().getTime()
//         const path = `./public/${filename}.mp4`;
//         const file = fs.createWriteStream(path);
//         const request = http.get(link, function (response) {
//           response.pipe(file);
//         })

//         file.on("finish", async () => {
//           const videonya = fs.readFileSync(path)
//           try {
//             await conn.sendMessage(from, videonya, video, {
//               caption: `*🙇‍♂️ Berhasil*\n\n${text}`
//             })
//             fs.unlinkSync(path)
//           } catch (e) {
//             console.error(e)
//             reply(`Error waktu kirim file ke kamu, namun kami masih memiliki linknya: ${link}, silahkan download sendiri ya.`)
//             fs.unlinkSync(path)
//           }
//         })

//       } catch (error) {
//         console.log(error);
//         reply(`error`)
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//       reply(`error`)
//     });
//   browser.close();
// })();



// // https://github.com/ytb2mp3/youtube-mp3-downloader

// const YTDL = require("ytdl-core")
// const YoutubeMp3Downloader = require("youtube-mp3-downloader")
// const { MessageMedia } = require('whatsapp-web.js')

// const ytplay = async (client, msg, args) => {

//   const chat = await msg.getChat()
//   let id = YTDL.getURLVideoID(args[0])
//   const filename = new Date().getTime()

//   msg.reply(`*⏳ Tunggu Sebentar*\n\nProses pembuatan audio sedang dalam proses.`)

//   try{
//     let YD = new YoutubeMp3Downloader({
//         "ffmpegPath": "ffmpeg", 
//         "outputPath": "./public",         // Where should the downloaded and en>
//         "youtubeVideoQuality": "highest", // What video quality sho>
//         "queueParallelism": 100,          // How many parallel down>
//         "progressTimeout": 2000           // How long should be the>
//     });
    
//     YD.download(id, filename + ".mp3")
    
//     YD.on("finished", function(err, data) {
//       const musik = MessageMedia.fromFilePath(data.file);
//       chat.sendMessage(musik);
//     })

//     YD.on("error", function(error) {
//       console.log(error)
//       msg.reply("⛔ Maaf*\n\nTerjadi kesalahan pada server kami!")
//     })
//   }
//   catch (err){
//     msg.reply('⛔ Maaf*\n\nTerjadi kesalahan pada server kami!')
//   }
// }

// module.exports = {
//   ytplay
// }



// case 'yt':
//           var urlyt = args[0];
//           console.log(urlyt)
//           const dm = async (url) => {
//             let info = YTDL.getInfo(url)
//             const stream = YTDL(url, {
//                 filter: info => info.itag == 22 || info.itag == 18
//               })
//               .pipe(fs.createWriteStream('./public/video.mp4'));
//             console.log("video downloading")
//             await new Promise((resolve, reject) => {
//               stream.on('error', reject)
//               stream.on('finish', resolve)
//             }).then(async (res) => {
//               console.log("video sending")
//               await conn.sendMessage(
//                 from,
//                 fs.readFileSync('./public/video.mp4'),
//                 video, {
//                   mimetype: Mimetype.mp4
//                 }
//               ).then((res) => {
//                 console.log("Sent")
//               })
//               .catch((e) => {
//                 reply `Enable to download send a valid req`
//               })
//               .finally(() => {
//                 fs.unlinkSync("./public/video.mp4")
//               })

//             }).catch((err) => {
//               reply `Unable to download,contact dev.`;
//             });

//           }
//           dm(urlyt)
//           break