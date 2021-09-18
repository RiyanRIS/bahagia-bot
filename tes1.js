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
for (let index = 0; index < 10; index++) {
  let nk = pw[Math.floor(Math.random() * pw.length)]
  axios.get(nk)
    .then(async ({data}) => {
      console.log(data)
    })
}
