const axios = require("axios")

let pw = ["https://meme-api.herokuapp.com/gimme/tits",
					"https://meme-api.herokuapp.com/gimme/BestTits",
					"https://meme-api.herokuapp.com/gimme/boobs",
					"https://meme-api.herokuapp.com/gimme/amazingtits",
					"https://meme-api.herokuapp.com/gimme/TinyTits",
          "https://meme-api.herokuapp.com/gimme/lesbians",
          "https://meme-api.herokuapp.com/gimme/CuteLittleButts",
					"https://meme-api.herokuapp.com/gimme/ass",
          "https://meme-api.herokuapp.com/gimme/pussy",
					"https://meme-api.herokuapp.com/gimme/LegalTeens"]
let nk = pw[Math.floor(Math.random() * pw.length)]
console.log(nk)
axios.get(nk)
  .then(async ({data}) => {
    console.log(data)
  })