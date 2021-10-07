const {
  WAConnection,
  MessageType,
  WA_DEFAULT_EPHEMERAL,
  Mimetype
} = require('@adiwajshing/baileys')

const fs = require("fs")
const request = require('request')
const {ephoto360} = require('./lib/ephoto360')
const {twdl} = require('./helpers/downloader')
const {getBuffer, formatBytes} = require('./helpers/function')

const a = async () => {
  const from = "15108986398@c.us"
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
    timeoutMs: 30 * 1000
  })

  const sendMediaURL = async (to, url, text = "") => {
    
    const fn = Date.now() / 1000;
    const filename = fn.toString();
    let mime = "";
    var download = function (uri, filename, callback) {
      request.head(uri, function (err, res, body) {
        mime = res.headers["content-type"];
        request(uri)
          .pipe(fs.createWriteStream(filename))
          .on("close", callback);
      });
    };
    download(url, filename, async function () {
      console.log("done");
      let media = fs.readFileSync(filename);
      let type = mime.split("/")[0] + "Message";
      if (mime === "image/gif") {
        type = MessageType.video;
        mime = Mimetype.gif;
      }
      if (mime.split("/")[0] === "audio") {
        mime = Mimetype.mp4Audio;
      }
      conn.sendMessage(to, media, type, {
        // quoted: mek,
        mimetype: mime,
        caption: text,
      });

      fs.unlinkSync(filename);
    });
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
    try {
      mediaa = await conn.prepareMessage(from, kma, MessageType.image);
    } catch(e) {
      console.log("error1")
      console.log(e)
    }
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
    );
  }

  const text = "Riyan Risky W S"
  const prefix = "?"

  const tw = "https://twitter.com/chenlebase/status/1445014874413617158?t=kWiUFcYHyoLGWwsLgmffPQ&s=19"

  await twdl(tw).then(async (res) => {
    let tamnel = await getBuffer(res.thumbnail)
    await sendButImage(
      from,
      `📜 *Title*: ${res.desc}\n\nSilahkan pilih salah satu format yg ingin didownload`, "Bahagia-Bot",
      tamnel, [{
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

  // await new Promise(r => setTimeout(r, 3000)); 
}

a()



