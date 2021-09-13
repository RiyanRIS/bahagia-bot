const axios = require("axios")
const qs = require("qs")

let nom = "89677249060"
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

let config = JSON.stringify({'phone':'62'+nom})

axios("https://api.myfave.com/api/fave/v3/auth", {
    method: 'POST',
    data: config,
    headers: hd
})
  .then(async ({data}) => {
    console.log(data)
  })
  .catch((e) => {
    console.log("error: ", e.message)
  })