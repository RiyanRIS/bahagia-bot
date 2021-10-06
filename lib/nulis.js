const { spawn } = require('child_process')

const font = ['nulisa']
// const font = ['ShadowsIntoLight', 'Caveat-VariableFont_wght', 'ComingSoon-Regular', 'GiveYouGlory-Regular', 'Mansalva-Regular', 'ReenieBeanie-Regular', 'TheGirlNextDoor-Regular', 'WaitingfortheSunrise-Regular']

module.exports.nulis = (args, jenis = "bukukanan") => {
  return new Promise((resolve, reject) => {
    let nama = "", namasa = false, kelas = "", kelasa = false, no = "", nosa = false,  txt = "", textsa = false

    // CEK NAMA
    if (args.includes('-nama') || args.includes('--nama')) {
      for (let i = 0; i < args.length; i++) {
        // Enables data collection when keyword found in index!
        if (args[i].includes('-n') || args[i].includes('--nama')) {
          namasa = true;
        }
        if (args[i].includes('-no') || args[i].includes('--nomor') || args[i].includes('-kls') || args[i].includes('--kelas') || args[i].includes('-t') || args[i].includes('--text')) {
          namasa = false;
        }
        // If data collection is enabled and args length is more then one it will start appending!
        if (namasa == true) {
          nama = nama + args[i] + ' '
        }
      }
      // Check if variable contain unnecessary startup word!
      if (nama.startsWith('-nama ')) {
        nama = `${nama.split('-nama ')[1]}`
      }
      if (nama.startsWith('--nama ')) {
        nama = `${nama.split('--nama ')[1]}`
      }
    }

    // CEK NOMOR
    if (args.includes('-no') || args.includes('--nomor')) {
      for (let i = 0; i < args.length; i++) {
        // Enables data collection when keyword found in index!
        if (args[i].includes('-no') || args[i].includes('--nomor')) {
          nosa = true
        }
        if (args[i].includes('-nama') || args[i].includes('--nama') || args[i].includes('-kls') || args[i].includes('--kelas') || args[i].includes('-t') || args[i].includes('--text')) {
          nosa = false;
        }
        // If data collection is enabled and args length is more then one it will start appending!
        if (nosa == true) {
          no = no + args[i] + ' '
        }
      }
      // Check if variable contain unnecessary startup word!
      if (no.startsWith('-no ')) {
        no = `${no.split('-no ')[1]}`
      }
      if (no.startsWith('--nomor ')) {
        no = `${no.split('--nomor ')[1]}`
      }
    }

    // CEK KELAS
    if (args.includes('-kls') || args.includes('--kelas')) {
      for (let i = 0; i < args.length; i++) {
        // Enables data collection when keyword found in index!
        if (args[i].includes('-kls') || args[i].includes('--kelas')) {
          kelasa = true;
        }
        if (args[i].includes('-nama') || args[i].includes('--nama') || args[i].includes('-no') || args[i].includes('--nomor') || args[i].includes('-t') || args[i].includes('--text')) {
          kelasa = false;
        }
        // If data collection is enabled and args length is more then one it will start appending!
        if (kelasa == true) {
          kelas = kelas + args[i] + ' '
        }
      }
      // Check if variable contain unnecessary startup word!
      if (kelas.startsWith('-kls ')) {
        kelas = `${kelas.split('-kls ')[1]}`
      }
      if (kelas.startsWith('--kelas ')) {
        kelas = `${kelas.split('--kelas ')[1]}`
      }
    }

    // CEK TEXT
    if (args.includes('-t') || args.includes('--text')) {
      for (let i = 0; i < args.length; i++) {
        // Enables data collection when keyword found in index!
        if (args[i].includes('-t') || args[i].includes('--text')) {
          textsa = true;
        }
        if (args[i].includes('-nama') || args[i].includes('--nama') || args[i].includes('-no') || args[i].includes('--nomor') || args[i].includes('-kls') || args[i].includes('--kelas')) {
          textsa = false;
        }
        // If data collection is enabled and args length is more then one it will start appending!
        if (textsa == true) {
          txt = txt + args[i] + ' '
        }
      }
      // Check if variable contain unnecessary startup word!
      if (txt.startsWith('-t ')) {
        txt = `${txt.split('-t ')[1]}`
      }
      if (txt.startsWith('--text ')) {
        txt = `${txt.split('--text ')[1]}`
      }
    }

    if(nama == "") nama = null
    if(no == "") no = null
    if(kelas == "") kelas = null

    console.log(nama, no, kelas)

    if(txt == ""){
      reject("Kami membutuhkan text untuk diolah.")
      return
    }
    if(jenis == "bukukanan"){
      bukukanan(txt, nama, no, kelas).then((res) => {
        resolve(res)
      }).catch((e) => reject(e))
    }
  })
}

