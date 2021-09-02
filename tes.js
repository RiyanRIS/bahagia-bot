const fbdl = require("fbdl-core")
const fs = require("fs")

let url = "https://www.facebook.com/alanwalkermusic/videos/277641643524720"

const fbdl_fun = async (url) => {
  console.log("fbdl processing", url)
  fbdl.download(url)
    .then(res => {
        res.pipe(fs.createWriteStream("./public/fb_video.mp4"));
    })
    .catch((e) => {
      console.error("error", e)
    })
};

fbdl_fun(url);