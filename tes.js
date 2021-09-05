const axios = require("axios")
const cheerio = require("cheerio")
const fs = require('fs')

const katacinta = async () => {
  const reandomm = Math.floor(Math.random() * 365)
  const reandommm = Math.floor(Math.random() * 10)
  axios.get(`https://raw.githubusercontent.com/tulungagungcode/bot_source/master/katacinta/${reandomm}.json`)
    .then(async (res) => {
      console.log(res.data[reandommm])
    })
}

katacinta()