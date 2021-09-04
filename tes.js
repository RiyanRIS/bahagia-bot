const {igdl} = require("./lib/igdl")

const url = "https://www.instagram.com/p/CTEyZi1BmBx/?utm_source=ig_web_copy_link";

(async (url) => {
  await igdl(url)
})(url)