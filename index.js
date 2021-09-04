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
const YTDL = require("ytdl-core")
const axios = require('axios')
const http = require('https') // or 'https' for https:// URLs
const request = require('request')
const cheerio = require('cheerio')
const log = console.debug
const exec = require("child_process").exec
const qr = require('qr-image')
const Jimp = require("jimp")
const qrCode = require('qrcode-reader')
const FormData = require('form-data')
const qs = require('qs')

// LOAD LIBRARY
const { ytmp3, ytmp4 } = require("./lib/ytdl")
const { twdl } = require("./lib/twdl")
const { igdl } = require("./lib/igdl")

// LOAD SOURCES
const pesan = require('./src/pesan')

// BASIC SETTINGS
prefix = '/';

// LOAD CUSTOM FUNCTIONS
const getGroupAdmins = (participants) => {
  admins = []
  for (let i of participants) {
    i.isAdmin ? admins.push(i.jid) : ''
  }
  return admins
}
const helpBiasa = (prefix) => {
  return `
  🎀 *Bahagia-Bot* 🎀

*${prefix}sticker*
    _Membuat Sticker dari foto/video_

*${prefix}ytmp3 <Link-YT>*
    _Download lagu dari YouTube_

*${prefix}ytmp4 <Link-YT>*
    _Download video dari YouTube_

*${prefix}yts <Link-YT>*
    _Download lagu dari YouTube(HD Audio)_

*${prefix}yt <Link-YT>*
    _Download video dari YouTube(HD Video)_

*${prefix}igdl <Link-IG>*
    _Download video dari Instagram_
    _jika menggunakan igdl tidak berhasil, gunakan perintah *igdl1*_

*${prefix}twdl <Link-TW>*
    _Twitter Video Downloader_
    _jika menggunakan twdl tidak berhasil, gunakan perintah *twdl1*_

*${prefix}ttdl <Link-Tiktok>*
    _Tiktok Video Downloader_
    _jika menggunakan ttdl tidak berhasil, gunakan perintah *ttdl1*_

*${prefix}ocr*
    _Mengubah gambar menjadi teks_
    _Kirim gambar dan beri ${prefix}ocr_

*${prefix}carbon <Teks>*
    _Mengubah teks menjadi gambar keren_

*${prefix}qr <Teks>*
    _Membuat QR kode dari text tertentu_

*${prefix}qrr*
    _Membaca hasil QR kode dari gambar_

*${prefix}katacinta*
    _Kata cinta random_

*${prefix}katamotivasi*
    _Kata motivasi random_

*${prefix}faktaunik*
    _Fakta unik random_

🛡 _Semua data yang kamu kirim, nggak kami simpen kok, dijamin aman deh_\n
🛠 _Request fitur atau ada masalah pada bot ini, hubungi Developer_`
}
const adminHelp = (prefix) => {
  return `
  🎀 *Bahagia-Bot* 🎀

*${prefix}add <nomor hp>*
    _Tambah member kedalam group!_

*${prefix}kick <@mention-user>*
    _Kick out member!_
    _Bisa juga menggunakan ${prefix}remove, ${prefix}ban_

*${prefix}promote <@mention-user>*
    _Mempromosikan user menjadi admin group!_

*${prefix}demote <@mention-user>*
    _Menurunkan user dari admin group!_

*${prefix}rename <nama-baru>*
    _Mengubah nama group!_

*${prefix}chat <on/off>*
    _Enable/disable group_
    _/chat on - semua bisa ngirim pesan!_
    _/chat off - hanya admin yang ngirim pesan!_

*${prefix}link*
    _Memunculkan link undangan group!_
    _Perintah lain: ${prefix}getlink, ${prefix}grouplink_

*${prefix}sticker*
    _Membuat stiker!_
    *Parameter:*
        _crop_ - Memperkecil ukuran stiker!
        _author_ - Memberi metadata author pada stiker!
        _pack_ - Memberi metadata pack pada stiker!
        _nometadata_ - Menghapus semua metadata pada stiker!
    *Examples:*
        _${prefix}sticker pack bahagia-bot author riyanris_
        _${prefix}sticker crop_
        _${prefix}sticker nometadata_

*${prefix}removebot*
    _Mengeluarkan bot dari group!_`
}
const getRandom = (ext) => {
  return `${Math.floor(Math.random() * 1000000)}${ext}`
}
const randomString = (length) => {
  let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyzsadw'
  let str = '';
  lengt = length || 9
  for (let i = 0; i < length; i++) {
    str += chars[Math.floor(Math.random() * 65)];
  }
  return str
}
const shortlink = async (url) => {
  const getdt = await axios.get(`https://tinyurl.com/api-create.php?url=${url}`)
  return getdt.data
}
const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
const getBuffer = async (url, opts) => {
  try {
    const reqdata = await axios({
      method: "get",
      url,
      headers: {
        'DNT': 1,
        'Upgrade-Insecure-Requests': 1,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36'
      },
      ...opts,
      responseType: 'arraybuffer'
    });
    return reqdata.data
  } catch (e) {
    throw e
  }
}

