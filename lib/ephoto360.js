const axios = require("axios")

module.exports.ephoto360 = (query, html) => {
  return new Promise(async (resolve, reject) => {

    var data = {
      image: '',
      status: false
    }
    var encoded_q = encodeURIComponent(query)
    var sync_query = 'https://api.codebazan.ir/ephoto/writeText?output=json&effect=' + html + '&text=' + encoded_q

    // Melakukan looping get data dari api, karna sering ndak dapet datanya
    // Padahal datanya bener, makanya di coba berkali kali..
    await axios.get(sync_query).then(async (res) => { // Percobaan pertama
      data.image = res.data.image_url
      data.status = res.data.success
      if (!data.status) {
        await axios.get(sync_query).then(async (res1) => { // Percobaan kedua
          data.image = res1.data.image_url
          data.status = res1.data.success
          if (!data.status) {
            await axios.get(sync_query).then(async (res1) => { // Percobaan ketiga
              data.image = res1.data.image_url
              data.status = res1.data.success
              if (!data.status) {
                await axios.get(sync_query).then(async (res1) => { // Percobaan keempat
                  data.image = res1.data.image_url
                  data.status = res1.data.success
                  if (!data.status) {
                    await axios.get(sync_query).then(async (res1) => { // Percobaan kelima
                      data.image = res1.data.image_url
                      data.status = res1.data.success
                      if (!data.status) { // Nyerah deh
                        reject("Maaf, terjadi kesalahan pada server.")
                      } else {
                        resolve(data)
                      }
                    })
                    .catch((e) => {
                      reject(e.message)
                    })
                  } else {
                    resolve(data)
                  }
                })
                .catch((e) => {
                  reject(e.message)
                })
              } else {
                resolve(data)
              }
            })
            .catch((e) => {
              reject(e.message)
            })
          } else {
            resolve(data)
          }
        })
        .catch((e) => {
          reject(e.message)
        })
      } else {
        resolve(data)
      }
    })
    .catch((e) => {
      reject(e.message)
    })
  })
}