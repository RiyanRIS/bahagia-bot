let gtts = require('node-gtts')
const tts = require('google-translate-tts')
const fs = require("fs")

module.exports.gtts = async (text, lang = "id") => {
  return new Promise((resolve, reject) => {
    try {
      let tts = gtts(lang)
      let filePath = "./public/gtts.wav"
      tts.save(filePath, text, () => {
          resolve(filePath)
      })
    } catch (e) { reject(e) }
  })
}

module.exports.tts = async (text, lang = "id-ID") => {
  return new Promise(async (resolve, reject) => {
    const buffer = await tts.synthesize({
      text: text,
      voice: lang,
      slow: true // optional
    }).catch((e) => reject(e.message))

    fs.writeFileSync('./public/tts.mp3', buffer)
    resolve("./public/tts.mp3")
  })
}