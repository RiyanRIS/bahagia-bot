let gtts = require('node-gtts')

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
