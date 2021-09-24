const axios = require("axios")

const tebakgambar = () => {
  return new Promise((resolve, reject) => {
    const rndm = Math.floor(Math.random() * 6) + 1
    axios.get("https://raw.githubusercontent.com/tulungagungcode/bot_source/master/tebakgambar/"+ rndm +".json")
      .then(({data}) => {
        const rndmm = Math.floor(Math.random() * data.length) + 1
        resolve(data[rndmm])
      })
      .catch((e) => {
        console.log("tebakgambar Error: ", e)
        reject(e.message)
      })
  })
}

module.exports = {
  tebakgambar
}