const bukukanan = async(text, nama = null, no = null, kelas = null) => {
  return new Promise((resolve, reject) => {
    const font = ['nulisa']
    const ran = Math.floor(Math.random() * font.length)
    const splitText = text.replace(/(\S+\s*){1,11}/g, '$&\n')
    const fixHeight = splitText.split('\n').slice(0, 30).join('\n')
    // const fixHeight = text
    const pathbef = './src/gambar/nulisbukusebelumkanan.jpg'
    const pathres = './public/nulisbukukanan.jpg'

    // console.log(text)
    // return

    let hit = 0, a, b, c

    if(nama != null){
      nama = "Nama: " + nama
      hit++
    }

    if(no != null){
      no = "No: " + no
      hit++
    }

    if(kelas != null){
      kelas = "Kelas: " + kelas
      hit++
    }

    if(hit == 3){
      spawn('convert', [
        pathbef,
        '-font',
        `./src/font/${font[ran]}.ttf`,
        '-size',
          '960x1280',
          '-pointsize',
          '21',
          '-interline-spacing',
          '2',
          '-annotate',
          '+136+21',
          nama,
        '-size',
          '960x1280',
          '-pointsize',
          '20',
          '-interline-spacing',
          '2',
          '-annotate',
          '+137+45',
          no,
        '-size',
          '960x1280',
          '-pointsize',
          '20',
          '-interline-spacing',
          '2',
          '-annotate',
          '+138+67',
          kelas,
        '-size',
        '960x1280',
        '-pointsize',
        '20',
        '-interline-spacing',
        '7.2',
        '-annotate',
        '+130+129',
        fixHeight,
        './public/nulisbukukanan.jpg'
      ])
      .on('error', (e) => reject(e.message))
      .on('exit', () => {
          resolve('./public/nulisbukukanan.jpg')
      })
    } else if(hit == 2 && kelas == null) {
      spawn('convert', [
        pathbef,
        '-font',
        `./src/font/${font[ran]}.ttf`,
        '-size',
          '960x1280',
          '-pointsize',
          '21',
          '-interline-spacing',
          '2',
          '-annotate',
          '+136+32',
          nama,
        '-size',
          '960x1280',
          '-pointsize',
          '20',
          '-interline-spacing',
          '2',
          '-annotate',
          '+137+60',
          no,
        '-size',
        '960x1280',
        '-pointsize',
        '20',
        '-interline-spacing',
        '7.2',
        '-annotate',
        '+130+129',
        fixHeight,
        pathres
      ])
      .on('error', (e) => reject(e.message))
      .on('exit', () => {
          resolve(pathres)
      })
    } else if(hit == 2 && no == null) {
      spawn('convert', [
        pathbef,
        '-font',
        `./src/font/${font[ran]}.ttf`,
        '-size',
          '960x1280',
          '-pointsize',
          '21',
          '-interline-spacing',
          '2',
          '-annotate',
          '+136+33',
          nama,
        '-size',
          '960x1280',
          '-pointsize',
          '20',
          '-interline-spacing',
          '2',
          '-annotate',
          '+137+60',
          kelas,
        '-size',
        '960x1280',
        '-pointsize',
        '20',
        '-interline-spacing',
        '7.2',
        '-annotate',
        '+130+129',
        fixHeight,
        pathres
      ])
      .on('error', (e) => reject(e.message))
      .on('exit', () => {
          resolve(pathres)
      })
    } else if(hit == 1 && nama != null) {
      spawn('convert', [
        pathbef,
        '-font',
        `./src/font/${font[ran]}.ttf`,
        '-size',
          '960x1280',
          '-pointsize',
          '21',
          '-interline-spacing',
          '2',
          '-annotate',
          '+134+40',
          nama,
        '-size',
        '960x1280',
        '-pointsize',
        '20',
        '-interline-spacing',
        '7.2',
        '-annotate',
        '+130+129',
        fixHeight,
        pathres
      ])
      .on('error', (e) => reject(e.message))
      .on('exit', () => {
          resolve(pathres)
      })
    } else {
      spawn('convert', [
        pathbef,
        '-font',
        `./src/font/${font[ran]}.ttf`,
        '-size',
        '960x1280',
        '-pointsize',
        '20',
        '-interline-spacing',
        '7.2',
        '-annotate',
        '+130+129',
        fixHeight,
        pathres
      ])
      .on('error', (e) => reject(e.message))
      .on('exit', () => {
          resolve(pathres)
      })
    }
  })
}