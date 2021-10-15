const axios = require("axios")
const cheerio = require("cheerio")

module.exports.kapanlagi = (param) => {
  return new Promise((resolve, reject) => {
    search(param).then((res) => {
      sc_kapanlagi(res[0].link).then((res) => {
        resolve(res)
      }).catch((e) => reject(e))
    }).catch((e) => reject(e))
  })
}

module.exports.musixmatch = (param) => {
  return new Promise((resolve, reject) => {
    const BASE = "https://www.musixmatch.com"
    const link = `${BASE}/search/${encodeURI(param)}`

    axios(link, {
      method: 'get'
    }).then(({data}) => {
      const $ = cheerio.load(data)
      let url = $("a.title").attr("href")
      if(url == undefined){
        reject("Lagu tidak ditemukan, gunakan keyword lain..")
      } else {
        axios.get(BASE + url).then(({data}) => {
          const $ = cheerio.load(data)
          try{
            let judul = $(".mxm-track-title__track").text().replace("Lyrics", " ").replace("\"", "").trim()
            let band = $("a.mxm-track-title__artist").text()
            let lirik = $(".lyrics__content__ok").first().text()
            let lirik2 = $(".lyrics__content__ok").last().text()
            let result = {
              judul: judul +" - "+ band,
              nama_lagu: judul,
              band: band,
              lirik: lirik +"\n"+ lirik2,
            }
            resolve(result)
          }catch(e){
            reject(e.message)
          }
        }).catch((e) => reject(e.message))
      }
    }).catch((e) => reject(e.message))
  })
}

const search = (param) => {
  return new Promise((resolve, reject) => {
    param += "lirik lagu site:lirik.kapanlagi.com"
    const encodedString = encodeURI(param);

    const AXIOS_OPTIONS = {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36",
      },
    };

    axios.get(
        `https://www.google.com/search?q=${encodedString}&hl=en&gl=us`,
        AXIOS_OPTIONS
      )
      .then(function ({ data }) {
        let $ = cheerio.load(data);

        const links = [];
        const titles = [];
        const snippets = [];

        $(".yuRUbf > a").each((i, el) => {
          links[i] = $(el).attr("href");
        });
        $(".yuRUbf > a > h3").each((i, el) => {
          titles[i] = $(el).text();
        });
        $(".IsZvec").each((i, el) => {
          snippets[i] = $(el).text().trim();
        });

        const result = [];
        for (let i = 0; i < links.length; i++) {
          result[i] = {
            link: links[i],
            title: titles[i],
            snippet: snippets[i],
          };
        }

        resolve(result);
      }).catch((e) => reject(e.message))
  })
}

const sc_kapanlagi = (link) => {
  return new Promise((resolve, reject) => {
    axios(link, {
      method: 'get'
    }).then(({data}) => {
      const $ = cheerio.load(data)
      const title1 = $("title").text().replace("Lirik Lagu ", "").split("-")
      const judul = title1[0] + "-" + title1[1]
    
      const lirikk = $(".lirik_line")
      let lirik = ''
      for (let index = 1; index <= lirikk.length; index++) {
        if($(`#line_${index}`).children("p").length == 0 && $(`#line_${index}`).children("a").length == 0){
          if(lirikk.length == index){
            lirik += $(`#line_${index}`).text()
          } else {
            lirik += $(`#line_${index}`).text() + "\n"
            if($(`#line_${index}`).next("br").length){
              lirik += "\n"
            }
          }
        }
      }
      let result = {
        judul: judul.trim(),
        nama_lagu: title1[0].trim(),
        band: title1[1].trim(),
        lirik: lirik,
      }
      resolve(result)
    }).catch((e) => reject(e.message))
  })
}