const axios = require("axios")

module.exports.sms_oyo = async (no) => {
  return new Promise((resolve, reject) => {
    let hd = {
      "Host": "identity-gateway.oyorooms.com",
      "consumer_host": "https://www.oyorooms.com",
      "accept-language": "id",
      "access_token": "SFI4TER1WVRTakRUenYtalpLb0w6VnhrNGVLUVlBTE5TcUFVZFpBSnc=",
      "User-Agent": "Mozilla/5.0 (Linux; Android 10; SM-A107F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Mobile Safari/537.36",
      "Content-Type": "application/json",
      "accept": "*/*",
      "origin": "https://www.oyorooms.com",
      "referer": "https://www.oyorooms.com/login",
      "Accept-Encoding": "gzip, deflate, br",
    }
    
    let config = {"phone":no,"country_code":"+62","country_iso_code":"ID","nod":"4","send_otp":"true","devise_role":"Consumer_Guest"}
    
    axios("https://identity-gateway.oyorooms.com/identity/api/v1/otp/generate_by_phone?locale=id", {
        method: 'POST',
        data: JSON.stringify(config),
        headers: hd
    })
      .then(async ({data}) => {
        if(data.otp_sent){
          resolve("success")
        }else{
          reject("error")
        }
      })
      .catch((e) => {
        reject("error: ", e.message)
      })
  })
}

// 30 sep, ndak berhasil perlu update
module.exports.sms_mapclub = async (no) => {
  return new Promise((resolve, reject) => {
    let hd = {
      "Connection": "keep-alive",
      "user-agent": "Mozilla/5.0 (Linux; Android 10; SM-A107F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Mobile Safari/537.36",
      }
    
    let config = {'phone':'62'+no}
    
    axios("https://cmsapi.mapclub.com/api/signup-otp", {
        method: 'POST',
        data: config,
        headers: hd
    })
      .then(async ({data}) => {
        if(data.status == 'ok'){
          resolve
        }else{
          reject
        }
      })
      .catch((e) => {
        console.log("error: ", e.message)
      })
  })
}

module.exports.sms_icq = async (no) => {
  return new Promise((resolve, reject) => {
    let hd = {
      "accept": "*/*",
      "accept-language": "en-US,en;q=0.9,id;q=0.8,mt;q=0.7",
      "content-type": "application/json",
      "origin": "http://web.icq.com",
      "referer": "http://web.icq.com/",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "cross-site",
      "user-agent": "Mozilla/5.0 (Linux; Android 10; SM-A107F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Mobile Safari/537.36",
    }
  
  let config = JSON.stringify({"reqId":"64708-1593781791","params":{"phone":"62"+no,"language":"en-US","route":"sms","devId":"ic1rtwz1s1Hj1O0r","application":"icq"}})
  
  axios("https://u.icq.net/api/v14/rapi/auth/sendCode", {
      method: 'POST',
      data: config,
      headers: hd
  })
    .then(async ({data}) => {
      if(data.status.code == 20000){
        resolve
      }else{
        reject
      }
    })
    .catch((e) => {
      reject(e.message)
    })
  })
}

module.exports.sms_fave = async (no) => {
  return new Promise((resolve, reject) => {
    let hd = {
      "Host": "api.myfave.com",
      "Connection": "keep-alive",
      "x-user-agent": "Fave-PWA/v1.0.0",
      "User-Agent": "Mozilla/5.0 (Linux; Android 10; SM-A107F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Mobile Safari/537.36",
      "content-type": "application/json",
      "Accept": "*/*",
      "Origin": "https://m.myfave.com",
      "Referer": "https://m.myfave.com/jakarta/auth",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7"
      }
    
    let config = JSON.stringify({'phone':'62'+no})
    
    axios("https://api.myfave.com/api/fave/v3/auth", {
        method: 'POST',
        data: config,
        headers: hd
    })
      .then(async ({data}) => {
        if(data.request_id){
          resolve
        }else{
          reject
        }
      })
      .catch((e) => {
        reject(e.message)
      })
  })
}