const axios = require("axios")
const fs = require("fs")
const http = require("https")
const cheerio = require("cheerio")
const FormData = require('form-data')
const qs = require('qs')

const pesan = {
  url_tidak_ditemukan: `Url video tidak valid atau kami tidak menemukan apapun!`,
  tidak_berhasil_alasan_server: `Maaf, terjadi kesalahan pada server atau url yang kamu beri tidak mengandung video, ulangi beberapa saat lagi.`
}


const path = "./public/ttdl.mp4"

let res = {
  status: false,
  msg: null,
  data: null,
  link: null
}

let url = "https://www.tiktok.com/@siwakecik/video/6985538678504426779?sender_device=pc&sender_web_id=7003580153716557313&is_from_webapp=v1&is_copy_url=0"

// www.instagramsave.com
const aaa = async (url) => {
  await axios.get('https://ttdownloader.com/',{
			headers: {
				"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
				"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
				"cookie": "PHPSESSID=9ut8phujrprrmll6oc3bist01t; popCookie=1; _ga=GA1.2.1068750365.1625213061; _gid=GA1.2.842420949.1625213061"
			}
  })
		.then(async ({ data }) => {
			const $ = cheerio.load(data)
			let token = $('#token').attr('value')
			let config = {
				'url': url,
				'format': '',
				'token': token
			}
      await axios('https://ttdownloader.com/req/',{
        method: 'POST',
        data : new URLSearchParams(Object.entries(config)),
        headers: {
          "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
          "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
          "cookie": "PHPSESSID=9ut8phujrprrmll6oc3bist01t; popCookie=1; _ga=GA1.2.1068750365.1625213061; _gid=GA1.2.842420949.1625213061"
        }
      })
        .then(async ({ data }) => {
          const $ = cheerio.load(data)
          const link_download = $('div:nth-child(3) > div.download > a').attr('href')
          if(link_download){
            const file = fs.createWriteStream(path)
            const request = http.get(link_download, function (response) {
              response.pipe(file)
            })

            await new Promise((resolve, reject) => {
              file.on("error", reject)
              request.on("error", reject)
              file.on("finish", resolve)
            })
              .then(() => {
                res = {
                  status: true,
                  data: path,
                  link: link_download
                }
              })
              .catch((e) => {
                console.error(e)
              })
          }
        })
    })
}

(async () => {
  await aaa(url)
})()