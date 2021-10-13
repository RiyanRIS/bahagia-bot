const axios = require("axios")

module.exports.tebakgambar = () => {
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

module.exports.tebakgambar2 = () => {
  return new Promise((resolve, reject) => {
    axios.get("https://raw.githubusercontent.com/tulungagungcode/bot_source/master/tebakgambar2/tebakgambar.json")
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

module.exports.tebakpribahasa = () => {
  return new Promise((resolve, reject) => {
      axios.get("https://raw.githubusercontent.com/tulungagungcode/bot_source/master/tebakpribahasa/pribahasa.json")
      .then(({data}) => {
        try {
          const rndm = Math.floor(Math.random() * data.length)
          const data_acak = data[rndm]

          const pribahasa_soal = data_acak.pribahasa.split(" ")
          const rndm1 = Math.floor(Math.random() * pribahasa_soal.length)
          const jawaban = pribahasa_soal[rndm1]
          const soal = data_acak.pribahasa.replace(jawaban, "....")
          
          const res = {
            soal: soal,
            jawaban: jawaban.toLowerCase(),
            arti: data_acak.arti
          }
          resolve(res)
        } catch(e) {
          reject("Maaf, terjadi kesalahan saat mengolah data.")
        }
      })
      .catch((e) => reject(e.message))
  })
}

module.exports.pengumum = () => {
  return new Promise((resolve, reject) => {
    axios.get("https://raw.githubusercontent.com/tulungagungcode/bot_source/master/pengetahuanumum/umum1.json")
      .then(({data}) => {
        const rndmm = Math.floor(Math.random() * data.length) + 1
        resolve(data[rndmm])
      })
      .catch((e) => {
        console.log("pengumum Error: ", e)
        reject(e.message)
      })
  })
}

module.exports.susun = () => {
  return new Promise((resolve, reject) => {
    axios.get("https://raw.githubusercontent.com/tulungagungcode/bot_source/master/susunkata/datasatu.json")
      .then(({data}) => {
        const rndmm = Math.floor(Math.random() * data.length) + 1
        resolve(data[rndmm])
      })
      .catch((e) => {
        console.log("pengumum Error: ", e)
        reject(e.message)
      })
  })
}

module.exports.tebka = () => {
  return new Promise((resolve, reject) => {
    axios.get("https://raw.githubusercontent.com/tulungagungcode/bot_source/master/tebakkata/satu.json")
      .then(({data}) => {
        const rndmm = Math.floor(Math.random() * data.length) + 1
        resolve(data[rndmm])
      })
      .catch((e) => {
        console.log("pengumum Error: ", e)
        reject(e.message)
      })
  })
}

module.exports.siapakahaku = () => {
  return new Promise((resolve, reject) => {
    axios.get("https://raw.githubusercontent.com/tulungagungcode/bot_source/master/siapakahaku/kesatu.json")
      .then(({data}) => {
        const rndmm = Math.floor(Math.random() * data.length) + 1
        resolve(data[rndmm])
      })
      .catch((e) => {
        console.log("pengumum Error: ", e)
        reject(e.message)
      })
  })
}

module.exports.caklontong = () => {
  return new Promise((resolve, reject) => {
    axios.get("https://raw.githubusercontent.com/tulungagungcode/bot_source/master/kuiscaklontong/satu.json")
      .then(({data}) => {
        const rndmm = Math.floor(Math.random() * data.length) + 1
        resolve(data[rndmm])
      })
      .catch((e) => {
        console.log("pengumum Error: ", e)
        reject(e.message)
      })
  })
}