// MAIN FUNCTION
async function main() {

  const conn = new WAConnection()
  conn.logger.level = 'warn'
  const dotenv = require('dotenv')
  dotenv.config()
  const {
    SESSION_WA,
    URL
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
    timeoutMs: 30 * 1000
  })

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
      mek = JSON.parse(JSON.stringify(mek)).messages[0]
      if (!mek.message) return
      if (mek.key && mek.key.remoteJid == 'status@broadcast') return
      if (mek.key.fromMe) return
      const content = JSON.stringify(mek.message)
      global.prefix
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
      body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : ''
      const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
      const args = body.trim().split(/ +/).slice(1)
      const isCmd = body.startsWith(prefix)

      const botNumber = conn.user.jid
      const isGroup = from.endsWith('@g.us')
      const sender = isGroup ? mek.participant : mek.key.remoteJid
      const groupMetadata = isGroup ? await conn.groupMetadata(from) : ''
      const groupName = isGroup ? groupMetadata.subject : ''
      const groupMembers = isGroup ? groupMetadata.participants : ''
      const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
      const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
      const isGroupAdmins = groupAdmins.includes(sender) || false

      const reply = (teks) => {
        conn.sendMessage(from, teks, text, {
          quoted: mek
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

      const sendMed = async (res, jenis) => {
        if(res.status){
          console.log("sending")
          const stats = fs.statSync(res.data)
          if(stats.size < 95999999){ // batas max upload whatsapp 99 mb
            const media = fs.readFileSync(res.data)
            await conn.sendMessage(from, media, jenis)
              .then((res) => {
                console.log("sent")
              })
              .catch(async (e) => {
                console.error(e)
                reply(`Error waktu kirim media ke kamu, namun kami masih memiliki linknya: \n_${await shortlink(res.link)}_\n\nSilahkan download sendiri ya.`)
              })
          } else {
            console.log("too large")
            reply(`Ukuran file terlalu besar silahkan download melalui link berikut: _${await shortlink(res.link)}_`)
          }
        } else {
          console.log("error")
          reply(res.msg)
        }
      }

      const isMedia = (type === 'imageMessage' || type === 'videoMessage')
      const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
      const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
      const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
      if (isCmd && isGroup) {
        console.log('[COMMAND]', command, '[FROM]', sender.split('@')[0], '[IN]', groupName)
      } else if (isCmd) {
        console.log('[COMMAND]', command, '[FROM]', sender.split('@')[0])
      }

      /////////////// COMMANDS \\\\\\\\\\\\\\\

      switch (command) {

        /////////////// GROUP COMMAND \\\\\\\\\\\\\\\

        case 'help':
        case 'acmd':
          if (!isGroup) {
            reply(helpBiasa(prefix))
          }else{
            costum(adminHelp(prefix), text);
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
          break;

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
              if (args[i].includes('author') == true) {
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
          if (args.includes('author') == true) {
            authorNameDataCollection = false;
            for (let i = 0; i < args.length; i++) {
              // Enables data collection when keyword found in index!
              if (args[i].includes('author') == true) {
                authorNameDataCollection = true;
              }
              // If data collection is enabled and args length is more then one it will start appending!
              if (authorNameDataCollection == true) {
                authorName = authorName + args[i] + ' '
              }
              // Check if variable contain unnecessary startup word!
              if (authorName.startsWith('author ')) {
                authorName = `${authorName.split('author ')[1]}`
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

        // https://github.com/abaykan
        // http://sosmeeed.herokuapp.com
        case 'tw':
        case 'twd':
        case 'twdl':
          const res_twdl = await twdl(args[0])
          await sendMed(res_twdl, video)
          break
        
        // http://sosmeeed.herokuapp.com
        case 'tiktok':
        case 'ttdl':
          let url_tiktok = args[0]
          const tiktokk = async (url_tiktok) => {
            console.log("tiktok processing", url_tiktok)
            const url_base = "http://sosmeeed.herokuapp.com:80/api/tiktok/video"
            axios.post(url_base, {
              url: url_tiktok.split("?")[0]
            })
              .then(async (res) => {
                if(res.data.success){
                  console.log("downloading")
                  const path = "./public/tt_video.mp4"
                  const link_download = res.data.data.video
                  const file = fs.createWriteStream(path)
                  const request = http.get(link_download, function (response) {
                    response.pipe(file);
                  })
          
                  file.on("finish", async () => {
                    console.log("sending")
                    const videonya = fs.readFileSync(path)
                    await conn.sendMessage(from, videonya, video)
                      .then(() => {
                        console.log("sent")
                      })
                      .catch(async (e) => {
                        console.error(e)
                        reply(`Error waktu kirim videonya ke kamu, namun kami masih memiliki linknya: \n_${await shortlink(link_download)}_\n\nSilahkan download sendiri ya.`)
                      })
                      .finally(() => {
                        fs.unlinkSync(path)
                      })
                  })

                  file.on("error", (e) => {
                    console.error(e)
                    reply("maaf terjadi kesalahan saat menunduh media.")
                  })

                  request.on("error", (e) => {
                    console.error(e)
                    reply("maaf terjadi kesalahaan saat mengunduh media.")
                  })
                }else{
                  reply(`Link yang anda berikan tidak valid atau tidak mengandung video atau gunakan perintah _${prefix}ttdl1_`)
                }
              })
              .catch((e) => {
                console.log("error:", e)
                reply(`Maaf, terjadi kesalahan pada server, ulangi beberapa saat lagi atau gunakan perintah _${prefix}ttdl1_`)
              })
            }
            
            tiktokk(url_tiktok)
            break;
          
        // https://recoders-area.caliph.repl.co/api
        case 'ttdl1':
        case 'tiktok1':
          const tt_downloader = async (url) => {
            console.log("ttdl1 process", url)

            axios.get('https://recoders-area.caliph.repl.co/api/tiktod/?url=' + url)
              .then((res) => {
                if(res.data.status == 200){
                  console.log("downloading")
                  const link_download = res.data.result.nowatermark
                  if(link_download){
                    const path = "./public/tt_video.mp4"
                    const file = fs.createWriteStream(path)
                    const request = http.get(link_download, function (response) {
                      response.pipe(file);
                    })
            
                    file.on("finish", async () => {
                      console.log("sending")
                      const videonya = fs.readFileSync(path)
                      await conn.sendMessage(from, videonya, video)
                        .then(() => {
                          console.log("sent")
                        })
                        .catch(async (e) => {
                          console.error("err1", e)
                          await conn.sendMessage(from, videonya, video, {thumbnail: null}).then(() => {
                            console.log("sent")
                          })
                          .catch(async (e) => {
                            console.error(e)
                            reply(`Error waktu kirim videonya ke kamu, namun kami masih memiliki linknya: \n_${await shortlink(link_download)}_\n\nSilahkan download sendiri ya.`)
                          })
                        })
                        .finally(() => {
                          fs.unlinkSync(path)
                        })
                    })
  
                    file.on("error", (e) => {
                      console.error(e)
                      reply("maaf terjadi kesalahan saat menunduh media.")
                    })
  
                    request.on("error", (e) => {
                      console.error(e)
                      reply("maaf terjadi kesalahaan saat mengunduh media.")
                    })
                  }else{
                    reply("url yang kamu berikan tidak valid atau tidak mengandung video.")
                  }
                } else {
                  console.error("Terjadi kesalahan pada server api")
                  reply("Kami tidak menemukan apapun.")
                }
              })
              .catch((e) => {
                console.error(e)
                reply("terjadi kesalahan saat menghubungi server, ulangi beberapa saat lagi.")
              })
          }

          tt_downloader(args[0])
          break
        
        case 'yts':
        case 'ytmp3':
          const res_ytmp3 = await ytmp3(args[0])
          await sendMed(res_ytmp3, audio)
          break
        
        case 'yt':
        case 'ytmp4':
          const res_ytmp4 = await ytmp4(args[0])
          await sendMed(res_ytmp4, video)
          break
  
        // https://keeppost.com/
        // https://github.com/Ayesh/InstagramDownload
        case 'igdl':
        case 'igdown':
        case 'igdownloader':
          const res_igdl = await igdl(args[0])
          await sendMed(res_igdl, video)
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
        case 'cb':
        case 'carbon':
          let carbon_txt = args.join(' ')
          
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
                await conn.sendMessage(from, Buffer.from(res.data), image, { caption: `Hasil untuk 👇\n` + "```" + carbon_txt + "```" })
                  .then(() => {
                    console.log("sent")
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
          cb(carbon_txt)
          break

        case 'qr':
        case 'qr-code':
          const qr_txt = args.join(" ")
          const qr_fun = async (qr_txt) => {
            console.log("memproses qr: " + qr_txt)
            const hasil = qr.imageSync(qr_txt, { ec_level: 'H', type: 'png' })
            await conn.sendMessage(from, hasil, image, { caption: `QR code untuk 👇\n` + "```" + qr_txt + "```" })
              .then(() => {
                console.log("terkirim")
              })
              .catch((e) => {
                console.error(e)
                reply(`*⛔ Maaf*\n\n` + "```Terjadi kesalahann pada saat memproses data.```")
              })
          }
          qr_fun(qr_txt)
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
            Jimp.read(buffer, function(err, image) {
              if (err) {
                console.error(err)
                reply("maaf terjadi kesalahan saat membaca data.")
                return
              }
              let qrcode = new qrCode()
              qrcode.callback = function(err, value) {
                if (err) {
                  console.error(err)
                  reply("Kami tidak menemukan apapun. Silahkan ulangi dengan gambar yang jelas dan usahakan barcode tidak terpotong")
                  return
                }
                try {
                  reply(value.result)
                  console.log("sent")
                } catch(e) {
                  console.log(value)
                  reply("maaf, terjadi kesalahan saat membaca data.")
                }
              }
              qrcode.decode(image.bitmap)
            })
          }else{
            reply("Kamu lupa melampirkan gambar yang akan di scan.")
          }
          break
        
          // THANKS TO JAGOKATA.COM
        case 'bucin':
        case 'katacinta':
        case 'quotescinta':
          const katacinta = async () => {
            console.log("katacinta processing")
            const ran1 = Math.floor(Math.random() * 100)
            const ran2 = Math.floor(Math.random() * 10)
            request.get({
              headers: { 'user-agent' : 'Mozilla/5.0 (Linux; Android 8.1.0; vivo 1820) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Mobile Safari/537.36'
              },
              url: 'https://jagokata.com/kata-bijak/kata-cinta.html?page=' + ran1,
            }, function(error, response, body){
              if(!error){
                const $ = cheerio.load(body);
                let author = $('a[class="auteurfbnaam"]').contents()[ran2]['data']
                let kata = $('q[class="fbquote"]').contents()[ran2]['data']
                reply(`_${kata}_\n\n~*${author}*`)
              } else {
                console.error("error", error)
                reply("maaf terjadi kesalahan pada sistem kami.")
              }
            })
          }
          
          katacinta()
          break
          
        case 'motivasi':
        case 'katamotivasi':
        case 'katabijak':
          const katamotivasi = async () => {
            console.log("katamotivasi processing")
            const ran1 = Math.floor(Math.random() * 10)
            const ran2 = Math.floor(Math.random() * 10)
            request.get({
              headers: { 'user-agent' : 'Mozilla/5.0 (Linux; Android 8.1.0; vivo 1820) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Mobile Safari/537.36'
              },
              url: 'https://jagokata.com/kata-bijak/popular.html?page=' + ran1,
            }, function(error, response, body){
              if(!error){
                let $ = cheerio.load(body);
                let author = $('a[class="auteurfbnaam"]').contents()[ran2]['data']
                let kata = $('q[class="fbquote"]').contents()[ran2]['data']
                reply(`_${kata}_\n\n~*${author}*`)
              }else{
                console.error('error: ', error)
                reply('maaf, terjadi kesalahan pada sistem kami.')
              }
            })  
          }
          katamotivasi()
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
                } catch(e) {
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
        

        
        default:
          break;
      }
    } catch (e) {
      console.error('Error : %s', e)
    }
  })
}
main()