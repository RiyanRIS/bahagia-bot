const axios = require('axios')

const faktaunik = async () => {
  const url = "https://raw.githubusercontent.com/pajaar/grabbed-results/master/pajaar-2020-fakta-unik.txt"
  axios.get(url)
    .then(async (res) => {
      let faktas = res.data.split("\n")
      let faktarandom = faktas[Math.floor(Math.random() * faktas.length)]
      console.log(faktarandom)
    })
    .catch((e) => {
      console.log("error:", e)
    })
}

faktaunik()