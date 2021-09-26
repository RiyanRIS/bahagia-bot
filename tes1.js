const {
  WAConnection,
  MessageType,
  WA_DEFAULT_EPHEMERAL,
  Mimetype
} = require('@adiwajshing/baileys')

const fs = require("fs")
const request = require('request')

let url = "https://ttdownloader.com/dl.php?v=YTo0OntzOjk6IndhdGVybWFyayI7YjoxO3M6NzoidmlkZW9JZCI7czozMjoiZjVkOWJkNDc0MzUxNzI2NTU1ZWJkYzUxYTUyZjkwMDMiO3M6MzoidWlkIjtzOjMyOiJmMGNjOTg3MmFjOGNlMjc2N2M2Yjk0OWM3ZmViMjMwOCI7czo0OiJ0aW1lIjtpOjE2MzI1NTI4MzQ7fQ=="

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
  };

  sendMediaURL(from, url, "")
  // await new Promise(r => setTimeout(r, 3000)); 
}

a()



