const express = require('express')
const server = express()

const port = process.env.PORT || 8000;
server.get('/', (req, res) => {
  res.send('Server running...')
})
server.listen(port, () => {
  // console.clear()
  console.log('\nWeb-server running!\n')
})

// LOAD Baileys
const {
  WAConnection,
  MessageType,
  Presence,
  Mimetype,
  GroupSettingChange,
  MessageOptions,
  WALocationMessage,
  WA_MESSAGE_STUB_TYPES,
  ReconnectMode,
  ProxyAgent,
  waChatKey,
  mentionedJid,
  processTime,
} = require('@adiwajshing/baileys')

// LOAD ADDITIONAL NPM PACKAGES
const fs = require('fs')
const ffmpeg = require('fluent-ffmpeg')
const WSF = require('wa-sticker-formatter')
const axios = require('axios')
const log = console.debug
const exec = require("child_process").exec
const qr = require('qr-image')
const Jimp = require("jimp")
const qrCode = require('qrcode-reader')
const moment = require("moment-timezone")
const ocrSpaceApi = require('ocr-space-api')
const request = require('request')
const http = require("https")

const deepai = require('deepai')
const Algorithmia = require("algorithmia")

deepai.setApiKey('2f488865-1a7b-498c-8fe4-01c15a402c9a')
const clientAlgo = Algorithmia.client("sim0fQz4awLwB0OwNDifIxJLGgt1")

// LOAD LIBRARY
const {
  aksara
} = require('./lib/aksara')
const {
  tebakgambar,
  tebakgambar2,
  tebakpribahasa
} = require("./lib/game")
const {
  carbon
} = require("./lib/carbon")
const {
  removebg
} = require("./lib/removebg")
const {
  cmm,
  drake,
  twobutton,
  distrack,
  baloon,
  slapping,
  skeleton,
  sadpablo
} = require("./lib/imgflip")
const {
  hartatahta
} = require("./lib/hartatahta")
const {
  ephoto360,
  ephoto360img
} = require("./lib/ephoto360")
const {
  textpro
} = require("./lib/textpro")
const {
  nulis
} = require("./lib/nulis")
const {
  sms_oyo,
  sms_mapclub,
  sms_icq,
  sms_fave,
  sms_kredinesia,
  smscall_random,
  call_jagreward,
  call_nutriclub,
  sms_olx,
  sms_maucash
} = require("./lib/bombsms")
const {
  getGroupAdmins,
  helpBiasa,
  adminHelp,
  getRandom,
  randomString,
  shortlink,
  formatBytes,
  getBuffer,
  isUrl,
  fetchJson,
  contains
} = require("./helpers/function")
const {
  gtts
} = require("./lib/gtts")
const {
  kbbi,
  kbj
} = require("./lib/kamus")

const dl = require("./helpers/downloader")
const {
  mmenu,
  mnulis,
  mstiker,
  mdownloader,
  mmaker,
  mdeepai,
  mgames,
  mfoto,
  maudio,
  mother
} = require("./helpers/menu")

// LOAD SOURCES
const pesan = require('./src/pesan')

// BASIC SETTINGS
const prefix = '/'
const time = moment.tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss")

let hit_today = []

