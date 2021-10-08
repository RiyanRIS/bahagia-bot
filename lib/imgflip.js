const axios = require("axios")
const FormData = require('form-data')

// Login ke https://imgflip.com/
const auth = {
  username: 'ronnyacacio',
  password: 'ronny1324'
}

module.exports.cmm = (text) => {
  return new Promise(async (resolve, reject) => {
    if(text == ""){
      reject("Perintah ini memerlukan minimal satu kata. \n\nSemisal: */memechangemymind wanita adalah objek paling rumit setelah otak manusia*")
    }

    let data = new FormData()
    data.append('template_id', '129242436')
    data.append('username', auth.username)
    data.append('password', auth.password)
    data.append('boxes[0][text]', text)

    await api(data)
      .then((res) => resolve(res))
      .catch((e) => reject(e))
  })
}

module.exports.skeleton = (text) => {
  return new Promise(async (resolve, reject) => {
    if(text == ""){
      reject("Perintah ini memerlukan minimal satu kata. \n\nSemisal: */memeskeleton menunggu ibuk selesai ngobrol saat belanja*")
    }

    let data = new FormData()
    data.append('template_id', '4087833')
    data.append('username', auth.username)
    data.append('password', auth.password)
    data.append('boxes[0][text]', "")
    data.append('boxes[2][text]', text)

    await api(data)
      .then((res) => resolve(res))
      .catch((e) => reject(e))
  })
}

module.exports.drake = (text) => {
  return new Promise(async (resolve, reject) => {
    if(text == ""){
      reject("Perintah ini memerlukan teks yang akan diolah. \n\nSemisal: */memedrake Matematika;Olahraga*")
    }
    let a, b
    if (text.includes(';')) {
      split = text.split(';');
      a = (split[0] ? split[0] : "")
      b = (split[1] ? split[1] : "")
    } else {
      reject("Perintah ini memerlukan teks yang mengandung simbol pemisah berupa *;*. \n\nSemisal: */memedrake Matematika;Olahraga*")
    }
    
    let data = new FormData()
    data.append('template_id', '181913649')
    data.append('username', auth.username)
    data.append('password', auth.password)
    data.append('boxes[0][text]', a)
    data.append('boxes[2][text]', b)

    await api(data)
      .then((res) => resolve(res))
      .catch((e) => reject(e))
  })
}

module.exports.twobutton = (text) => {
  return new Promise(async (resolve, reject) => {
    if(text == ""){
      reject("Perintah ini memerlukan teks yang akan diolah. \n\nSemisal: */memetwobutton Miskin;Jelek*")
    }
    let a, b
    if (text.includes(';')) {
      split = text.split(';');
      a = (split[0] ? split[0] : "")
      b = (split[1] ? split[1] : "")
    } else {
      reject("Perintah ini memerlukan teks yang mengandung simbol pemisah berupa *;*. \n\nSemisal: */memetwobutton Miskin;Jelek")
    }

    let data = new FormData()
    data.append('template_id', '87743020')
    data.append('username', auth.username)
    data.append('password', auth.password)
    data.append('boxes[0][text]', a)
    data.append('boxes[2][text]', b)

    await api(data)
      .then((res) => resolve(res))
      .catch((e) => reject(e))
  })
}

module.exports.distrack = (text) => {
  return new Promise(async (resolve, reject) => {
    if(text == ""){
      reject("Perintah ini memerlukan teks yang akan diolah. \n\nSemisal: */memedistrack Baik, Pengertian, Cantik;Aku;Kaya Raya*")
    }
    let a, b, c
    if (text.includes(';')) {
      split = text.split(';')
      a = (split[0] ? split[0] : "")
      b = (split[1] ? split[1] : "")
      c = (split[2] ? split[2] : "")
    } else {
      reject("Perintah ini memerlukan teks yang mengandung simbol pemisah berupa *;* \n\nSemisal: */memedistrack Baik, Pengertian, Cantik;Aku;Kaya Raya*")
    }

    let data = new FormData()
    data.append('template_id', '112126428')
    data.append('username', auth.username)
    data.append('password', auth.password)
    data.append('boxes[0][text]', a)
    data.append('boxes[2][text]', b)
    data.append('boxes[3][text]', c)

    await api(data)
      .then((res) => resolve(res))
      .catch((e) => reject(e))
  })
}

