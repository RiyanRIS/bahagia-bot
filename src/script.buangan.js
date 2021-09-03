// DOWNLOAD TWITTER BY PUPPETER
// DI LOCAL JALAN TAPI DI SERVER ENGGAK SOALNYA PUPETERNYA HARUS ADA GUI NYA
(async () => {
  let browser
  try {
    browser = await puppeteer.launch({
      headless: false,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    })
  } catch(e) {
    reply('error')
  }
  const page = await browser.newPage();
  await page
    .goto("https://id.savefrom.net/download-from-twitter", {
      waitUntil: "networkidle2",
    })
    .then(async () => {
      await page.type("#sf_url", args[0]);
      await page.click("#sf_submit");
      await new Promise(resolve => setTimeout(resolve, 5000));
      try {
        await page.waitForSelector("#sf_result");
        const element = await page.$("a.link-download");
        const link = await (await element.getProperty("href")).jsonValue();
        const text = await (await element.getProperty("download")).jsonValue();

        const filename = new Date().getTime()
        const path = `./public/${filename}.mp4`;
        const file = fs.createWriteStream(path);
        const request = http.get(link, function (response) {
          response.pipe(file);
        })

        file.on("finish", async () => {
          const videonya = fs.readFileSync(path)
          try {
            await conn.sendMessage(from, videonya, video, {
              caption: `*🙇‍♂️ Berhasil*\n\n${text}`
            })
            fs.unlinkSync(path)
          } catch (e) {
            console.error(e)
            reply(`Error waktu kirim file ke kamu, namun kami masih memiliki linknya: ${link}, silahkan download sendiri ya.`)
            fs.unlinkSync(path)
          }
        })

      } catch (error) {
        console.log(error);
        reply(`error`)
      }
    })
    .catch((err) => {
      console.log(err);
      reply(`error`)
    });
  browser.close();
})();