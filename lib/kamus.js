const axios = require("axios")
const cheerio = require('cheerio')

module.exports.kbbi = async (kata) => {
  return new Promise((resolve, reject) => {
    if (!kata) {
      reject("Kata kosong")
      return
    }

    const q = kata.trim().split(/ +/g)
    axios.get(`https://jagokata.com/arti-kata/${q.join('%20')}.html`)
      .then((resp) => {
        if (resp.status === 200) {
          const data = resp.data;
          const $ = cheerio.load(data);
          let hasil = [], peh, title, jenis, arti = ""
            $('#arti-kata h2').each((a, b) => {
              title = $("#arti-kata h2").eq(a).text().replace(`${a+1} `, '')
              jenis = $("#arti-kata .arti-simbol").eq(a).text()
              if($("#arti-kata .arti-kata-box li").text()){
                $("#arti-kata .arti-kata-box li").each((a, b) => {
                  arti += `${$("#arti-kata .arti-kata-box li").eq(a).text().includes('contoh:') ? $("#arti-kata .arti-kata-box li").eq(a).text().replace('contoh:', '\ncontoh:') : $("#arti-kata .arti-kata-box li").eq(a).text()}\n`
                })
              } else {
                arti = $("#arti-kata .arti-kata-box").eq(a).text().includes('contoh:') ? $("#arti-kata .arti-kata-box").eq(a).text().replace('contoh:', '\ncontoh:').replace('Arti: ', '') : $("#arti-kata .arti-kata-box").eq(a).text().replace('Arti: ', '')
              }

              peh = {
                title: title,
                jenis: jenis,
                arti: arti,
              }
              hasil.push(peh)
            })
            if(hasil.length > 0){
              resolve(hasil)
            } else {
              reject(`Kata ${kata} tidak ditemukan.`)
            }
        } else {
          reject("Kesalahan sambungan..")
        }
      }).catch(err => {
        reject(err.message)
      });

  })
}

module.exports.kbj = async (kata) => {
  return new Promise((resolve, reject) => {
    if (!kata) {
      reject("Kata kosong")
      return
    }
    axios("https://budiarto.id/bausastra/words/search/" + kata, {
      method: "GET"
    }).then(async ({data}) => {
      if(data.result.length >= 1){
        let result = data.result[0]
        let aksara = ""
        if(result.javanese){
          aksara = ` _${result.javanese}_`
        }
        resolve(`*${result.entry}* ${aksara}\n${result.meaning}\n\n_~ ${result.citation}_`)
      }else{
        reject("Kami tidak menemukan apapun.")
      }
    }).catch((e) => reject(e.message))
  })
}