module.exports.sadpablo = (text) => {
  return new Promise(async (resolve, reject) => {
    if(text == ""){
      reject("Perintah ini memerlukan teks yang akan diolah. \n\nSemisal: */memesadpablo Ini kata pertama;Ini kedua;dan ini ketiga*")
    }
    let a, b, c
    if (text.includes(';')) {
      split = text.split(';')
      a = (split[0] ? split[0] : "")
      b = (split[1] ? split[1] : "")
      c = (split[2] ? split[2] : "")
    } else {
      reject("Perintah ini memerlukan teks yang mengandung simbol pemisah berupa *;* \n\nSemisal: */memesadpablo Ini kata pertama;Ini kedua;dan ini ketiga*")
    }

    let data = new FormData()
    data.append('template_id', '80707627')
    data.append('username', auth.username)
    data.append('password', auth.password)
    data.append('boxes[0][text]', a)
    data.append('boxes[2][text]', b)
    data.append('boxes[3][text]', c)

    await api(data)
      .then((res) => resolve(res))
      .catch((e) => reject(e))
  })
}

module.exports.baloon = (text) => {
  return new Promise(async (resolve, reject) => {
    if(text == ""){
      reject("Perintah ini memerlukan teks yang akan diolah. \n\nSemisal: */memebaloon Kamu;Tidur Siang;Belum Mandi*")
    }
    let a, b, c, d, e
    if (text.includes(';')) {
      split = text.split(';')
      a = (split[0] ? split[0] : "")
      b = (split[1] ? split[1] : "")
      c = (split[2] ? split[2] : "")
      d = (split[3] ? split[3] : "")
      e = (split[4] ? split[4] : "")
    } else {
      reject("Perintah ini memerlukan teks yang mengandung simbol pemisah berupa *;* \n\nSemisal: */memebaloon Kamu;Tidur Siang;Belum Mandi*")
    }

    let data = new FormData()
    data.append('template_id', '131087935')
    data.append('username', auth.username)
    data.append('password', auth.password)
    data.append('boxes[0][text]', a)
    data.append('boxes[2][text]', b)
    data.append('boxes[3][text]', c)
    data.append('boxes[4][text]', d)
    data.append('boxes[5][text]', e)

    await api(data)
      .then((res) => resolve(res))
      .catch((e) => reject(e))
  })
}

module.exports.slapping = (text) => {
  return new Promise(async (resolve, reject) => {
    if(text == ""){
      reject("Perintah ini memerlukan teks yang akan diolah. \n\nSemisal: */memeslapping Aku sayang ka...;Gua Kagak*")
    }
    let a, b, c, d, e
    if (text.includes(';')) {
      split = text.split(';')
      a = (split[0] ? split[0] : "")
      b = (split[1] ? split[1] : "")
    } else {
      reject("Perintah ini memerlukan teks yang mengandung simbol pemisah berupa *;* \n\nSemisal: */memeslapping Aku sayang ka...;Gua Kagak*")
    }

    let data = new FormData()
    data.append('template_id', '438680')
    data.append('username', auth.username)
    data.append('password', auth.password)
    data.append('boxes[0][text]', a)
    data.append('boxes[2][text]', b)

    await api(data)
      .then((res) => resolve(res))
      .catch((e) => reject(e))
  })
}

const api = (data) => {
  return new Promise(async (resolve, reject) => {
    let config = {
      method: 'post',
      url: 'https://api.imgflip.com/caption_image',
      headers: { 
        ...data.getHeaders()
      },
      data : data
    }
  
    await axios(config)
      .then(({data}) => {
        if(data.success){
          resolve(data.data.url)
        } else {
          reject("error bung..")
        }
      })
      .catch((e) => reject(e.message))
  
  })  
}