const fun = require("./helpers/function")
const dl = require("./helpers/downloader")
const {ttdl} = require("./lib/ttdl")
const axios = require("axios")

// for (let index = 0; index < 10; index++) {
  let base = "https://cors-tiktok.herokuapp.com/?u="
  let url = "https://ttdownloader.com/dl.php?v=YTo0OntzOjk6IndhdGVybWFyayI7YjoxO3M6NzoidmlkZW9JZCI7czozMjoiZjVkOWJkNDc0MzUxNzI2NTU1ZWJkYzUxYTUyZjkwMDMiO3M6MzoidWlkIjtzOjMyOiJmMGNjOTg3MmFjOGNlMjc2N2M2Yjk0OWM3ZmViMjMwOCI7czo0OiJ0aW1lIjtpOjE2MzI1NTI4MzQ7fQ=="
  let url1 = "https://www.tiktok.com/@boqirgracia/video/7011748220388789531?sender_device=pc&sender_web_id=7003580153716557313&is_from_webapp=v1&is_copy_url=0"
  let urls = "https://www.youtube.com/watch?v=0SlInpIqHiE"
  let url_ig = "https://www.instagram.com/vincentrompies/"

  const ax = async () => {
    await dl.igstory(url_ig)
      .then(async (igs) => {
        try {
          igs.forEach(async (element) => {
            console.log(element)
          })
        } catch(e) {
          console.log(e)
        }
      })
      .catch((e) => {
        console.log(e)
      })
  }
  ax()
  // axios.get(base + url1).then(({data}) => {
  //   console.log(data)
  // })


// }