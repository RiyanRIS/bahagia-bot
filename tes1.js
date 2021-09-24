const {
  WAConnection,
  MessageType,
  WA_DEFAULT_EPHEMERAL
} = require('@adiwajshing/baileys')
const axios = require("axios")

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

  // turn on disappearing messages
  await conn.toggleDisappearingMessages(
    from, 
    5 // this is 1 week in seconds -- how long you want messages to appear for
  ) 
  // will automatically send as a disappearing message
  await conn.sendMessage(from, 'Hello poof!', MessageType.text)
  // turn off disappearing messages
  await conn.toggleDisappearingMessages(from, 0)



}
a()



