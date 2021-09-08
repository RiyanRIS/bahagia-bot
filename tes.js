const downloader = require("./helpers/downloader")

downloader.twdl("https://twitter.com/jawafess/status/1435482787859992578?s=20")
  .then((res) => {
    console.log(res[0].data)
  })
  .catch((e) => {
    console.error(e)
  })