// MAIN FUNCTION
async function main() {

  const conn = new WAConnection()
  conn.logger.level = 'warn'
  const dotenv = require('dotenv')
  dotenv.config()
  const {
    SESSION_WA,
  } = process.env
  const sessionData = JSON.parse(SESSION_WA)
  conn.loadAuthInfo(sessionData)
  conn.on('connecting', () => {
    console.log('Connecting...')
  })
  conn.on('open', () => {
    // console.clear()
    console.log('Connected!')
  })
  await conn.connect({
    timeoutMs: 30 * 1000,
    maxRetries: Infinity
  })

  conn.on('ws-close', async ({
    reason
  }) => {
    console.log('Reason is:', reason)
  })

  setInterval(async () => {
    const tg = moment.tz("Asia/Jakarta").format("MMMM DD, YYYY")
    const biography = '📅 ' + tg + ' 🇮🇩 Gunakan \/help untuk melihat perintah yang tersedia.'
    await conn.setStatus(biography)

  }, 50000);

  conn.on('group-participants-update', async (anu) => {
    try {
      const mdata = await conn.groupMetadata(anu.jid)
      console.log(anu)
      if (anu.action == 'add') {
        num = anu.participants[0]
        num_split = `${num.split('@s.whatsapp.net')[0]}`
        console.log('Joined: ', num)
      }
    } catch (e) {
      console.log(e)
    }
  })

  conn.on('chat-update', async (mek) => {
    try {
      if (!mek.hasNewMessage) return
      mek = mek.messages.all()[0]
      // mek = JSON.parse(JSON.stringify(mek)).messages[0]
      if (!mek.message) return
      if (mek.key && mek.key.remoteJid == 'status@broadcast') return
      if (mek.key.fromMe) return
      global.prefix
      mek.message =
        Object.keys(mek.message)[0] === "ephemeralMessage" ?
        mek.message.ephemeralMessage.message :
        mek.message
      const content = JSON.stringify(mek.message)
      let txt, split, topText, bottomText
      const from = mek.key.remoteJid
      const type = Object.keys(mek.message)[0]
      const {
        text,
        extendedText,
        contact,
        location,
        liveLocation,
        image,
        video,
        sticker,
        document,
        audio,
        product
      } = MessageType
      // const body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : ''
      const kalimat = type === 'conversation' ? mek.message.conversation : (type == 'imageMessage') ? mek.message.imageMessage.caption : (type == 'videoMessage') ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''

      let prefixRegEx = /^[!&z?=#.+\/]/gi;
      // let prefixRegEx = /^[\/]/gi;
      let _chats =
        type === "conversation" && mek.message.conversation ?
        mek.message.conversation :
        type == "imageMessage" && mek.message.imageMessage.caption ?
        mek.message.imageMessage.caption :
        type == "videoMessage" && mek.message.videoMessage.caption ?
        mek.message.videoMessage.caption :
        type == "extendedTextMessage" && mek.message.extendedTextMessage.text ?
        mek.message.extendedTextMessage.text :
        type == "buttonsResponseMessage" && mek.message[type].selectedButtonId ?
        mek.message[type].selectedButtonId :
        type == "stickerMessage" &&
        getCmd(mek.message[type].fileSha256.toString("base64")) !== null &&
        getCmd(mek.message[type].fileSha256.toString("base64")) !== undefined ?
        getCmd(mek.message[type].fileSha256.toString("base64")) :
        ""

      let prefix = _chats.match(prefixRegEx) ? prefixRegEx.exec(_chats)[0] : ""
      let body =
        type === "conversation" && mek.message.conversation.startsWith(prefix) ?
        mek.message.conversation :
        type == "imageMessage" &&
        mek.message.imageMessage.caption.startsWith(prefix) ?
        mek.message.imageMessage.caption :
        type == "videoMessage" &&
        mek.message.videoMessage.caption.startsWith(prefix) ?
        mek.message.videoMessage.caption :
        type == "extendedTextMessage" &&
        mek.message.extendedTextMessage.text.startsWith(prefix) ?
        mek.message.extendedTextMessage.text :
        ""
      let budy =
        type === "conversation" ?
        mek.message.conversation :
        type === "extendedTextMessage" ?
        mek.message.extendedTextMessage.text :
        ""
      let chats = _chats.match(prefixRegEx) ?
        _chats
        .split(prefixRegEx)
        .find((v) => v === _chats.replace(prefixRegEx, "")) :
        _chats;

      // const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
      const command = chats.split(/ +/g)[0]
      const args = _chats.trim().split(/ +/).slice(1)
      // const isCmd = body.startsWith(prefix)
      const isCmd = _chats.match(prefixRegEx) ?
        prefixRegEx.exec(_chats)["input"] :
        _chats;

      const botNumber = conn.user.jid
      const isGroup = from.endsWith('@g.us')
      const sender = isGroup ? mek.participant : mek.key.remoteJid
      const groupMetadata = isGroup ? await conn.groupMetadata(from) : ''
      const groupName = isGroup ? groupMetadata.subject : ''
      const groupMembers = isGroup ? groupMetadata.participants : ''
      const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
      const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
      const isGroupAdmins = groupAdmins.includes(sender) || false

      const reply = async (teks) => {
        await conn.sendMessage(from, teks, text, {
          quoted: mek,
          detectLinks: false
        })
      }

      const costum = (pesan, tipe, target, target2) => {
        conn.sendMessage(from, pesan, tipe, {
          quoted: {
            key: {
              fromMe: false,
              participant: `${target}`,
              ...(from ? {
                remoteJid: from
              } : {})
            },
            message: {
              conversation: `${target2}`
            }
          }
        })
      }

      const sendMediaURL = async (url, caption = "") => {
        const fn = Date.now() / 1000
        const filename = fn.toString()
        let mime = ""
        var download = function (uri, filename, callback) {
          console.log("downloading media..")
          try {
            request.head(uri, function (err, res, body) {
              mime = res.headers["content-type"]
              request(uri)
                .pipe(fs.createWriteStream(filename))
                .on("close", callback)
            })
          } catch (error) {
            reply("Maaf, terjadi kesalahan saat mendownload media, coba cek url yang kamu lampirkan atau gunakan format yang lain.")
            return
          }
        }
        download(url, filename, async function () {
          let media, type
          try {
            media = fs.readFileSync(filename)
            type = mime.split("/")[0] + "Message"
            if (mime === "image/gif") {
              type = MessageType.video
              mime = Mimetype.gif
            }
            if (mime.split("/")[0] === "audio") {
              mime = Mimetype.mp4Audio
            }
          } catch (e) {
            // reply(e.message)
          }
          console.log("sending")
          await conn.sendMessage(from, media, type, {
              quoted: mek,
              mimetype: mime,
              caption: caption,
            })
            .then((res) => {
              console.log("sent")
              return res
            })
            .catch(async (e) => {
              console.log("gagal pertama")

              function base64_encode(file) {
                var bitmap = fs.readFileSync(file);
                return new Buffer.from(bitmap).toString('base64');
              }
              let base64str = base64_encode(filename);
              await conn.sendMessage(from, media, type, {
                  quoted: mek,
                  mimetype: mime,
                  caption: caption,
                  thumbnail: base64str
                })
                .then((res) => {
                  console.log("sent")
                  return res
                })
                .catch((e) => {
                  reply("Maaf terjadi kesalahan saat mengirim file ke kamu, silahkan download sendiri secara manual melalui link berikut atau gunakan format yang lain \n\n" + url + "\n\n-------------------\n" + e.message)
                  return
                })
            })
          fs.unlinkSync(filename)
        })
      }

      const sendMedPath = async (path, caption = "", type = image) => {
        let media = fs.readFileSync(path)
        await conn.sendMessage(from, media, type, {
            quoted: mek,
            caption: caption,
          })
          .then((res) => {
            console.log("sent")
            fs.unlinkSync(path)
            return res
          })
          .catch(async (e) => {
            console.log("gagal pertama")

            function base64_encode(file) {
              var bitmap = fs.readFileSync(file);
              return new Buffer.from(bitmap).toString('base64');
            }
            let base64str = base64_encode(path);
            await conn.sendMessage(from, media, type, {
                quoted: mek,
                caption: caption,
                thumbnail: base64str
              })
              .then((res) => {
                console.log("sent")
                return res
              })
              .catch((e) => {
                reply("Maaf terjadi kesalahan saat mengirim file ke kamu, ulangi beberapa saat lagi \n\n-------------------\n" + e.message)
                return
              })
              .finally(() => {
                fs.unlinkSync(path)
              })
          })
      }

      const sendButMessage = async (id, text1, desc1, but = [], options = {}) => {
        const buttonMessage = {
          contentText: text1,
          footerText: desc1,
          buttons: but,
          headerType: 1,
        };
        await conn.sendMessage(
          id,
          buttonMessage,
          MessageType.buttonsMessage,
          options
        );
      }

      const sendButImage = async (
        id,
        text1,
        desc1,
        gam1,
        but = [],
        options = {}
      ) => {
        kma = gam1;
        mediaa = await conn.prepareMessage(from, kma, image)
        const buttonMessages = {
          imageMessage: mediaa.message.imageMessage,
          contentText: text1,
          footerText: desc1,
          buttons: but,
          headerType: 4,
        };
        conn.sendMessage(
          id,
          buttonMessages,
          MessageType.buttonsMessage,
          options
        ).catch(async (e) => {
          mediaa = await conn.prepareMessage(from, kma, image, {
            thumbnail: kma.toString('base64')
          })
          const buttonMessages = {
            imageMessage: mediaa.message.imageMessage,
            contentText: text1,
            footerText: desc1,
            buttons: but,
            headerType: 4,
          };
          conn.sendMessage(
            id,
            buttonMessages,
            MessageType.buttonsMessage,
            options
          ).catch(async (e) => {
            mediaa = await conn.prepareMessage(from, kma, image, {
              thumbnail: null
            })
            const buttonMessages = {
              imageMessage: mediaa.message.imageMessage,
              contentText: text1,
              footerText: desc1,
              buttons: but,
              headerType: 4,
            };
            conn.sendMessage(
              id,
              buttonMessages,
              MessageType.buttonsMessage,
              options
            ).catch((e) => reply("Ulangi beberapa saat lagi.."))
          })
        })
      }

      const sendToOwner = async (text) => {
        await conn.sendMessage(conn.user.jid, text, MessageType.text)
      }

      const sendFileFromUrl = async (link, type, options) => {
        hasil = await getBuffer(link)
        conn.sendMessage(from, hasil, type, options).catch(e => {
          fetch(link).then((hasil) => {
            conn.sendMessage(from, hasil, type, options).catch(e => {
              conn.sendMessage(from, {
                url: link
              }, type, options).catch(e => {
                reply('_[ ! ] Error_')
                console.log(e)
              })
            })
          })
        })
      }

      const isMedia = (type === 'imageMessage' || type === 'videoMessage')
      const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
      const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
      const isQuotedAudio = type === "extendedTextMessage" && content.includes("audioMessage")
      const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
      if (isCmd) {
        if (isGroup) {
          console.log(time, ' [COMMAND]', command, '[FROM]', sender.split('@')[0], '[IN]', groupName)
        } else {
          console.log(time, ' [COMMAND]', command, '[FROM]', sender.split('@')[0])
        }
      }

      if (!isGroup) {
        await conn.updatePresence(from, Presence.composing)
      }
      /////////////// GAMES \\\\\\\\\\\\\\\

      let isOnGame = false

      // TEBAK GAMBAR
      let datatebakgambar = JSON.parse(fs.readFileSync("./src/data/tebakgambar.json"))

      let isTebakgambar = false
      let resTebakgambar = []

      // cek apakah pengirim sedang mengerjakan tebak gambar
      datatebakgambar.forEach((i, el) => {
        if (from == i.from) {
          isTebakgambar = true
          isOnGame = true
          resTebakgambar.push(i)
        }
      })

      if (isTebakgambar && kalimat.toLowerCase() != "skip") { // kondisi jika pengirim sedang mengerjakan tebak gambar
        let jawab = kalimat.toLowerCase()
        if (jawab == resTebakgambar[0].jawaban) { // kondisi jika jawaban benar
          sendButMessage(from, "Yes, jawaban kamu bener.\nPenjelasan: " + resTebakgambar[0].penjelasan, `Mau main lagi???`, [{
              buttonId: `${prefix}tg`,
              buttonText: {
                displayText: `Ya`,
              },
              type: 1,
            },
            {
              buttonId: `dw`,
              buttonText: {
                displayText: `Tidak`,
              },
              type: 1,
            },
          ], {
            quoted: mek
          })
          let dataakanhapus = JSON.parse(fs.readFileSync("./src/data/tebakgambar.json"))
          let indexx
          dataakanhapus.forEach((i, el) => {
            if (from == i.from) {
              indexx = el
            }
          })
          dataakanhapus.splice(indexx, 1)
          fs.writeFileSync("./src/data/tebakgambar.json", JSON.stringify(dataakanhapus))
        } else { // kondisi jika jawaban salah
          const arr_jawaban = resTebakgambar[0].jawaban.split(" ")
          const jumlah = arr_jawaban.length
          const percent = Math.floor(contains(jawab, arr_jawaban) / jumlah * 100)
          console.log(resTebakgambar[0].percobaan)
          if (percent > 10) {
            reply("wah, ada kata yang bener, ayo dikit lagi..")
          } else if (percent > 60) {
            reply("hampirr bener broo, cek lagi, teliti lagi.. ayo..")
          } else {
            if (resTebakgambar[0].percobaan == 1) {
              reply("salah")
            } else if (resTebakgambar[0].percobaan == 2) {
              reply("masih salah")
            } else if (resTebakgambar[0].percobaan == 3) {
              reply("masih salah.\n_Petunjuk:_ ada *" + jumlah + "* kata nih")
            } else if (resTebakgambar[0].percobaan == 4) {
              reply("ayo coba lagi, masih salah tuh")
            } else if (resTebakgambar[0].percobaan <= 5) {
              reply("masih salah haha")
            } else if (resTebakgambar[0].percobaan == 6) {
              reply("ayo dong, usaha, jangan ngasal gini..")
            } else if (resTebakgambar[0].percobaan == 7) {
              reply(`salah, petunjuknya ${resTebakgambar[0].deskripsi}`)
            } else if (resTebakgambar[0].percobaan == 8) {
              reply("bego, udah berapa kali coba masih salah aja")
            } else if (resTebakgambar[0].percobaan >= 9) {
              reply("dahlah.. skip aja")
            } else if (resTebakgambar[0].percobaan > 11) {
              reply("DIBILANG SKIP AJA UDAH")
            } else if (resTebakgambar[0].percobaan > 11) {
              reply("TULIS AJA \"skip\" BIAR GUA KASIH TAU JAWABANYA")
            } else if (resTebakgambar[0].percobaan > 15) {
              reply("MASIH NGEYEL...")
            }

            let dataakanhapus1 = JSON.parse(fs.readFileSync("./src/data/tebakgambar.json"))
            let indexx1
            // Hapus dulu data lama
            dataakanhapus1.forEach((i, el) => {
              if (from == i.from) {
                indexx1 = el
              }
            })
            dataakanhapus1.splice(indexx1, 1)

            // terus masukin deh data baru
            let data = {
              from: resTebakgambar[0].from,
              percobaan: resTebakgambar[0].percobaan + 1,
              jawaban: resTebakgambar[0].jawaban,
              penjelasan: resTebakgambar[0].penjelasan,
            }
            dataakanhapus1.push(data)
            fs.writeFileSync("./src/data/tebakgambar.json", JSON.stringify(dataakanhapus1))

          }

        }
      }

      // TEBAK PRIBAHASA
      let datatebakpribahasa = JSON.parse(fs.readFileSync("./src/data/tebakpribahasa.json"))

      let isTebakPribahasa = false
      let resTebakPribahasa = []

      // cek apakah pengirim sedang mengerjakan tebak pribahasa
      datatebakpribahasa.forEach((i, el) => {
        if (from == i.from) {
          isTebakPribahasa = true
          isOnGame = true
          resTebakPribahasa.push(i)
        }
      })

      if (isTebakPribahasa && kalimat.toLowerCase() != "skip") { // kondisi jika pengirim sedang mengerjakan tebak gambar
        let jawab = kalimat.toLowerCase()
        if (jawab == resTebakPribahasa[0].jawaban) { // kondisi jika jawaban benar
          // sendButMessage(from, "Kamu gagal menjawab, jawaban yang benar adalah *" + res.jawaban + "*.\n_" + res.soal.replace("....", res.jawaban) + "_\n\nArti: " + res.arti, `Mau main lagi???`, [{
          sendButMessage(from, "Yes, jawaban kamu bener.\n_" + resTebakPribahasa[0].soal.replace("....", resTebakPribahasa[0].jawaban) + "_\n\nArti: " + resTebakPribahasa[0].arti, `Mau main lagi???`, [{
              buttonId: `${prefix}tp`,
              buttonText: {
                displayText: `Ya`,
              },
              type: 1,
            },
            {
              buttonId: `dw`,
              buttonText: {
                displayText: `Tidak`,
              },
              type: 1,
            },
          ], {
            quoted: mek
          })
          let dataakanhapus = JSON.parse(fs.readFileSync("./src/data/tebakpribahasa.json"))
          let indexx
          dataakanhapus.forEach((i, el) => {
            if (from == i.from) {
              indexx = el
            }
          })
          dataakanhapus.splice(indexx, 1)
          fs.writeFileSync("./src/data/tebakpribahasa.json", JSON.stringify(dataakanhapus))
        } else { // kondisi jika jawaban salah
          if (resTebakPribahasa[0].percobaan == 1) {
            reply("salah")
          } else if (resTebakPribahasa[0].percobaan == 2) {
            reply("masih salah")
          } else if (resTebakPribahasa[0].percobaan == 3) {
            reply("masih salah.\n_Petunjuk:_ ada *" + resTebakPribahasa[0].jawaban.length + "* huruf")
          } else if (resTebakPribahasa[0].percobaan == 4) {
            reply("ayo coba lagi, masih salah tuh")
          } else if (resTebakPribahasa[0].percobaan <= 5) {
            reply("masih salah haha")
          } else if (resTebakPribahasa[0].percobaan == 6) {
            reply("ayo dong, usaha, jangan ngasal gini..")
          } else if (resTebakPribahasa[0].percobaan == 7) {
            reply(`salah, petunjuknya 2 huruf awal adalah *${resTebakPribahasa[0].jawaban.slice(0, 2)}*`)
          } else if (resTebakPribahasa[0].percobaan == 8) {
            reply("bego, udah berapa kali coba masih salah aja")
          } else if (resTebakPribahasa[0].percobaan >= 9) {
            reply("dahlah.. skip aja")
          } else if (resTebakPribahasa[0].percobaan > 11) {
            reply("DIBILANG SKIP AJA UDAH")
          } else if (resTebakPribahasa[0].percobaan > 11) {
            reply("TULIS AJA \"skip\" BIAR GUA KASIH TAU JAWABANYA")
          } else if (resTebakPribahasa[0].percobaan > 15) {
            reply("MASIH NGEYEL...")
          }

          let dataakanhapus1 = JSON.parse(fs.readFileSync("./src/data/tebakpribahasa.json"))
          let indexx1
          // Hapus dulu data lama
          dataakanhapus1.forEach((i, el) => {
            if (from == i.from) {
              indexx1 = el
            }
          })
          dataakanhapus1.splice(indexx1, 1)

          // terus masukin deh data baru
          let data = {
            from: resTebakPribahasa[0].from,
            percobaan: resTebakPribahasa[0].percobaan + 1,
            soal: resTebakPribahasa[0].soal,
            jawaban: resTebakPribahasa[0].jawaban,
            arti: resTebakPribahasa[0].arti,
            status: 0
          }
          dataakanhapus1.push(data)
          fs.writeFileSync("./src/data/tebakpribahasa.json", JSON.stringify(dataakanhapus1))
        }
      }

      if (isOnGame && kalimat != 'skip') {
        return
      }

      /////////////// COMMANDS \\\\\\\\\\\\\\\

      switch (command) {

        /////////////// GROUP COMMAND \\\\\\\\\\\\\\\

        case 'help':
        case 'mulai':
        case 'info':
          if (args[0] == "nulis") {
            reply(mnulis(prefix))
          } else if (args[0] == "stiker") {
            reply(mstiker(prefix))
          } else if (args[0] == "downloader") {
            reply(mdownloader(prefix))
          } else if (args[0] == "maker") {
            reply(mmaker(prefix))
          } else if (args[0] == "deepai") {
            reply(mdeepai(prefix))
          } else if (args[0] == "games") {
            reply(mgames(prefix))
          } else if (args[0] == "foto") {
            reply(mfoto(prefix))
          } else if (args[0] == "audio") {
            reply(maudio(prefix))
          } else if (args[0] == "other") {
            reply(mother(prefix))
          } else {
            reply(mmenu(prefix))
          }
          break

        case 'link':
        case 'getlink':
        case 'grouplink':
          if (!isGroup) return;
          if (!isBotGroupAdmins) return reply(pesan.admin_error);
          gc_invite_code = await conn.groupInviteCode(from)
          gc_link = `https://chat.whatsapp.com/${gc_invite_code}`
          conn.sendMessage(from, gc_link, text, {
            quoted: mek,
            detectLinks: true
          })
          break;

          /////////////// ADMIN COMMANDS \\\\\\\\\\\\\\\

        case 'add':
          if (!isGroup) return;
          if (!isGroupAdmins) return;
          if (!isBotGroupAdmins) return reply(pesan.admin_error);
          if (args.length < 1) return;
          var num = '';
          if (args.length > 1) {
            for (let j = 0; j < args.length; j++) {
              num = num + args[j]
            }
            num = `${num.replace(/ /g, '')}@s.whatsapp.net`
          } else {
            num = `${args[0].replace(/ /g, '')}@s.whatsapp.net`
          }
          if (num.startsWith('+')) {
            num = `${num.split('+')[1]}`
          }
          const response = await conn.groupAdd(from, [num])
          get_status = `${num.split('@s.whatsapp.net')[0]}`
          get_status = response[`${get_status}@c.us`];
          if (get_status == 400) {
            reply('_❌ ERROR: Invalid number! ❌_');
          }
          if (get_status == 403) {
            reply('_❌ ERROR: Number has privacy on adding group! ❌_');
          }
          if (get_status == 408) {
            reply('_❌ ERROR: Number has left the group recently! ❌_');
          }
          if (get_status == 409) {
            reply('_❌ ERROR: Number is already exists! ❌_');
          }
          if (get_status == 500) {
            reply('_❌ ERROR: Group is currently full! ❌_');
          }
          if (get_status == 200) {
            reply('_✔ SUCCESS: Number added to group! ✔_');
          }
          break;

        case 'kick':
        case 'remove':
        case 'ban':
          if (!isGroup) return;
          if (!isGroupAdmins) return;
          if (!isBotGroupAdmins) return reply(pesan.admin_error);
          if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return;
          mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
          if (groupAdmins.includes(`${mentioned}`) == true) return;
          if (mentioned.length > 1) {
            return;
          } else {
            conn.groupRemove(from, mentioned)
          }
          break;

        case 'promote':
          if (!isGroup) return;
          if (!isGroupAdmins) return;
          if (!isBotGroupAdmins) return reply(pesan.admin_error);
          if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return;
          mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
          if (groupAdmins.includes(`${mentioned}`) == true) return;
          if (mentioned.length > 1) {
            return;
          } else {
            conn.groupMakeAdmin(from, mentioned)
          }
          break;

        case 'demote':
          if (!isGroup) return;
          if (!isGroupAdmins) return;
          if (!isBotGroupAdmins) return reply(pesan.admin_error);
          if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('_⚠ USAGE: /demote <@mention> ⚠_');
          mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
          if (groupAdmins.includes(`${mentioned}`) == false) return;
          if (mentioned.length > 1) {
            return;
          } else {
            conn.groupDemoteAdmin(from, mentioned)
          }
          break;

        case 'chat':
          if (!isGroup) return;
          if (!isGroupAdmins) return;
          if (!isBotGroupAdmins) return reply(pesan.admin_error);
          if (args.length < 1) return;
          if (args[0] == 'on') {
            conn.groupSettingChange(from, GroupSettingChange.messageSend, false);
          } else if (args[0] == 'off') {
            conn.groupSettingChange(from, GroupSettingChange.messageSend, true);
          } else {
            return;
          }
          break;

        case 'rename':
          if (!isGroup) return;
          if (!isGroupAdmins) return;
          if (!isBotGroupAdmins) return reply(pesan.admin_error);
          if (args.length < 1) return;
          get_subject = '';
          for (i = 0; i < args.length; i++) {
            get_subject = get_subject + args[i] + ' ';
          }
          conn.groupUpdateSubject(from, get_subject);
          break;

        case 'removebot':
          if (!isGroup) return;
          if (!isGroupAdmins) return;
          conn.groupLeave(from)
          break

        /////////////// USERS COMMANDS \\\\\\\\\\\\\\\

        case 'st':
        case 'stic':
        case 'stik':
        case 'stickers':
        case 'stiker':
        case 'sticker':

          // Format should be <prefix>sticker pack <pack_name> author <author_name>
          var packName = ""
          var authorName = ""

          // Check if pack keyword is found in args!
          if (args.includes('pack') == true) {
            packNameDataCollection = false;
            for (let i = 0; i < args.length; i++) {
              // Enables data collection when keyword found in index!
              if (args[i].includes('pack') == true) {
                packNameDataCollection = true;
              }
              if (args[i].includes('auth') == true) {
                packNameDataCollection = false;
              }
              // If data collection is enabled and args length is more then one it will start appending!
              if (packNameDataCollection == true) {
                packName = packName + args[i] + ' '
              }
            }
            // Check if variable contain unnecessary startup word!
            if (packName.startsWith('pack ')) {
              packName = `${packName.split('pack ')[1]}`
            }
          }

          // Check if author keyword is found in args!
          if (args.includes('auth') == true) {
            authorNameDataCollection = false;
            for (let i = 0; i < args.length; i++) {
              // Enables data collection when keyword found in index!
              if (args[i].includes('auth') == true) {
                authorNameDataCollection = true;
              }
              // If data collection is enabled and args length is more then one it will start appending!
              if (authorNameDataCollection == true) {
                authorName = authorName + args[i] + ' '
              }
              // Check if variable contain unnecessary startup word!
              if (authorName.startsWith('auth ')) {
                authorName = `${authorName.split('auth ')[1]}`
              }
            }
          }

          // Check if packName and authorName is empty it will pass default values!
          if (packName == "") {
            packName = "bahagia-bot"
          }
          if (authorName == "") {
            authorName = "riyanris"
          }

          outputOptions = [`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`];
          if (args.includes('crop') == true) {
            outputOptions = [
              `-vcodec`,
              `libwebp`,
              `-vf`,
              `crop=w='min(min(iw\,ih)\,500)':h='min(min(iw\,ih)\,500)',scale=500:500,setsar=1,fps=15`,
              `-loop`,
              `0`,
              `-ss`,
              `00:00:00.0`,
              `-t`,
              `00:00:10.0`,
              `-preset`,
              `default`,
              `-an`,
              `-vsync`,
              `0`,
              `-s`,
              `512:512`
            ];
          }

          if ((isMedia && !mek.message.videoMessage || isQuotedImage)) {
            const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
            const media = await conn.downloadAndSaveMediaMessage(encmedia)
            ran = getRandom('.webp')
            reply('⌛ Processing image... ⏳')
            await ffmpeg(`./${media}`)
              .input(media)
              .on('error', function (err) {
                fs.unlinkSync(media)
                console.log(`Error : ${err}`)
                reply('_❌ ERROR: Failed to convert image into sticker! ❌_')
              })
              .on('end', function () {
                buildSticker()
              })
              .addOutputOptions(outputOptions)
              .toFormat('webp')
              .save(ran)

            async function buildSticker() {
              if (args.includes('nometadata') == true) {
                conn.sendMessage(from, fs.readFileSync(ran), sticker, {
                  quoted: mek
                })
                fs.unlinkSync(media)
                fs.unlinkSync(ran)
              } else {
                const webpWithMetadata = await WSF.setMetadata(packName, authorName, ran)
                conn.sendMessage(from, webpWithMetadata, MessageType.sticker)
                fs.unlinkSync(media)
                fs.unlinkSync(ran)
              }
            }

          } else if ((isMedia && mek.message.videoMessage.seconds < 11 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11)) {
            const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
            const media = await conn.downloadAndSaveMediaMessage(encmedia)
            ran = getRandom('.webp')
            reply('⌛ Processing animation... ⏳')
            await ffmpeg(`./${media}`)
              .inputFormat(media.split('.')[1])
              .on('error', function (err) {
                fs.unlinkSync(media)
                mediaType = media.endsWith('.mp4') ? 'video' : 'gif'
                reply(`_❌ ERROR: Failed to convert ${mediaType} to sticker! ❌_`)
              })
              .on('end', function () {
                buildSticker()
              })
              .addOutputOptions(outputOptions)
              .toFormat('webp')
              .save(ran)

            async function buildSticker() {
              if (args.includes('nometadata') == true) {
                conn.sendMessage(from, fs.readFileSync(ran), sticker, {
                  quoted: mek
                })
                fs.unlinkSync(media)
                fs.unlinkSync(ran)
              } else {
                const webpWithMetadata = await WSF.setMetadata(packName, authorName, ran)
                conn.sendMessage(from, webpWithMetadata, MessageType.sticker)
                fs.unlinkSync(media)
                fs.unlinkSync(ran)
              }
            }
          }
          break;

        case 'yt':
        case 'ytdl':
        case 'youtube':
          if (!isUrl(args[0]) && !args[0].includes("youtu")) {
            await reply("_Link tidak valid_")
            return
          }

          const dlyt = await dl.yotube(args[0])
          let tamnel = await getBuffer(dlyt.thumbnail)
          await sendButImage(
            from,
            `📜 *Title*: ${dlyt.title}\n\nSilahkan pilih salah satu format yg ingin didownload`, "Bahagia-Bot",
            tamnel,
            [{
                buttonId: `${prefix}youtubedownhahaha ${dlyt.id}|${dlyt.url_id}|${dlyt.kualitas_au}|${dlyt.ext_au}`,
                buttonText: {
                  displayText: dlyt.kualitasname_au + " | " + dlyt.size_au,
                },
                type: 1,
              },
              {
                buttonId: `${prefix}youtubedownhahaha ${dlyt.id}|${dlyt.url_id}|${dlyt.kualitas_sd}|${dlyt.ext_sd}`,
                buttonText: {
                  displayText: dlyt.kualitasname_sd + " | " + dlyt.size_sd,
                },
                type: 1,
              },
              {
                buttonId: `${prefix}youtubedownhahaha ${dlyt.id}|${dlyt.url_id}|${dlyt.kualitas_hd}|${dlyt.ext_hd}`,
                buttonText: {
                  displayText: dlyt.kualitasname_hd + " | " + dlyt.size_hd,
                },
                type: 1,
              },
            ]
          )
          break

        case "youtubedownhahaha":
          let id, url_id, kualitas, ext
          try {
            const gh = args.join("").split("|")
            id = gh[0]
            url_id = gh[1]
            kualitas = gh[2]
            ext = gh[3]
            reply("Dalam proses, mohon tunggu sebentar...")
          } catch (e) {
            sendToOwner(`command: ${command}\nid: ${id}\n`)
            reply("Maaf terjadi kesalahan, hubungi pengembang.")
          }

          await dl.yotube_download(id, url_id, ext, kualitas)
            .then(async (res) => {
              await sendMediaURL(res, "")
            })
            .catch((e) => {
              reply(e)
            })

          break

        case 'ig':
        case 'igdl':
        case 'igdown':
        case 'igdownloader':
          if (!isUrl(args[0]) && !args[0].includes("instagram.com")) {
            await reply("_Link tidak valid_")
            return
          }
          await dl.igdl(args[0])
            .then(async (res) => {
              try {
                res.forEach(async (element) => {
                  await sendMediaURL(element.url, "")
                })
              } catch (e) {
                await dl.igdl(args[0]).then((res) => {
                  y.forEach(async (element) => {
                    await sendMediaURL(element.url, "")
                  })
                })
              }
            })
            .catch((e) => {
              reply(e)
            })
          break

        case 'igs':
        case 'igstory':
          if (!isUrl(args[0]) && !args[0].includes("instagram.com")) {
            await reply("_Link tidak valid_ \nGunakan url lengkap: https://instagram.com/<username> jangan gunakan username saja.")
            return
          }
          await dl.igstory(args[0])
            .then(async (igs) => {
              try {
                igs.forEach(async (element) => {
                  await sendMediaURL(element.url, "")
                })
              } catch (e) {
                await dl.igstory(args[0]).then(async (y) => {
                    try {
                      y.forEach(async (element) => {
                        await sendMediaURL(element.url, "")
                      })
                    } catch (e) {
                      reply(e.message)
                    }
                  })
                  .catch((e) => {
                    reply(e.message)
                  })
              }
            })
            .catch((e) => {
              reply(e)
            })
          break

        case "tt":
        case "tiktok":
        case "ttdl":
          if (!isUrl(args[0]) && !args[0].includes("tiktok.com")) {
            await reply("_Link tidak valid_")
            return
          }
          await dl.ttdl(args[0]).then(async (res) => {
            await dl.ttdl2(args[0]).then(async (ress) => {
              let tamnel = await getBuffer(ress.tumb)
              await sendButImage(
                from,
                `📜 *Title*: ${ress.text}\n\nSilahkan pilih salah satu format yg ingin didownload`, "Bahagia-Bot",
                tamnel, [{
                    buttonId: `${prefix}sndmediaa ${res.nowm}`,
                    buttonText: {
                      displayText: `NO WM`,
                    },
                    type: 1,
                  },
                  {
                    buttonId: `${prefix}sndmediaa ${res.wm}`,
                    buttonText: {
                      displayText: `WITH WM`,
                    },
                    type: 1,
                  },
                  {
                    buttonId: `${prefix}sndmediaa ${res.audio}`,
                    buttonText: {
                      displayText: `AUDIO`,
                    },
                    type: 1,
                  }
                ]).then((resp) => {
                console.log("done")
              }).catch((e) => {
                reply(e.message)
              })
            }).catch((e) => {
              reply(e.message)
            })
          }).catch((e) => {
            reply(e.message)
          })
          break

        case 'tw':
        case 'twdl':
        case 'twitter':
          if (!isUrl(args[0]) && !args[0].includes("twitter.com")) {
            await reply("_Link tidak valid_")
            return
          }
          await dl.twdl(args[0]).then(async (res) => {
            let tamnel = await getBuffer(res.thumbnail)
            await sendButImage(
              from,
              `📜 *Title*: ${res.desc}\n\nSilahkan pilih salah satu format yg ingin didownload`,
              "Bahagia-Bot",
              tamnel,
              [{
                  buttonId: `${prefix}sndmediaa ${res.data.khd.url}`,
                  buttonText: {
                    displayText: `HD (${formatBytes(res.data.khd.size)})`,
                  },
                  type: 1,
                },
                {
                  buttonId: `${prefix}sndmediaa ${res.data.ksd.url}`,
                  buttonText: {
                    displayText: `SD (${formatBytes(res.data.ksd.size)})`,
                  },
                  type: 1,
                },
              ]).then((resp) => {
              console.log("done")
            }).catch((e) => {
              reply(e.message)
            })
          }).catch((e) => {
            reply(e.message)
          })
          break

        case "sndmediaa":
          await sendMediaURL(args[0], "")
          break

        case "nulis":
          nulis(args).then(async (res) => {
            sendMedPath(res, "Nulis Berhasil!\n\nJangan lupa follow ig: https://s.id/botbahagia-ig", image)
              .catch((e) => reply(e.message))
          }).catch((e) => reply(e.message))
          break

        case "bka":
        case "bukukanan":
          nulis(args).then(async (res) => {
            sendMedPath(res, "Nulis Buku Kanan, Done!", image)
              .catch((e) => reply(e.message))
          }).catch((e) => reply(e.message))
          break

        case "bki":
        case "bukukiri":
          nulis(args, "bukukiri").then(async (res) => {
            sendMedPath(res, "Nulis Buku Kiri, Done!", image)
              .catch((e) => reply(e.message))
          }).catch((e) => reply(e))
          break

        case "fka":
        case "foliokanan":
          nulis(args, "fka").then(async (res) => {
            sendMedPath(res, "Nulis Folio Kanan, Done!", image)
              .catch((e) => reply(e.message))
          }).catch((e) => reply(e))
          break

        case "fki":
        case "foliokiri":
          nulis(args, "fki").then(async (res) => {
            sendMedPath(res, "Nulis Folio Kiri, Done!", image)
              .catch((e) => reply(e.message))
          }).catch((e) => reply(e))
          break

        // https://github.com/tesseract-ocr/tesseract
        case "ocr":
          if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
            const media = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek

            const filePath = await conn.downloadAndSaveMediaMessage(media, `./public/${getRandom()}`)

            await recognize(filePath, {
                lang: 'eng+ind',
                oem: 1,
                psm: 3
              })
              .then(teks => {
                reply(teks.trim())
                fs.unlinkSync(filePath)
              })
              .catch(err => {
                reply("OCR gagal")
                console.error("OCR error: ", err)
                fs.unlinkSync(filePath)
              })

            function recognize(filename, config = {}) {
              const options = getOptions(config)
              const binary = config.binary || "tesseract"

              const command = [binary, `"${filename}"`, "stdout", ...options].join(" ")
              if (config.debug) log("command", command)

              return new Promise((resolve, reject) => {
                exec(command, (error, stdout, stderr) => {
                  if (config.debug) log(stderr)
                  if (error) reject(error)
                  resolve(stdout)
                })
              })
            }

            function getOptions(config) {
              const ocrOptions = ["tessdata-dir", "user-words", "user-patterns", "psm", "oem", "dpi"]

              return Object.entries(config)
                .map(([key, value]) => {
                  if (["debug", "presets", "binary"].includes(key)) return
                  if (key === "lang") return `-l ${value}`
                  if (ocrOptions.includes(key)) return `--${key} ${value}`

                  return `-c ${key}=${value}`
                })
                .concat(config.presets)
                .filter(Boolean)
            }
          } else {
            reply(`Kamu belum melampirkan foto yang akan discan.!`)
            return
          }
          break

          // Special thanks to Sumanjay for his carbon api
        case 'textcarbon':
          let carbon_txt = args.join(' ')
          try {
            const cb = async (carbon_txt) => {
              console.log("memproses carbon" + carbon_txt)
              await axios({
                  method: 'post',
                  url: 'https://carbonara.vercel.app/api/cook',
                  data: {
                    "code": carbon_txt
                  },
                  responseType: 'arraybuffer'
                })
                .then(async (res) => {
                  console.log("mengirim")
                  await conn.sendMessage(from, Buffer.from(res.data), image, {
                      caption: `Hasil untuk 👇\n` + "```" + carbon_txt + "```"
                    })
                    .then(() => {
                      console.log("terkirim")
                    })
                    .catch((e) => {
                      console.error(e)
                      reply(`*⛔ Maaf*\n\n` + "```Terjadi kesalahann pada saat memproses data.```")
                    })
                })
                .catch((e) => {
                  console.error(e)
                  reply(`*⛔ Maaf*\n\n` + "```Terjadi kesalahann pada saat memproses data.```")
                })
            }
            await cb(carbon_txt)
          } catch (e) {
            console.log("proses pertama gagal", e)
            const img = await carbon(carbon_txt)
            console.log("mengirim")
            await conn.sendMessage(from, Buffer.from(img.data), MessageType.image, {
                mimetype: Mimetype.png,
                caption: `Hasil untuk 👇\n` + "```" + carbon_txt + "```"
              })
              .catch((e) => {
                console.error(e)
                reply(`*⛔ Maaf*\n\n` + "```Terjadi kesalahann pada saat mengirim data.```")
              })
            console.log("terkirim")
          }
          break

        case 'qr':
        case 'qr-code':
          const qr_txt = args.join(" ")
          const qr_fun = async (qr_txt) => {
            console.log("memproses qr: " + qr_txt)
            const hasil = qr.imageSync(qr_txt, {
              ec_level: 'H',
              type: 'png'
            })
            await conn.sendMessage(from, hasil, image, {
                caption: `QR code untuk 👇\n` + "```" + qr_txt + "```"
              })
              .then(() => {
                console.log("terkirim")
              })
              .catch((e) => {
                console.error(e)
                reply(`*⛔ Maaf*\n\n` + "```Terjadi kesalahann pada saat memproses data.```")
              })
          }
          await qr_fun(qr_txt)
          break

          // https://www.codegrepper.com/code-examples/javascript/read+qr+code+from+image+nodejs
        case 'qr-read':
        case 'qrr':
        case 'qrread':
          console.log("qrread processing")
          if ((isMedia && !mek.message.videoMessage || isQuotedImage)) {
            const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
            const media = await conn.downloadAndSaveMediaMessage(encmedia, "./public/qrreader_img")
            console.log("media downloaded", media)

            let buffer = fs.readFileSync(media)
            Jimp.read(buffer, function (err, image) {
              if (err) {
                console.error(err)
                reply(err)
                return
              }
              let qrcode = new qrCode()
              qrcode.callback = function (err, value) {
                if (err) {
                  console.error(err)
                  reply("Kami tidak menemukan apapun. Silahkan ulangi dengan gambar yang jelas dan usahakan barcode tidak terpotong")
                  return
                }
                try {
                  reply(value.result)
                  console.log("sent")
                } catch (e) {
                  console.log(value)
                  reply("maaf, terjadi kesalahan saat membaca data.")
                }
              }
              qrcode.decode(image.bitmap)
            })
          } else {
            reply("Perintah ini membutuhkan lampiran gambar yang mengandung QR Code.")
          }
          break

        case 'bucin':
          if(args.join(" ").includes("<") || args.join(" ").includes(">")){
            reply(`Tanpa "< >" Bro, Langsung kasih nama aja \nContoh: ${prefix} Ayunda`)
            return
          }
          reply("https://riyanris.my.id/bucin-simple/?in=" + args.join("%20"))
          break

        case 'katacinta':
        case 'quotescinta':
          const katacinta = async () => {
            const reandomm = Math.floor(Math.random() * 365)
            axios.get(`https://raw.githubusercontent.com/tulungagungcode/bot_source/master/katacinta/${reandomm}.json`)
              .then(async (res) => {
                const reandommm = Math.floor(Math.random() * res.data.length)
                const data = res.data[reandommm]
                await reply(`_${data.quotes}_\n\n~*${data.author}*`)
                await sendButMessage(from, "dw", "wd", [{
                  buttonId: `${prefix}bucin`,
                  buttonText: {
                    displayText: `Mau Lagi...`,
                  },
                  type: 1,
                }])
              })
              .catch(() => {
                console.error("maaf, terjadi kesalahan pada server kami.")
              })
          }

          katacinta()
          break

        case 'motivasi':
        case 'katamotivasi':
        case 'katabijak':
          const katabijak = async () => {
            axios.get(`https://raw.githubusercontent.com/tulungagungcode/bot_source/master/katabijak/katabijak.json`)
              .then(async (res) => {
                const result = res.data
                const reandommm = Math.floor(Math.random() * result.length)
                const data = result[reandommm]
                reply(`_${data.quotes}_\n\n~*${data.author}*`)
              })
              .catch(() => {
                console.error("maaf, terjadi kesalahan pada server kami.")
              })
          }

          katabijak()
          break

          // THANKS TO github.com/pajaar
        case 'faktaunik':
          const faktaunik = async () => {
            console.log("faktaunik processing")
            const url = "https://raw.githubusercontent.com/pajaar/grabbed-results/master/pajaar-2020-fakta-unik.txt"
            axios.get(url)
              .then(async (res) => {
                try {
                  let faktas = res.data.split("\n")
                  let faktarandom = faktas[Math.floor(Math.random() * faktas.length)]
                  reply(faktarandom)
                } catch (e) {
                  console.error("error:", e)
                  reply("maaf, terjadi kesalahan pada sistem kami.")
                }
              })
              .catch((e) => {
                console.error("error:", e)
                reply("maaf, terjadi kesalahan pada sistem kami.")
              })
          }
          faktaunik()
          break

        case 'tg':
        case 'tebakgambar':
          await tebakgambar2()
            .then(async (res) => {
              await sendMediaURL(res.img, "_kami tunggu 2 menit mulai dari sekarang_")
                .then((resp) => {
                  console.log("sent")

                  // buat perintah bahwa si x sedang mengerjakan tebak gambar
                  const jawaban = res.jawaban.toLowerCase()
                  data = {
                    from: from,
                    percobaan: 1,
                    jawaban: jawaban,
                    penjelasan: res.deskripsi
                  }
                  let tebakgambarbaru = JSON.parse(fs.readFileSync("./src/data/tebakgambar.json"))
                  tebakgambarbaru.push(data)
                  fs.writeFileSync("./src/data/tebakgambar.json", JSON.stringify(tebakgambarbaru))

                  // mulai hitung mundur 2 menit dari sekarang, kalo belum terjawab, munculin jawabanya
                  let tedd = 1
                  const intervRemind = setInterval(async () => {
                    let datatebakgambar = JSON.parse(fs.readFileSync("./src/data/tebakgambar.json"))
                    let isTebakgambar = false

                    datatebakgambar.forEach((i, el) => {
                      if (from == i.from) {
                        isTebakgambar = true
                      }
                    })

                    if (!isTebakgambar) { // kondisi jika terjawab
                      console.log("terjawab")
                      clearInterval(intervRemind)
                    }

                    if (tedd == 60) {
                      conn.sendMessage(from, "Udah satu menit nih, belum juga kejawab..", text, {
                        quoted: resp
                      })
                    }

                    if (tedd++ == 120) { // kondisi jika sudah 2 menit belum terjawab
                      sendButMessage(from, "Kamu gagal menjawab, jawaban yang benar adalah *" + jawaban + "*.\nPenjelasan: " + res.deskripsi, `Mau main lagi???`, [{
                          buttonId: `${prefix}tg`,
                          buttonText: {
                            displayText: `Ya`,
                          },
                          type: 1,
                        },
                        {
                          buttonId: `sd`,
                          buttonText: {
                            displayText: `Tidak`,
                          },
                          type: 1,
                        },
                      ], {
                        quoted: resp
                      })
                      let datatsdebakgambar = JSON.parse(fs.readFileSync("./src/data/tebakgambar.json"))
                      let inddfx
                      datatebakgambar.forEach((i, el) => {
                        if (from == i.from) {
                          inddfx = el
                        }
                      })
                      datatsdebakgambar.splice(inddfx, 1)
                      fs.writeFileSync("./src/data/tebakgambar.json", JSON.stringify(datatsdebakgambar))
                      clearInterval(intervRemind)
                    }
                  }, 1000);
                })
                .catch(async (e) => {
                  const txt = `[ *ERROR* ]\n\nTime: ${time}\nFrom: ${from}\nCommand: ${command}\n---------------\nMsg: ${e.msg}\nLink img: ${res.image}\nError: ${e}`
                  await sendToOwner(txt)
                  console.error(e)
                  sendButMessage(from, "maaf terjadi kesalahan saat mengirim gambar.", `Ulangi lagi..???`, [{
                      buttonId: `${prefix}tg`,
                      buttonText: {
                        displayText: `Ya`,
                      },
                      type: 1,
                    },
                    {
                      buttonId: `sd`,
                      buttonText: {
                        displayText: `Tidak`,
                      },
                      type: 1,
                    },
                  ], {
                    quoted: mek
                  })
                })
            })
            .catch((e) => {
              reply(e)
            })
          break

        case 'tp':
        case 'tebakpribahasa':
          await tebakpribahasa()
            .then(async (res) => {
              await conn.sendMessage(from, res.soal, text).then((resp) => {
                  // buat perintah bahwa si x sedang mengerjakan tebak pribahasa
                  data = {
                    from: from,
                    percobaan: 1,
                    soal: res.soal,
                    jawaban: res.jawaban,
                    arti: res.arti,
                    status: 0
                  }
                  let tebakpribahasabaru = JSON.parse(fs.readFileSync("./src/data/tebakpribahasa.json"))
                  tebakpribahasabaru.push(data)
                  fs.writeFileSync("./src/data/tebakpribahasa.json", JSON.stringify(tebakpribahasabaru))

                  // mulai hitung mundur 2 menit dari sekarang, kalo belum terjawab, munculin jawabanya
                  let tedd = 1
                  const intervRemind = setInterval(async () => {
                    let datatebakpribahasa = JSON.parse(fs.readFileSync("./src/data/tebakpribahasa.json"))
                    let isTebakPribahasa = false

                    datatebakpribahasa.forEach((i, el) => {
                      if (from == i.from) {
                        isTebakPribahasa = true
                      }
                    })

                    if (!isTebakPribahasa) { // kondisi jika terjawab
                      clearInterval(intervRemind)
                    }

                    if (tedd == 60) {
                      conn.sendMessage(from, "Udah satu menit nih, belum juga kejawab..", text, {
                        quoted: resp
                      })
                    }

                    if (tedd++ == 120) { // kondisi jika sudah 2 menit belum terjawab
                      sendButMessage(from, "Kamu gagal menjawab, jawaban yang benar adalah *" + res.jawaban + "*.\n_" + res.soal.replace("....", res.jawaban) + "_\n\nArti: " + res.arti, `Mau main lagi???`, [{
                          buttonId: `${prefix}tp`,
                          buttonText: {
                            displayText: `Ya`,
                          },
                          type: 1,
                        },
                        {
                          buttonId: `sd`,
                          buttonText: {
                            displayText: `Tidak`,
                          },
                          type: 1,
                        },
                      ], {
                        quoted: resp
                      })
                      let datatsdebakpribahasa = JSON.parse(fs.readFileSync("./src/data/tebakpribahasa.json"))
                      let inddfx
                      datatebakpribahasa.forEach((i, el) => {
                        if (from == i.from) {
                          inddfx = el
                        }
                      })
                      datatsdebakpribahasa.splice(inddfx, 1)
                      fs.writeFileSync("./src/data/tebakpribahasa.json", JSON.stringify(datatsdebakpribahasa))
                      clearInterval(intervRemind)
                    }
                  }, 1000);
                })
                .catch(async (e) => {
                  console.error(e)
                  sendButMessage(from, "maaf terjadi kesalahan saat mengirim data.", `Ulangi lagi..???`, [{
                      buttonId: `${prefix}tp`,
                      buttonText: {
                        displayText: `Ya`,
                      },
                      type: 1,
                    },
                    {
                      buttonId: `sd`,
                      buttonText: {
                        displayText: `Tidak`,
                      },
                      type: 1,
                    },
                  ], {
                    quoted: mek
                  })
                })
            })
            .catch((e) => {
              reply(e)
            })
          break

        case 'skip':
          (() => {
            let tebakgambar = JSON.parse(fs.readFileSync("./src/data/tebakgambar.json"))
            let tebakpribahasa = JSON.parse(fs.readFileSync("./src/data/tebakpribahasa.json"))
            let index_priba = null,
              index_gamb = null
            tebakpribahasa.forEach((i, el) => {
              if (from == i.from) {
                index_priba = el

              }
            })
            if (index_priba != null) {
              tebakpribahasa.splice(index_priba, 1)
              fs.writeFileSync("./src/data/tebakpribahasa.json", JSON.stringify(tebakpribahasa))
            }

            tebakgambar.forEach((i, el) => {
              if (from == i.from) {
                index_gamb = el

              }
            })
            if (index_gamb != null) {
              tebakgambar.splice(index_gamb, 1)
              fs.writeFileSync("./src/data/tebakgambar.json", JSON.stringify(tebakgambar))
            }
            reply("Kamu telah keluar dari semua games.")
          })()

          break

        case 'sms':
        case 'bomsms':
          let sms_spamm = args[0]
          if (sms_spam == undefined || sms_spam == "") {
            reply("Perintah ini memerlukan 1 argumen yaitu nomor target. \n\ncontoh: */sms 896xxxxxxxx*")
            return
          }
          if (sms_spamm.startsWith("08")) {
            sms_spamm = sms_spamm.slice(1, 100)
          } else if (sms_spamm.startsWith("62")) {
            sms_spamm = sms_spamm.slice(2, 100)
          } else if (sms_spamm.startsWith("+62")) {
            sms_spamm = sms_spamm.slice(3, 100)
          }
          await call_nutriclub(sms_spamm)
          await new Promise(r => setTimeout(r, 5000))
          await sms_oyo(sms_spamm)
          await new Promise(r => setTimeout(r, 5000))
          await sms_mapclub(sms_spamm)
          await new Promise(r => setTimeout(r, 5000))
          await sms_icq(sms_spamm)
          await new Promise(r => setTimeout(r, 5000))
          await sms_fave(sms_spamm)
          await new Promise(r => setTimeout(r, 5000))
          await sms_kredinesia(sms_spamm)
          await new Promise(r => setTimeout(r, 5000))
          await call_jagreward(sms_spamm)
          await new Promise(r => setTimeout(r, 5000))
          await sms_olx(sms_spamm)
          await new Promise(r => setTimeout(r, 5000))
          await sms_maucash(sms_spamm)
          await new Promise(r => setTimeout(r, 5000))
          await call_nutriclub(sms_spamm)
          await new Promise(r => setTimeout(r, 5000))
          await sms_oyo(sms_spamm)
          await new Promise(r => setTimeout(r, 5000))
          await sms_mapclub(sms_spamm)
          await new Promise(r => setTimeout(r, 5000))
          await sms_icq(sms_spamm)
          await new Promise(r => setTimeout(r, 5000))
          await sms_fave(sms_spamm)
          await new Promise(r => setTimeout(r, 5000))
          await sms_kredinesia(sms_spamm)
          await new Promise(r => setTimeout(r, 5000))
          await call_jagreward(sms_spamm)
          await new Promise(r => setTimeout(r, 5000))
          await sms_olx(sms_spamm)
          await new Promise(r => setTimeout(r, 5000))
          await sms_maucash(sms_spamm)
          await new Promise(r => setTimeout(r, 5000))
          await smscall_random(sms_spamm)
          await new Promise(r => setTimeout(r, 5000))
          break;

        case 'pln':
          dl.pln(args[0])
            .then((res) => {
              let jawab
              if (res.status) {
                jawab = `*PLN PASCABAYAR*\n\n*ID PEL: ${res.id_pel}*\n*NAMA*: ${res.nama_cust}\n*TAGIHAN*: ${res.tagihan}`
              } else {
                jawab = res.msg
              }
              reply(jawab)
            })
            .catch((e) => {
              reply(e)
            })
          break;

        case 'rmbg':
        case 'rembg':
        case 'bgrm':
          console.log("rmbg processing")
          if ((isMedia && !mek.message.videoMessage || isQuotedImage)) {
            const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
            const media = await conn.downloadAndSaveMediaMessage(encmedia, "./public/rmbg")
            console.log("media downloaded", media)
            await removebg(media).then(async (res) => {
                console.log("Sending")
                await conn.sendMessage(from, res, image).then((res) => {
                    console.log("Sent")
                  })
                  .catch((e) => {
                    console.log("error sending..", e)
                    reply("Gagal mengirim media, ulangi beberapa saat lagi.")
                  })
              })
              .catch((e) => {
                reply(e)
              })
          } else {
            reply("Kamu lupa melampirkan gambar yang akan di hapus backgroundnya.")
          }
          break;

        case 'tts':
          if (args[0] == undefined || args[0] == "") {
            reply("Kami membutuhkan kalimat untuk di proses.")
            break
          }
          let language_tts = "id"
          let language_text_tts
          if (args.includes("--lang") || args.includes("-l") || args.includes("-L")) {
            for (let i = 0; i < args.length; i++) {
              if (args[i].includes("--lang") || args[i].includes("-l")) {
                language_tts = args[i + 1]
              }
            }
            let textArr = args.splice(2)
            language_text_tts = textArr.join(" ")
          } else {
            language_text_tts = args.join(" ")
          }

          let res
          try {
            res = await gtts(language_text_tts, language_tts)
          } catch (e) {
            res = await gtts(language_text_tts)
          } finally {
            conn.sendMessage(from, fs.readFileSync("./public/gtts.wav"), audio, {
              mimetype: "audio/mp4"
            }).catch((e) => reply("error" + " "))
          }
          break;

        case 'kbj':
          kbj(args.join(" ")).then((res) => reply(res)).catch((e) => reply(e))
          break

        case 'kbbi':
          kbbi(args.join(" ")).then((res) => {
            res.forEach((v, i) => {
              let kal = `*${v.title}*\n_${v.jenis}_\n\n${v.arti}`
              conn.sendMessage(from, kal, text)
            })
          }).catch((e) => reply(e))
          break

        case 'aksara':
          reply(aksara(args.join(" ")))
          break

          // https://algorithmia.com
        case 'colorize1':
          function base64_encode(file) {
            let bitmap = fs.readFileSync(file);
            return new Buffer.from(bitmap).toString('base64');
          }

          if ((isMedia && !mek.message.videoMessage || isQuotedImage)) {
            const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
            const media = await conn.downloadAndSaveMediaMessage(encmedia, "./public/colorize")
            console.log("media downloaded", media)
            let base64str = base64_encode(media)

            var input = {
              "image": "data:image/png;base64," + base64str
            };
            clientAlgo.algo("deeplearning/ColorfulImageColorization/1.1.14?timeout=300") // timeout is optional
              .pipe(input)
              .then(async (response) => {
                if (!response.error) {
                  const download_uri = response.result.output
                  clientAlgo.file(download_uri).exists(function (exists) {
                    if (exists == true) {
                      clientAlgo.file(download_uri).get(async function (err, data) {
                        if (err) {
                          reply("Failed to download file.");
                        } else {
                          fs.writeFileSync("public/haha.png", data);
                          await conn.sendMessage(from, data, image)
                            .catch((e) => {
                              reply("error: " + e.message)
                            })
                        }
                      });
                    } else {
                      reply("error url")
                    }
                  });
                  // const path = response.result.output.split("//")[1]
                  // let url = "https://algorithmia.com/v1/data/" + path
                  // await sendMediaURL(url, `Link: ${url}`)
                } else {
                  reply(response.error.message)
                }
              })
          } else {
            reply(`Perintah ini memerlukan gambar hitam putih, mungkin kamu lupa melampirkanya.`)
          }
          break

          // https://deepai.org/
        case 'colorize':
        case 'imgcolorize':
        case 'imgcol':
          if ((isMedia && !mek.message.videoMessage || isQuotedImage)) {
            const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
            const media = await conn.downloadAndSaveMediaMessage(encmedia, "./public/colorize")
            console.log("media downloaded", media)
            let resp = await deepai.callStandardApi("colorizer", {
              image: fs.createReadStream(media),
            })
            await sendMediaURL(resp.output_url, `Link: ${resp.output_url}`)
          } else {
            reply(`Perintah ini memerlukan gambar hitam putih, mungkin kamu lupa melampirkanya.`)
          }
          break

        case 'imgtohd':
        case 'img2hd':
        case 'hdimg':
          if ((isMedia && !mek.message.videoMessage || isQuotedImage)) {
            const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
            const media = await conn.downloadAndSaveMediaMessage(encmedia, "./public/tohd")
            console.log("media downloaded", media)
            let resp = await deepai.callStandardApi("torch-srgan", {
              image: fs.createReadStream(media),
            })
            await sendMediaURL(resp.output_url, `Link: ${resp.output_url}`)
          } else {
            reply(`Perintah ini memerlukan gambar resolusi rendah, mungkin kamu lupa melampirkanya.`)
          }
          break

        case 'img2toon':
        case 'imgtotoon':
          if ((isMedia && !mek.message.videoMessage || isQuotedImage)) {
            const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
            const media = await conn.downloadAndSaveMediaMessage(encmedia, "./public/colorize")
            console.log("media downloaded", media)
            let resp = await deepai.callStandardApi("toonify", {
              image: fs.createReadStream(media),
            })
            await sendMediaURL(resp.output_url, `Link: ${resp.output_url}`)
          } else {
            reply(`Perintah ini memerlukan gambar yang akan dirubah dalam bentuk kartun, mungkin kamu lupa melampirkanya.`)
          }
          break

        case 'memechangemymind':
          await cmm(args.join(" ")).then(async (res) => {
            await sendMediaURL(res, `Link: ${res}`)
          }).catch((e) => reply(e))
          break

        case 'memedrake':
          await drake(args.join(" ")).then(async (res) => {
            await sendMediaURL(res, `Link: ${res}`)
          }).catch((e) => reply(e))
          break

        case 'memeslapping':
          await slapping(args.join(" ")).then(async (res) => {
            await sendMediaURL(res, `Link: ${res}`)
          }).catch((e) => reply(e))
          break

        case 'memeskeleton':
          await skeleton(args.join(" ")).then(async (res) => {
            await sendMediaURL(res, `Link: ${res}`)
          }).catch((e) => reply(e))
          break

        case 'memesadpablo':
          await sadpablo(args.join(" ")).then(async (res) => {
            await sendMediaURL(res, `Link: ${res}`)
          }).catch((e) => reply(e))
          break

        case 'memetwobutton':
          await twobutton(args.join(" ")).then(async (res) => {
            await sendMediaURL(res, `Link: ${res}`)
          }).catch((e) => reply(e))
          break

        case 'memedistrack':
          await distrack(args.join(" ")).then(async (res) => {
            await sendMediaURL(res, `Link: ${res}`)
          }).catch((e) => reply(e))
          break

        case 'memebaloon':
          await baloon(args.join(" ")).then(async (res) => {
            await sendMediaURL(res, `Link: ${res}`)
          }).catch((e) => reply(e))
          break

        case 'memehartatahta':
          if (args[0] == undefined || args[0] == "") {
            reply("Perintah ini memerlukan satu argumen. \n\nSemisal: */htt Ayunda*")
            return
          }
          await hartatahta(args[0]).then(async (res) => {
            await sendMedPath(res)
          }).catch((e) => reply(e))
          break

        case 'memetrump':
          var ttinullimage = await axios.get(`https://nekobot.xyz/api/imagegen?type=trumptweet&text=${args.join(" ").replace(/Ö/g, "%C3%96").replace(/ö/g, "%C3%B6").replace(/ü/g, "%C3%BC").replace(/Ü/g, "%C3%9C").replace(/Ğ/g, "%C4%9E").replace(/ğ/g, "%C4%9F").replace(/ş/g, "%C5%9F").replace(/Ş/g, "%C5%9E").replace(/ç/g, "%C3%A7").replace(/Ç/g, "%C3%87").replace(/ı/g, "%C4%B1").replace(/i/g, "%69").replace(/"/g, "%22").replace(/İ/g, "%C4%B0")}&raw=1`, {
            responseType: 'arraybuffer'
          })

          await conn.sendMessage(from, Buffer.from(ttinullimage.data), MessageType.image, {
            mimetype: Mimetype.png
          })
          break

        case "kontak":
          pe = args.join(" ")
          wulinghiyah = pe.split(",")[0]
          nah = pe.split(",")[1]
          if (wulinghiyah.startsWith("08")) {
            no = wulinghiyah.slice(1, 100)
          } else if (wulinghiyah.startsWith("62")) {
            no = wulinghiyah.slice(2, 100)
          } else if (wulinghiyah.startsWith("+62")) {
            no = wulinghiyah.slice(3, 100)
          }

          if (isNaN(no)) return reply("Invalid phone number")
          vcard =
            "BEGIN:VCARD\n" +
            "VERSION:3.0\n" +
            `FN:${nah}\n` +
            `TEL;type=CELL;type=VOICE;waid=${"62" + no}:${"62" + no}\n` +
            "END:VCARD".trim()
          conn.sendMessage(
            from, {
              displayName: `${nah}`,
              vcard: vcard
            },
            contact
          )
          break

        case 'aurobot':
          if ((isMedia && !mek.message.audioMessage || isQuotedAudio)) {
            const encmedia = isQuotedAudio ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
            const media = await conn.downloadAndSaveMediaMessage(encmedia, "./public/aurobot")
            console.log("media downloaded", media)
            let ran = './public/aurobott.mp3'
            try {
              exec(`ffmpeg -i ${media} -filter_complex "afftfilt=real='hypot(re,im)*sin(0)':imag='hypot(re,im)*cos(0)':win_size=512:overlap=0.75" ${ran}`, async (err, stderr, stdout) => {
                fs.unlinkSync(media)
                if (err) reply("eror: ", err)
                let buff = fs.readFileSync(ran)
                await conn.sendMessage(from, buff, audio, {
                  quoted: mek,
                  mimetype: 'audio/mp4'
                }).then((e) => {
                  fs.unlinkSync(ran)
                }).catch((e) => {
                  reply("kesalahan saat mengirim file ke anda, ulangi beberapa saat lagi.")
                })
              })
            } catch (e) {
              reply("Terjadi kesalahan saat memproses data, ulangi beberapa saat lagi.")
            }
          } else {
            reply(`Perintah ini memerlukan audio untuk di proses.`)
          }
          break

        case 'aublown':
          if ((isMedia && !mek.message.audioMessage || isQuotedAudio)) {
            const encmedia = isQuotedAudio ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
            const media = await conn.downloadAndSaveMediaMessage(encmedia, "./public/aublown")
            console.log("media downloaded", media)
            let ran = './public/aublownn.mp3'
            try {
              exec(`ffmpeg -i ${media} -af acrusher=.1:1:64:0:log ${ran}`, async (err, stderr, stdout) => {
                fs.unlinkSync(media)
                if (err) reply("eror: ", err)
                let buff = fs.readFileSync(ran)
                await conn.sendMessage(from, buff, audio, {
                  quoted: mek,
                  mimetype: 'audio/mp4'
                }).then((e) => {
                  fs.unlinkSync(ran)
                }).catch((e) => {
                  reply("kesalahan saat mengirim file ke anda, ulangi beberapa saat lagi.")
                })
              })
            } catch (e) {
              reply("Terjadi kesalahan saat memproses data, ulangi beberapa saat lagi.")
            }
          } else {
            reply(`Perintah ini memerlukan audio untuk di proses.`)
          }
          break

        case 'audeep':
          if ((isMedia && !mek.message.audioMessage || isQuotedAudio)) {
            const encmedia = isQuotedAudio ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
            const media = await conn.downloadAndSaveMediaMessage(encmedia, "./public/audeep")
            console.log("media downloaded", media)
            let ran = './public/audeepp.mp3'
            try {
              exec(`ffmpeg -i ${media} -af acrusher=.1:1:64:0:log ${ran}`, async (err, stderr, stdout) => {
                fs.unlinkSync(media)
                if (err) reply("eror: ", err)
                let buff = fs.readFileSync(ran)
                await conn.sendMessage(from, buff, audio, {
                  quoted: mek,
                  mimetype: 'audio/mp4'
                }).then((e) => {
                  fs.unlinkSync(ran)
                }).catch((e) => {
                  reply("kesalahan saat mengirim file ke anda, ulangi beberapa saat lagi.")
                })
              })
            } catch (e) {
              reply("Terjadi kesalahan saat memproses data, ulangi beberapa saat lagi.")
            }
          } else {
            reply(`Perintah ini memerlukan audio untuk di proses.`)
          }
          break

        case 'aufast':
          if ((isMedia && !mek.message.audioMessage || isQuotedAudio)) {
            const encmedia = isQuotedAudio ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
            const media = await conn.downloadAndSaveMediaMessage(encmedia, "./public/aufast")
            console.log("media downloaded", media)
            let ran = './public/aufastt.mp3'
            try {
              exec(`ffmpeg -i ${media} -filter:a "atempo=1.63,asetrate=44100"  ${ran}`, async (err, stderr, stdout) => {
                fs.unlinkSync(media)
                if (err) reply("eror: ", err)
                let buff = fs.readFileSync(ran)
                await conn.sendMessage(from, buff, audio, {
                  quoted: mek,
                  mimetype: 'audio/mp4'
                }).then((e) => {
                  fs.unlinkSync(ran)
                }).catch((e) => {
                  reply("kesalahan saat mengirim file ke anda, ulangi beberapa saat lagi.")
                })
              })
            } catch (e) {
              reply("Terjadi kesalahan saat memproses data, ulangi beberapa saat lagi.")
            }
          } else {
            reply(`Perintah ini memerlukan audio untuk di proses.`)
          }
          break

        case 'aufat':
          if ((isMedia && !mek.message.audioMessage || isQuotedAudio)) {
            const encmedia = isQuotedAudio ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
            const media = await conn.downloadAndSaveMediaMessage(encmedia, "./public/aufat")
            console.log("media downloaded", media)
            let ran = './public/aufatt.mp3'
            try {
              exec(`ffmpeg -i ${media} -filter:a "atempo=1.6,asetrate=22100" ${ran}`, async (err, stderr, stdout) => {
                fs.unlinkSync(media)
                if (err) reply("eror: ", err)
                let buff = fs.readFileSync(ran)
                await conn.sendMessage(from, buff, audio, {
                  quoted: mek,
                  mimetype: 'audio/mp4'
                }).then((e) => {
                  fs.unlinkSync(ran)
                }).catch((e) => {
                  reply("kesalahan saat mengirim file ke anda, ulangi beberapa saat lagi.")
                })
              })
            } catch (e) {
              reply("Terjadi kesalahan saat memproses data, ulangi beberapa saat lagi.")
            }
          } else {
            reply(`Perintah ini memerlukan audio untuk di proses.`)
          }
          break

        case 'aurev':
        case 'aureverse':
          if ((isMedia && !mek.message.audioMessage || isQuotedAudio)) {
            const encmedia = isQuotedAudio ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
            const media = await conn.downloadAndSaveMediaMessage(encmedia, "./public/aureverse")
            console.log("media downloaded", media)
            let ran = './public/aureversee.mp3'
            try {
              exec(`ffmpeg -i ${media} -filter_complex "areverse" ${ran}`, async (err, stderr, stdout) => {
                fs.unlinkSync(media)
                if (err) reply("eror: ", err)
                let buff = fs.readFileSync(ran)
                await conn.sendMessage(from, buff, audio, {
                  quoted: mek,
                  mimetype: 'audio/mp4'
                }).then((e) => {
                  fs.unlinkSync(ran)
                }).catch((e) => {
                  reply("kesalahan saat mengirim file ke anda, ulangi beberapa saat lagi.")
                })
              })
            } catch (e) {
              reply("Terjadi kesalahan saat memproses data, ulangi beberapa saat lagi.")
            }
          } else {
            reply(`Perintah ini memerlukan audio untuk di proses.`)
          }
          break

        case 'aunc':
        case 'aunightcore':
          if ((isMedia && !mek.message.audioMessage || isQuotedAudio)) {
            const encmedia = isQuotedAudio ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
            const media = await conn.downloadAndSaveMediaMessage(encmedia, "./public/aunc")
            console.log("media downloaded", media)
            let ran = './public/auncc.mp3'
            try {
              exec(`ffmpeg -i ${media} -filter:a atempo=1.06,asetrate=44100*1.25 ${ran}`, async (err, stderr, stdout) => {
                fs.unlinkSync(media)
                if (err) reply("eror: ", err)
                let buff = fs.readFileSync(ran)
                await conn.sendMessage(from, buff, audio, {
                  quoted: mek,
                  mimetype: 'audio/mp4'
                }).then((e) => {
                  fs.unlinkSync(ran)
                }).catch((e) => {
                  reply("kesalahan saat mengirim file ke anda, ulangi beberapa saat lagi.")
                })
              })
            } catch (e) {
              reply("Terjadi kesalahan saat memproses data, ulangi beberapa saat lagi.")
            }
          } else {
            reply(`Perintah ini memerlukan audio untuk di proses.`)
          }
          break

        case 'aubass':
        case 'aubas':
          if ((isMedia && !mek.message.audioMessage || isQuotedAudio)) {
            const encmedia = isQuotedAudio ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
            const media = await conn.downloadAndSaveMediaMessage(encmedia, "./public/aubass")
            console.log("media downloaded", media)
            let ran = './public/aubasss.mp3'
            try {
              exec(`ffmpeg -i ${media} -af equalizer=f=94:width_type=o:width=2:g=30 ${ran}`, async (err, stderr, stdout) => {
                fs.unlinkSync(media)
                if (err) reply("eror: ", err)
                let buff = fs.readFileSync(ran)
                await conn.sendMessage(from, buff, audio, {
                  quoted: mek,
                  mimetype: 'audio/mp4'
                }).then((e) => {
                  fs.unlinkSync(ran)
                }).catch((e) => {
                  reply("kesalahan saat mengirim file ke anda, ulangi beberapa saat lagi.")
                })
              })
            } catch (e) {
              reply("Terjadi kesalahan saat memproses data, ulangi beberapa saat lagi.")
            }
          } else {
            reply(`Perintah ini memerlukan audio untuk di proses.`)
          }
          break

        case 'auslow':
          if ((isMedia && !mek.message.audioMessage || isQuotedAudio)) {
            const encmedia = isQuotedAudio ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
            const media = await conn.downloadAndSaveMediaMessage(encmedia, "./public/auslow")
            console.log("media downloaded", media)
            let ran = './public/ausloww.mp3'
            try {
              exec(`ffmpeg -i ${media} -filter:a "atempo=0.7,asetrate=44100" ${ran}`, async (err, stderr, stdout) => {
                fs.unlinkSync(media)
                if (err) reply("eror: ", err)
                let buff = fs.readFileSync(ran)
                await conn.sendMessage(from, buff, audio, {
                  quoted: mek,
                  mimetype: 'audio/mp4'
                }).then((e) => {
                  fs.unlinkSync(ran)
                }).catch((e) => {
                  reply("kesalahan saat mengirim file ke anda, ulangi beberapa saat lagi.")
                })
              })
            } catch (e) {
              reply("Terjadi kesalahan saat memproses data, ulangi beberapa saat lagi.")
            }
          } else {
            reply(`Perintah ini memerlukan audio untuk di proses.`)
          }
          break

        case 'ausmooth':
          if ((isMedia && !mek.message.audioMessage || isQuotedAudio)) {
            const encmedia = isQuotedAudio ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
            const media = await conn.downloadAndSaveMediaMessage(encmedia, "./public/ausmooth")
            console.log("media downloaded", media)
            let ran = './public/ausmoothh.mp3'
            try {
              exec(`ffmpeg -i ${media} -filter:v "minterpolate='mi_mode=mci:mc_mode=aobmc:vsbmc=1:fps=120'" ${ran}`, async (err, stderr, stdout) => {
                fs.unlinkSync(media)
                if (err) reply("eror: ", err)
                let buff = fs.readFileSync(ran)
                await conn.sendMessage(from, buff, audio, {
                  quoted: mek,
                  mimetype: 'audio/mp4'
                }).then((e) => {
                  fs.unlinkSync(ran)
                }).catch((e) => {
                  reply("kesalahan saat mengirim file ke anda, ulangi beberapa saat lagi.")
                })
              })
            } catch (e) {
              reply("Terjadi kesalahan saat memproses data, ulangi beberapa saat lagi.")
            }
          } else {
            reply(`Perintah ini memerlukan audio untuk di proses.`)
          }
          break

        case 'autupai':
          if ((isMedia && !mek.message.audioMessage || isQuotedAudio)) {
            const encmedia = isQuotedAudio ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
            const media = await conn.downloadAndSaveMediaMessage(encmedia, "./public/autupai")
            console.log("media downloaded", media)
            let ran = './public/autupaii.mp3'
            try {
              exec(`ffmpeg -i ${media} -filter:a "atempo=0.5,asetrate=65100" ${ran}`, async (err, stderr, stdout) => {
                fs.unlinkSync(media)
                if (err) reply("eror: ", err)
                let buff = fs.readFileSync(ran)
                await conn.sendMessage(from, buff, audio, {
                  quoted: mek,
                  mimetype: 'audio/mp4'
                }).then((e) => {
                  fs.unlinkSync(ran)
                }).catch((e) => {
                  reply("kesalahan saat mengirim file ke anda, ulangi beberapa saat lagi.")
                })
              })
            } catch (e) {
              reply("Terjadi kesalahan saat memproses data, ulangi beberapa saat lagi.")
            }
          } else {
            reply(`Perintah ini memerlukan audio untuk di proses.`)
          }
          break


          // https://en.ephoto360.com/
          // Pake 1 text
        case 'textdaun':
          await ephoto360(args.join(" "), 'https://en.ephoto360.com/green-brush-text-effect-typography-maker-online-153.html')
            .then(async (res) => {
              await sendMediaURL(res.image)
            })
            .catch((e) => {
              reply(e)
            })
          break

        case 'text2daun':
          await ephoto360(args.join(" "), 'https://en.ephoto360.com/create-typography-status-online-with-impressive-leaves-357.html')
            .then(async (res) => {
              await sendMediaURL(res.image)
            })
            .catch((e) => {
              reply(e)
            })
          break

        case 'textmatrix':
          await ephoto360(args.join(" "), 'https://en.ephoto360.com/matrix-text-effect-154.html')
            .then(async (res) => {
              await sendMediaURL(res.image)
            })
            .catch((e) => {
              reply(e)
            })
          break

        case 'textgradient':
          await ephoto360(args.join(" "), 'https://en.ephoto360.com/create-3d-gradient-text-effect-online-600.html')
            .then(async (res) => {
              await sendMediaURL(res.image)
            })
            .catch((e) => {
              reply(e)
            })
          break

        case 'textglow':
          await ephoto360(args.join(" "), 'https://en.ephoto360.com/advanced-glow-effects-74.html')
            .then(async (res) => {
              await sendMediaURL(res.image)
            })
            .catch((e) => {
              reply(e)
            })
          break

        case 'textcoklat':
          await ephoto360(args.join(" "), 'https://en.ephoto360.com/write-text-on-chocolate-186.html')
            .then(async (res) => {
              await sendMediaURL(res.image)
            })
            .catch((e) => {
              reply(e)
            })
          break

        case 'texthbd':
          await ephoto360(args.join(" "), 'https://en.ephoto360.com/romantic-flower-heart-birthday-cake-by-name-edit-466.html')
            .then(async (res) => {
              await sendMediaURL(res.image)
            })
            .catch((e) => {
              reply(e)
            })
          break

        case 'textsnow':
          await ephoto360(args.join(" "), 'https://en.ephoto360.com/snow-on-text-online-107.html')
            .then(async (res) => {
              await sendMediaURL(res.image)
            })
            .catch((e) => {
              reply(e)
            })
          break

        case 'textsky':
          await ephoto360(args.join(" "), 'https://en.ephoto360.com/create-a-cloud-text-effect-in-the-sky-618.html')
            .then(async (res) => {
              await sendMediaURL(res.image)
            })
            .catch((e) => {
              reply(e)
            })
          break

        case 'textsand':
          await ephoto360(args.join(" "), 'https://en.ephoto360.com/write-in-sand-summer-beach-online-576.html')
            .then(async (res) => {
              await sendMediaURL(res.image)
            })
            .catch((e) => {
              reply(e)
            })
          break

        case 'textballoon':
          await ephoto360(args.join(" "), 'https://en.ephoto360.com/writing-your-name-on-hot-air-balloon-506.html')
            .then(async (res) => {
              await sendMediaURL(res.image)
            })
            .catch((e) => {
              reply(e)
            })
          break

        case 'textpencil':
          await textpro(args.join(" "), 'https://textpro.me/create-a-sketch-text-effect-online-1044.html')
            .then(async (res) => {
              await sendMediaURL(res.image)
            })
            .catch((e) => {
              reply(e)
            })
          break

        case 'text2graf':
          await ephoto360(args.join(" "), 'https://en.ephoto360.com/graffiti-color-199.html')
            .then(async (res) => {
              await sendMediaURL(res.image)
            })
            .catch((e) => {
              reply(e)
            })
          break

        case 'text2fire':
          await ephoto360(args.join(" "), 'https://en.ephoto360.com/dragon-fire-text-effect-111.html')
            .then(async (res) => {
              await sendMediaURL(res.image)
            })
            .catch((e) => {
              reply(e)
            })
          break

        case 'text2space':
          await ephoto360(args.join(" "), 'https://en.ephoto360.com/galaxy-text-effect-116.html')
            .then(async (res) => {
              await sendMediaURL(res.image)
            })
            .catch((e) => {
              reply(e)
            })
          break

        case 'textgold':
          await ephoto360(args.join(" "), 'https://en.ephoto360.com/modern-gold-3-212.html')
            .then(async (res) => {
              await sendMediaURL(res.image)
            })
            .catch((e) => {
              reply(e)
            })
          break

        case 'textangel':
          await ephoto360(args.join(" "), 'https://en.ephoto360.com/wings-galaxy-206.html')
            .then(async (res) => {
              await sendMediaURL(res.image)
            })
            .catch((e) => {
              reply(e)
            })
          break

        case 'textbp':
          await ephoto360(args.join(" "), 'https://en.ephoto360.com/online-blackpink-style-logo-maker-effect-711.html')
            .then(async (res) => {
              await sendMediaURL(res.image)
            })
            .catch((e) => {
              reply(e)
            })
          break

        case 'text2bp':
          await ephoto360(args.join(" "), 'https://en.ephoto360.com/create-a-blackpink-neon-logo-text-effect-online-710.html')
            .then(async (res) => {
              await sendMediaURL(res.image)
            })
            .catch((e) => {
              reply(e)
            })
          break

        case 'textneon':
          await textpro(args.join(" "), 'https://textpro.me/green-neon-text-effect-874.html')
            .then(async (res) => {
              await sendMediaURL(res.image)
            })
            .catch((e) => {
              reply(e)
            })
          break

        case 'text2neon':
          await textpro(args.join(" "), 'https://textpro.me/neon-light-text-effect-online-882.html')
            .then(async (res) => {
              await sendMediaURL(res.image)
            })
            .catch((e) => {
              reply(e)
            })
          break

        case 'textabear':
          await ephoto360(args.join(" "), 'https://en.ephoto360.com/create-funny-animations-of-a-traveling-bear-701.html')
            .then(async (res) => {
              await sendMediaURL(res.image)
            })
            .catch((e) => {
              reply(e)
            })
          break

        case 'textheart':
          await ephoto360(args.join(" "), 'https://en.ephoto360.com/write-name-on-heart-with-wings-gifs-430.html')
            .then(async (res) => {
              await sendMediaURL(res.image)
            })
            .catch((e) => {
              reply(e)
            })
          break

        case 'textpuppy':
          await ephoto360(args.join(" "), 'https://en.ephoto360.com/create-puppy-cute-animated-online-478.html')
            .then(async (res) => {
              await sendMediaURL(res.image)
            })
            .catch((e) => {
              reply(e)
            })
          break

        case 'text2coklat':
          await ephoto360(args.join(" "), 'https://en.ephoto360.com/create-glowing-text-effects-online-706.html')
            .then(async (res) => {
              await sendMediaURL(res.image)
            })
            .catch((e) => {
              reply(e)
            })
          break

        case 'textsad':
          await ephoto360(args.join(" "), 'https://en.ephoto360.com/write-text-on-wet-glass-online-589.html')
            .then(async (res) => {
              await sendMediaURL(res.image)
            })
            .catch((e) => {
              reply(e)
            })
          break

        case 'textpetir':
          await textpro(args.join(" "), 'https://textpro.me/create-thunder-text-effect-online-881.html')
            .then(async (res) => {
              await sendMediaURL(res.image)
            })
            .catch((e) => {
              reply(e)
            })
          break

        case 'text3bp':
          await textpro(args.join(" "), 'https://textpro.me/create-blackpink-logo-style-online-1001.html')
            .then(async (res) => {
              await sendMediaURL(res.image)
            })
            .catch((e) => {
              reply(e)
            })
          break

        case 'text3pubg':
          await ephoto360(args.join(" "), 'https://en.ephoto360.com/create-the-cover-game-playerunknown-s-battlegrounds-401.html')
            .then(async (res) => {
              await sendMediaURL(res.image)
            })
            .catch((e) => {
              reply(e)
            })
          break

        case 'textpubg':
          await ephoto360(args.join(" "), 'https://en.ephoto360.com/create-pubg-style-glitch-video-avatar-554.html')
            .then(async (res) => {
              await sendMediaURL(res.image)
            })
            .catch((e) => {
              reply(e)
            })
          break

        case 'text2pubg':
          await ephoto360(args.join(" "), 'https://en.ephoto360.com/lightning-pubg-video-logo-maker-online-615.html')
            .then(async (res) => {
              await sendMediaURL(res.image)
            })
            .catch((e) => {
              reply(e)
            })
          break

          // Pake 2 Text
        case 'textlove':
          txt = args.join(" ")
          if (txt.includes(';')) {
            split = txt.split(';');
            topText = split[0];
            bottomText = split[1];
          } else {
            topText = txt;
            bottomText = '';
          }
          await ephoto360([`${topText}`, `${bottomText}`], 'https://en.ephoto360.com/write-letters-on-the-balloons-love-189.html')
            .then(async (res) => {
              await sendMediaURL(res.image)
            })
            .catch((e) => {
              reply(e)
            })
          break

        case 'textpornhub':
          txt = args.join(" ")
          if (txt.includes(';')) {
            split = txt.split(';');
            topText = split[0];
            bottomText = split[1];
          } else {
            topText = txt;
            bottomText = '';
          }
          await textpro([`${topText}`, `${bottomText}`], 'https://textpro.me/pornhub-style-logo-online-generator-free-977.html')
            .then(async (res) => {
              await sendMediaURL(res.image)
            })
            .catch((e) => {
              reply(e)
            })
          break

        case 'textavenger':
          txt = args.join(" ")
          if (txt.includes(';')) {
            split = txt.split(';');
            topText = split[0];
            bottomText = split[1];
          } else {
            topText = txt;
            bottomText = '';
          }
          await textpro([`${topText}`, `${bottomText}`], 'https://textpro.me/create-3d-avengers-logo-online-974.html')
            .then(async (res) => {
              await sendMediaURL(res.image)
            })
            .catch((e) => {
              reply(e)
            })
          break

        case 'textgraf':
          txt = args.join(" ")
          if (txt.includes(';')) {
            split = txt.split(';');
            topText = split[0];
            bottomText = split[1];
          } else {
            topText = txt;
            bottomText = '';
          }
          await textpro([`${topText}`, `${bottomText}`], 'https://textpro.me/create-a-cool-graffiti-text-on-the-wall-1010.html')
            .then(async (res) => {
              await sendMediaURL(res.image)
            })
            .catch((e) => {
              reply(e)
            })
          break

        case 'texttiktok':
          txt = args.join(" ")
          if (txt.includes(';')) {
            split = txt.split(';');
            topText = split[0];
            bottomText = split[1];
          } else {
            topText = txt;
            bottomText = '';
          }
          await textpro([`${topText}`, `${bottomText}`], 'https://textpro.me/create-glitch-text-effect-style-tik-tok-983.html')
            .then(async (res) => {
              await sendMediaURL(res.image)
            })
            .catch((e) => {
              reply(e)
            })
          break

        case 'text2love':
          txt = args.join(" ")
          if (txt.includes(';')) {
            split = txt.split(';');
            topText = split[0];
            bottomText = split[1];
          } else {
            topText = txt;
            bottomText = '';
          }
          console.log(topText, bottomText)
          await ephoto360([`${topText}`, `${bottomText}`], 'https://en.ephoto360.com/create-love-balloons-cards-334.html')
            .then(async (res) => {
              console.log(res)
              sendMediaURL(res.image)
            })
            .catch((e) => {
              reply(e)
            })
          break

          // Pake 1 foto
        case 'textkabut':
          if ((isMedia && !mek.message.videoMessage || isQuotedImage)) {
            const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
            const media = await conn.downloadAndSaveMediaMessage(encmedia, "./public/qrreader_img")
            console.log("media downloaded", media)
            await ephoto360img('https://en.ephoto360.com/create-artistic-black-and-white-smoke-photo-effects-716.html', media)
              .then(async (res) => {
                await sendMediaURL(res.image)
              })
              .catch((e) => {
                reply(e)
              })
              .finally(() => {
                fs.unlinkSync(media)
              })
            break
          } else {
            reply(`*Media tidak ditemukan.*\nPerintah ini membutuhkan image untuk diberi efek kabut.`)
          }
          break

        case 'textkucing':
          if ((isMedia && !mek.message.videoMessage || isQuotedImage)) {
            const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
            const media = await conn.downloadAndSaveMediaMessage(encmedia, "./public/qrreader_img")
            console.log("media downloaded", media)
            await ephoto360img('https://en.ephoto360.com/collage-a-cat-with-super-cool-glasses-699.html', media)
              .then(async (res) => {
                await sendMediaURL(res.image)
              })
              .catch((e) => {
                reply(e)
              })
              .finally(() => {
                fs.unlinkSync(media)
              })
            break
          } else {
            reply(`*Media tidak ditemukan.*\nPerintah ini membutuhkan image untuk diberi efek kabut.`)
          }
          break

        case 'textpaper':
          if ((isMedia && !mek.message.videoMessage || isQuotedImage)) {
            const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
            const media = await conn.downloadAndSaveMediaMessage(encmedia, "./public/qrreader_img")
            console.log("media downloaded", media)
            await ephoto360img('https://en.ephoto360.com/create-an-artistic-ripped-paper-effect-669.html', media)
              .then(async (res) => {
                await sendMediaURL(res.image)
              })
              .catch((e) => {
                reply(e)
              })
              .finally(() => {
                fs.unlinkSync(media)
              })
            break
          } else {
            reply(`*Media tidak ditemukan.*\nPerintah ini membutuhkan image untuk diberi efek kabut.`)
          }
          break

        case 'lsse':
          let pw = ["https://meme-api.herokuapp.com/gimme/tits",
            "https://meme-api.herokuapp.com/gimme/BestTits",
            "https://meme-api.herokuapp.com/gimme/boobs",
            "https://meme-api.herokuapp.com/gimme/amazingtits",
            "https://meme-api.herokuapp.com/gimme/TinyTits",
            "https://meme-api.herokuapp.com/gimme/lesbians",
            "https://meme-api.herokuapp.com/gimme/CuteLittleButts",
            "https://meme-api.herokuapp.com/gimme/ass",
            "https://meme-api.herokuapp.com/gimme/pussy",
            "https://meme-api.herokuapp.com/gimme/LegalTeens"
          ]
          let nk = pw[Math.floor(Math.random() * pw.length)]
          await axios.get(nk)
            .then(async ({
              data
            }) => {
              const buffer = await getBuffer(data.url)
              await sendButImage(from, data.title, data.subreddit, buffer, [{
                buttonId: `${prefix}ls`,
                buttonText: {
                  displayText: `💋 Lagi dong`,
                },
                type: 1,
              }])
            })
            .catch((e) => {
              axios.get(nk)
                .then(async ({
                  data
                }) => {
                  const buffer1 = await getBuffer(data.url)
                  sendButImage(from, data.title, data.subreddit, buffer1, [{
                    buttonId: `${prefix}ls`,
                    buttonText: {
                      displayText: `💋 Lagi dong`,
                    },
                    type: 1,
                  }])
                })
                .catch((e) => {
                  reply("error")
                })
            })
          break

        case 'ping':
          reply("pong...")
          break;

        default:
          if (!isGroup) {
            axios.get("https://api.simsimi.net/v2/?text=" + kalimat + "&lc=id")
              .then((res) => reply(res.data.success))
              .catch((e) => console.log(e.message))
          }
          break;
      }
      await conn.updatePresence(from, Presence.paused)

    } catch (e) {
      console.error('Error : %s', e)
    }
  })
}
main()