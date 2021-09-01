const hi = "yt" 
switch (hi) {
  case 'yt':
    var url = args[0];
    console.log(`${url}`)
    const dm = async (url) => {
        let info = ytdl.getInfo(url)
        const stream = ytdl(url, { filter: info => info.itag == 22 || info.itag == 18 })
            .pipe(fs.createWriteStream('video.mp4'));
        console.log("Video downloaded")
        await new Promise((resolve, reject) => {
            stream.on('error', reject)
            stream.on('finish', resolve)
        }).then(async (res) => {
            await conn.sendMessage(
                from,
                fs.readFileSync('video.mp4'),
                MessageType.video,
                { mimetype: Mimetype.mp4 }
            )
            console.log("Sent ")

        }).catch((err) => {
            reply`Unable to download,contact dev.`;
        });

    }
    dm(url)
    break

    case 'yts':
      var url1 = args[0];
      console.log(`${url1}`)
      const am = async (url1) => {
          let info = ytdl.getInfo(url1)
          const stream = ytdl(url1, { filter: info => info.audioBitrate == 160 || info.audioBitrate == 128 })
              .pipe(fs.createWriteStream('audio.mp3'));
          console.log("audio downloaded")
          await new Promise((resolve, reject) => {
              stream.on('error', reject)
              stream.on('finish', resolve)
          }).then(async (res) => {
              await conn.sendMessage(
                  from,
                  fs.readFileSync('audio.mp3'),
                  MessageType.audio,
                  { mimetype: Mimetype.mp4Audio }
              ).then((resolved)=>{
              console.log("Sent ")})
              .catch((reject)=>{
                  reply`Enable to download send a valid req`
              })

          }).catch((err) => {
              reply`Unable to download,contact dev.`;
          });

      }
      am(url1)
      break
    }