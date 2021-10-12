const {
  spawn
} = require('child_process')

// const font = ['nulisa']
const msg = {
  tanpatext: "Kami membutuhkan text untuk diolah, kamu lupa melampirkan *-t*.\n\ncontoh: _/bka -t Nah, ini adalah kalimat yang akan ditulis_"
}
const randomname = new Date().getTime()
const font = ['IndieFlower-Regular', 'Caveat-VariableFont_wght', 'ComingSoon-Regular', 'TheGirlNextDoor-Regular', 'WaitingfortheSunrise-Regular']

module.exports.nulis = (args) => {
  return new Promise((resolve, reject) => {
    let nama = "",
      kelas = "",
      no = "",
      txt = "",
      fon = "",
      kertas = "",
      isParam = false,
      hit = 0,
      manual = false,
      splitText, teks

    // CEK NAMA
    if (args.includes('-nama') || args.includes('--nama')) {
      for (let i = 0; i < args.length; i++) {
        // Enables data collection when keyword found in index!
        if (args[i].includes('-nama') || args[i].includes('--nama')) {
          isParam = true;
        }
        if (args[i].includes('-man') || args[i].includes('--manual') || args[i].includes('-ker') || args[i].includes('--kertas') || args[i].includes('-f') || args[i].includes('--font') || args[i].includes('-no') || args[i].includes('--nomor') || args[i].includes('-kls') || args[i].includes('--kelas') || args[i].includes('-t') || args[i].includes('--text')) {
          isParam = false;
        }
        // If data collection is enabled and args length is more then one it will start appending!
        if (isParam == true) {
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
      hit++
      nama = 'Nama: ' + nama
    } else {
      nama = null
    }

    // CEK NOMOR
    if (args.includes('-no') || args.includes('--nomor')) {
      for (let i = 0; i < args.length; i++) {
        // Enables data collection when keyword found in index!
        if (args[i].includes('-no') || args[i].includes('--nomor')) {
          isParam = true
        }
        if (args[i].includes('-man') || args[i].includes('--manual') || args[i].includes('-ker') || args[i].includes('--kertas') || args[i].includes('-f') || args[i].includes('--font') || args[i].includes('-nama') || args[i].includes('--nama') || args[i].includes('-kls') || args[i].includes('--kelas') || args[i].includes('-t') || args[i].includes('--text')) {
          isParam = false;
        }
        // If data collection is enabled and args length is more then one it will start appending!
        if (isParam == true) {
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
      hit++
      no = "No: " + no
    } else {
      no = null
    }

    // CEK KELAS
    if (args.includes('-kls') || args.includes('--kelas')) {
      for (let i = 0; i < args.length; i++) {
        // Enables data collection when keyword found in index!
        if (args[i].includes('-kls') || args[i].includes('--kelas')) {
          isParam = true;
        }
        if (args[i].includes('-man') || args[i].includes('--manual') || args[i].includes('-ker') || args[i].includes('--kertas') || args[i].includes('-f') || args[i].includes('--font') || args[i].includes('-nama') || args[i].includes('--nama') || args[i].includes('-no') || args[i].includes('--nomor') || args[i].includes('-t') || args[i].includes('--text')) {
          isParam = false;
        }
        // If data collection is enabled and args length is more then one it will start appending!
        if (isParam == true) {
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
      hit++
      kelas = "Kelas: " + kelas
    } else {
      kelas = null
    }

    if (args.includes('-man') || args.includes('--manual')) {
      manual = true
    }

    // CEK KERTAS
    if (args.includes('-ker') || args.includes('--kertas')) {
      for (let i = 0; i < args.length; i++) {
        // Enables data collection when keyword found in index!
        if (args[i].includes('-ker') || args[i].includes('--kertas')) {
          isParam = true;
        }
        if (args[i].includes('-man') || args[i].includes('--manual') || args[i].includes('-kls') || args[i].includes('--kelas') || args[i].includes('-f') || args[i].includes('--font') || args[i].includes('-nama') || args[i].includes('--nama') || args[i].includes('-no') || args[i].includes('--nomor') || args[i].includes('-t') || args[i].includes('--text')) {
          isParam = false;
        }
        // If data collection is enabled and args length is more then one it will start appending!
        if (isParam == true) {
          kertas = kertas + args[i] + ' '
        }
      }
      // Check if variable contain unnecessary startup word!
      if (kertas.startsWith('-ker ')) {
        kertas = `${kertas.split('-ker ')[1]}`
      }
      if (kertas.startsWith('--kertas ')) {
        kertas = `${kertas.split('--kertas ')[1]}`
      }
    } else {
      kertas = 0
    }

    // CEK FONT
    if (args.includes('-fon') || args.includes('--font')) {
      for (let i = 0; i < args.length; i++) {
        // Enables data collection when keyword found in index!
        if (args[i].includes('-fon') || args[i].includes('--font')) {
          isParam = true;
        }
        if (args[i].includes('-man') || args[i].includes('--manual') || args[i].includes('-ker') || args[i].includes('--kertas') || args[i].includes('-t') || args[i].includes('--text') || args[i].includes('-nama') || args[i].includes('--nama') || args[i].includes('-no') || args[i].includes('--nomor') || args[i].includes('-kls') || args[i].includes('--kelas')) {
          isParam = false;
        }
        // If data collection is enabled and args length is more then one it will start appending!
        if (isParam == true) {
          fon = fon + args[i] + ' '
        }
      }
      // Check if variable contain unnecessary startup word!
      if (fon.startsWith('-fon ')) {
        fon = `${fon.split('-fon ')[1]}`
      }
      if (txt.startsWith('--font ')) {
        fon = `${fon.split('--font ')[1]}`
      }
    } else {
      fon = 0
    }

    // CEK TEXT
    if (args.includes('-t') || args.includes('--text')) {
      for (let i = 0; i < args.length; i++) {
        // Enables data collection when keyword found in index!
        if (args[i].includes('-t') || args[i].includes('--text')) {
          isParam = true;
        }
        if (args[i].includes('-man') || args[i].includes('--manual') || args[i].includes('-ker') || args[i].includes('--kertas') || args[i].includes('-f') || args[i].includes('--font') || args[i].includes('-nama') || args[i].includes('--nama') || args[i].includes('-no') || args[i].includes('--nomor') || args[i].includes('-kls') || args[i].includes('--kelas')) {
          isParam = false;
        }
        // If data collection is enabled and args length is more then one it will start appending!
        if (isParam == true) {
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
    } else {
      txt = null
    }

    if (txt == "" || txt == null) {
      reject(msg.tanpatext)
      return
    }

    fon = parseInt(fon)
    kertas = parseInt(kertas)

    if (kertas > 4 || kertas == NaN) {
      kertas = 0
    }

    if (fon > font.length || fon == NaN) {
      fon = 0
    }

    if (!manual) {
      txt = txt.replace(/(\S+\s*){1,11}/g, '$&\n')
    }

    if (kertas == 0) {
      prosesbukkan1(fon, nama, no, kelas, txt).then((res) => resolve(res)).catch((e) => reject(e))
    } else if (kertas == 1) {
      prosesbukkan2(hit, fon, nama, no, kelas, txt).then((res) => resolve(res)).catch((e) => reject(e))
    }
  })
}

const prosesbukkan1 = (hit, fon, nama, no, kelas, txt) => {
  return new Promise((resolve, reject) => {
    let pointer, space
    const pathbef = './src/gambar/nulisbukusebelumkanan.jpg'
    const pathres = `./public/${randomname}.jpg`
    const teks = txt.split('\n').slice(0, 31).join('\n')

    if (fon == 0) {
      pointer = '20'
      space = '7.2'
    } else if (fon == 1) {
      pointer = '26'
      space = '4.1'
    } else if (fon == 2) {
      pointer = '18'
      space = '9.3'
    } else if (fon == 3) {
      pointer = '19'
      space = '0.7'
    } else if (fon == 4) {
      pointer = '23'
      space = '-2'
    }

    if (hit == 3) {
      spawn('convert', [
          pathbef,
          '-font',
          `./src/font/${font[fon]}.ttf`,
          '-size',
          '960x1280',
          '-pointsize',
          pointer,
          '-interline-spacing',
          space,
          '-annotate',
          '+132+22',
          nama,
          '-annotate',
          '+131+47',
          no,
          '-annotate',
          '+132+73',
          kelas,
          '-annotate',
          '+130+129',
          teks,
          pathres
        ])
        .on('error', (e) => reject(e.message))
        .on('exit', () => {
          resolve(pathres)
        })
    } else if (hit == 2 && kelas == null) {
      spawn('convert', [
          pathbef,
          '-font',
          `./src/font/${font[fon]}.ttf`,
          '-size',
          '960x1280',
          '-pointsize',
          pointer,
          '-interline-spacing',
          space,
          '-annotate',
          '+133+32',
          nama,
          '-annotate',
          '+132+62',
          no,
          '-annotate',
          '+130+129',
          teks,
          pathres
        ])
        .on('error', (e) => reject(e.message))
        .on('exit', () => {
          resolve(pathres)
        })
    } else if (hit == 2 && no == null) {
      spawn('convert', [
          pathbef,
          '-font',
          `./src/font/${font[fon]}.ttf`,
          '-size',
          '960x1280',
          '-pointsize',
          pointer,
          '-interline-spacing',
          space,
          '-annotate',
          '+132+33',
          nama,
          '-annotate',
          '+132+62',
          kelas,
          '-annotate',
          '+130+129',
          teks,
          pathres
        ])
        .on('error', (e) => reject(e.message))
        .on('exit', () => {
          resolve(pathres)
        })
    } else if (hit == 1 && nama != null) {
      spawn('convert', [
          pathbef,
          '-font',
          `./src/font/${font[fon]}.ttf`,
          '-size',
          '960x1280',
          '-pointsize',
          pointer,
          '-interline-spacing',
          space,
          '-annotate',
          '+134+40',
          nama,
          '-annotate',
          '+130+129',
          teks,
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
          `./src/font/${font[fon]}.ttf`,
          '-size',
          '960x1280',
          '-pointsize',
          pointer,
          '-interline-spacing',
          space,
          '-annotate',
          '+130+129',
          teks,
          pathres
        ])
        .on('error', (e) => reject(e.message))
        .on('exit', () => {
          resolve(pathres)
        })
    }
  })
}

const prosesbukkan2 = (hit, fon, nama, no, kelas, txt) => {
  return new Promise((resolve, reject) => {
    let pointer, space
    const pathbef = './src/gambar/kertas.jpg'
    const pathres = `./public/${randomname}.jpg`
    const teks = txt.split('\n').slice(0, 25).join('\n')

    if (fon == 0) {
      pointer = '28'
      space = '11'
    } else if (fon == 1) {
      pointer = '35'
      space = '8'
    } else if (fon == 2) {
      pointer = '25'
      space = '14'
    } else if (fon == 3) {
      pointer = '25'
      space = '5.8'
    } else if (fon == 4) {
      pointer = '31'
      space = '1'
    }

    if (hit == 3) {
      spawn('convert', [
          pathbef,
          '-font',
          `./src/font/${font[fon]}.ttf`,
          '-size',
          '1238x1600',
          '-pointsize',
          pointer,
          '-interline-spacing',
          space,
          '-annotate',
          '+61+35',
          nama,
          '-annotate',
          '+62+75',
          no,
          '-annotate',
          '+61+113',
          kelas,
          '-annotate',
          '+110+201',
          teks,
          pathres
        ])
        .on('error', (e) => reject(e.message))
        .on('exit', () => {
          resolve(pathres)
        })
    } else if (hit == 2 && kelas == null) {
      spawn('convert', [
          pathbef,
          '-font',
          `./src/font/${font[fon]}.ttf`,
          '-size',
          '1238x1600',
          '-pointsize',
          pointer,
          '-interline-spacing',
          space,
          '-annotate',
          '+61+45',
          nama,
          '-annotate',
          '+62+80',
          no,
          '-annotate',
          '+110+201',
          teks,
          pathres
        ])
        .on('error', (e) => reject(e.message))
        .on('exit', () => {
          resolve(pathres)
        })
    } else if (hit == 2 && no == null) {
      spawn('convert', [
          pathbef,
          '-font',
          `./src/font/${font[fon]}.ttf`,
          '-size',
          '1238x1600',
          '-pointsize',
          pointer,
          '-interline-spacing',
          space,
          '-annotate',
          '+61+45',
          nama,
          '-annotate',
          '+62+80',
          kelas,
          '-annotate',
          '+110+201',
          teks,
          pathres
        ])
        .on('error', (e) => reject(e.message))
        .on('exit', () => {
          resolve(pathres)
        })
    } else if (hit == 1 && nama != null) {
      spawn('convert', [
          pathbef,
          '-font',
          `./src/font/${font[fon]}.ttf`,
          '-size',
          '1238x1600',
          '-pointsize',
          pointer,
          '-interline-spacing',
          space,
          '-annotate',
          '+61+50',
          nama,
          '-annotate',
          '+110+201',
          teks,
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
          `./src/font/${font[fon]}.ttf`,
          '-size',
          '1238x1600',
          '-pointsize',
          pointer,
          '-interline-spacing',
          space,
          '-annotate',
          '+110+201',
          teks,
          pathres
        ])
        .on('error', (e) => reject(e.message))
        .on('exit', () => {
          resolve(pathres)
        })
    }
  })
}
       
const bukukiri = async (text, nama = null, no = null, kelas = null, fon = null) => {
  return new Promise((resolve, reject) => {
    const ran = Math.floor(Math.random() * font.length)
    const splitText = text.replace(/(\S+\s*){1,10}/g, '$&\n')
    const fixHeight = splitText.split('\n').slice(0, 30).join('\n')
    const pathbef = './src/gambar/nulisbukusebelumkiri.jpg'
    const pathres = './public/nulisbukukiri.jpg'

    let hit = 0

    if (nama != null) {
      nama = "Nama: " + nama
      hit++
    }

    if (no != null) {
      no = "No: " + no
      hit++
    }

    if (kelas != null) {
      kelas = "Kelas: " + kelas
      hit++
    }

    if (hit == 3) {
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
          '+160+40',
          nama,
          '-size',
          '960x1280',
          '-pointsize',
          '20',
          '-interline-spacing',
          '2',
          '-annotate',
          '+159+64',
          no,
          '-size',
          '960x1280',
          '-pointsize',
          '20',
          '-interline-spacing',
          '2',
          '-annotate',
          '+160+89',
          kelas,
          '-size',
          '960x1280',
          '-pointsize',
          '22',
          '-interline-spacing',
          '2',
          '-annotate',
          '+140+153',
          fixHeight,
          './public/nulisbukukanan.jpg'
        ])
        .on('error', (e) => reject(e.message))
        .on('exit', () => {
          resolve('./public/nulisbukukanan.jpg')
        })
    } else if (hit == 2 && kelas == null) {
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
          '+160+50',
          nama,
          '-size',
          '960x1280',
          '-pointsize',
          '20',
          '-interline-spacing',
          '2',
          '-annotate',
          '+158+82',
          no,
          '-size',
          '960x1280',
          '-pointsize',
          '22',
          '-interline-spacing',
          '2',
          '-annotate',
          '+140+153',
          fixHeight,
          pathres
        ])
        .on('error', (e) => reject(e.message))
        .on('exit', () => {
          resolve(pathres)
        })
    } else if (hit == 2 && no == null) {
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
          '+160+50',
          nama,
          '-size',
          '960x1280',
          '-pointsize',
          '20',
          '-interline-spacing',
          '2',
          '-annotate',
          '+162+82',
          kelas,
          '-size',
          '960x1280',
          '-pointsize',
          '22',
          '-interline-spacing',
          '2',
          '-annotate',
          '+140+153',
          fixHeight,
          pathres
        ])
        .on('error', (e) => reject(e.message))
        .on('exit', () => {
          resolve(pathres)
        })
    } else if (hit == 1 && nama != null) {
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
          '+160+56',
          nama,
          '-size',
          '960x1280',
          '-pointsize',
          '22',
          '-interline-spacing',
          '2',
          '-annotate',
          '+140+153',
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
          '22',
          '-interline-spacing',
          '2',
          '-annotate',
          '+140+153',
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

const bkiman = async (text, nama = null, no = null, kelas = null, fon = null) => {
  return new Promise((resolve, reject) => {
    const ran = Math.floor(Math.random() * font.length)
    // const splitText = text.replace(/(\S+\s*){1,10}/g, '$&\n')
    const fixHeight = text.split('\n').slice(0, 30).join('\n')
    const pathbef = './src/gambar/nulisbukusebelumkiri.jpg'
    const pathres = './public/nulisbukukiri.jpg'

    let hit = 0

    if (nama != null) {
      nama = "Nama: " + nama
      hit++
    }

    if (no != null) {
      no = "No: " + no
      hit++
    }

    if (kelas != null) {
      kelas = "Kelas: " + kelas
      hit++
    }

    if (hit == 3) {
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
          '+160+40',
          nama,
          '-size',
          '960x1280',
          '-pointsize',
          '20',
          '-interline-spacing',
          '2',
          '-annotate',
          '+159+64',
          no,
          '-size',
          '960x1280',
          '-pointsize',
          '20',
          '-interline-spacing',
          '2',
          '-annotate',
          '+160+89',
          kelas,
          '-size',
          '960x1280',
          '-pointsize',
          '22',
          '-interline-spacing',
          '2',
          '-annotate',
          '+140+153',
          fixHeight,
          './public/nulisbukukanan.jpg'
        ])
        .on('error', (e) => reject(e.message))
        .on('exit', () => {
          resolve('./public/nulisbukukanan.jpg')
        })
    } else if (hit == 2 && kelas == null) {
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
          '+160+50',
          nama,
          '-size',
          '960x1280',
          '-pointsize',
          '20',
          '-interline-spacing',
          '2',
          '-annotate',
          '+158+82',
          no,
          '-size',
          '960x1280',
          '-pointsize',
          '22',
          '-interline-spacing',
          '2',
          '-annotate',
          '+140+153',
          fixHeight,
          pathres
        ])
        .on('error', (e) => reject(e.message))
        .on('exit', () => {
          resolve(pathres)
        })
    } else if (hit == 2 && no == null) {
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
          '+160+50',
          nama,
          '-size',
          '960x1280',
          '-pointsize',
          '20',
          '-interline-spacing',
          '2',
          '-annotate',
          '+162+82',
          kelas,
          '-size',
          '960x1280',
          '-pointsize',
          '22',
          '-interline-spacing',
          '2',
          '-annotate',
          '+140+153',
          fixHeight,
          pathres
        ])
        .on('error', (e) => reject(e.message))
        .on('exit', () => {
          resolve(pathres)
        })
    } else if (hit == 1 && nama != null) {
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
          '+160+56',
          nama,
          '-size',
          '960x1280',
          '-pointsize',
          '22',
          '-interline-spacing',
          '2',
          '-annotate',
          '+140+153',
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
          '22',
          '-interline-spacing',
          '2',
          '-annotate',
          '+140+153',
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

const bukukanan1 = async (text, nama = null, no = null, kelas = null, fon = null) => {
  return new Promise((resolve, reject) => {
    const font = "Zahraaa.ttf"
    const panjangKalimat = text.replace(/(\S+\s*){1,9}/g, '$&\n')
    const panjangBaris = panjangKalimat.split('\n').slice(0, 31).join('\n')
    const pathbef = './src/gambar/magernulis1.jpg'
    const pathres = './public/magernulis1.jpg'

    let hit = 0

    if (nama != null) {
      nama = "Nama: " + nama
      hit++
    }

    if (no != null) {
      no = "No: " + no
      hit++
    }

    if (kelas != null) {
      kelas = "Kelas: " + kelas
      hit++
    }

    if (hit == 3) {
      spawn('convert', [
          pathbef,
          '-font',
          './src/font/' + font,
          '-size',
          '960x1280',
          '-pointsize',
          '21',
          '-interline-spacing',
          '2',
          '-annotate',
          '+360+56',
          nama,
          '-size',
          '960x1280',
          '-pointsize',
          '20',
          '-interline-spacing',
          '2',
          '-annotate',
          '+360+78',
          no,
          '-size',
          '960x1280',
          '-pointsize',
          '20',
          '-interline-spacing',
          '2',
          '-annotate',
          '+360+100',
          kelas,
          '-size',
          '1024x784',
          '-pointsize',
          '20',
          '-interline-spacing',
          '-7.5',
          '-annotate',
          '+344+142',
          panjangBaris,
          pathres
        ])
        .on('error', (e) => reject(e.message))
        .on('exit', () => {
          resolve(pathres)
        })
    } else if (hit == 2 && kelas == null) {
      spawn('convert', [
          pathbef,
          '-font',
          './src/font/' + font,
          '-size',
          '960x1280',
          '-pointsize',
          '21',
          '-interline-spacing',
          '2',
          '-annotate',
          '+360+66',
          nama,
          '-size',
          '960x1280',
          '-pointsize',
          '20',
          '-interline-spacing',
          '2',
          '-annotate',
          '+361+97',
          no,
          '-size',
          '1024x784',
          '-pointsize',
          '20',
          '-interline-spacing',
          '-7.5',
          '-annotate',
          '+344+142',
          panjangBaris,
          pathres
        ])
        .on('error', (e) => reject(e.message))
        .on('exit', () => {
          resolve(pathres)
        })
    } else if (hit == 2 && no == null) {
      spawn('convert', [
          pathbef,
          '-font',
          './src/font/' + font,
          '-size',
          '960x1280',
          '-pointsize',
          '21',
          '-interline-spacing',
          '2',
          '-annotate',
          '+360+66',
          nama,
          '-size',
          '960x1280',
          '-pointsize',
          '20',
          '-interline-spacing',
          '2',
          '-annotate',
          '+363+98',
          kelas,
          '-size',
          '1024x784',
          '-pointsize',
          '20',
          '-interline-spacing',
          '-7.5',
          '-annotate',
          '+344+142',
          panjangBaris,
          pathres
        ])
        .on('error', (e) => reject(e.message))
        .on('exit', () => {
          resolve(pathres)
        })
    } else if (hit == 1 && nama != null) {
      spawn('convert', [
          pathbef,
          '-font',
          './src/font/' + font,
          '-size',
          '1024x784',
          '-pointsize',
          '18',
          '-interline-spacing',
          '1',
          '-annotate',
          '+360+67',
          nama,
          '-size',
          '1024x784',
          '-pointsize',
          '20',
          '-interline-spacing',
          '-7.5',
          '-annotate',
          '+344+142',
          panjangBaris,
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
          './src/font/' + font,
          '-size',
          '1024x784',
          '-pointsize',
          '20',
          '-interline-spacing',
          '-7.5',
          '-annotate',
          '+344+142',
          panjangBaris,
          pathres
        ])
        .on('error', (e) => reject(e.message))
        .on('exit', () => {
          resolve(pathres)
        })
    }
  })
}

const fka = async (text, nama = null, no = null, kelas = null, fon = null) => {
  return new Promise((resolve, reject) => {
    const font = ["IndieFlower-Regular"]
    const ran = Math.floor(Math.random() * font.length)
    const splitText = text.replace(/(\S+\s*){1,13}/g, '$&\n')
    const fixHeight = splitText.split('\n').slice(0, 38).join('\n')
    const pathbef = './src/gambar/nulisfoliosebelumkanan.jpg'
    const pathres = './public/nulisfoliokanan.jpg'

    let hit = 0

    if (nama != null) {
      nama = "Nama: " + nama
      hit++
    }

    if (no != null) {
      no = "No: " + no
      hit++
    }

    if (kelas != null) {
      kelas = "Kelas: " + kelas
      hit++
    }

    if (hit == 3) {
      spawn('convert', [
          pathbef,
          '-font',
          `./src/font/${font[ran]}.ttf`,
          '-size',
          '960x1280',
          '-pointsize',
          '23',
          '-interline-spacing',
          '3',
          '-annotate',
          '+92+47',
          nama,
          '-annotate',
          '+90+80',
          no,
          '-annotate',
          '+91+113',
          kelas,
          '-annotate',
          '+89+190',
          fixHeight,
          pathres
        ])
        .on('error', (e) => reject(e.message))
        .on('exit', () => {
          resolve(pathres)
        })
    } else if (hit == 2 && kelas == null) {
      spawn('convert', [
          pathbef,
          '-font',
          `./src/font/${font[ran]}.ttf`,
          '-size',
          '960x1280',
          '-pointsize',
          '23',
          '-interline-spacing',
          '3',
          '-annotate',
          '+92+59',
          nama,
          '-annotate',
          '+90+100',
          no,
          '-annotate',
          '+89+190',
          fixHeight,
          pathres
        ])
        .on('error', (e) => reject(e.message))
        .on('exit', () => {
          resolve(pathres)
        })
    } else if (hit == 2 && no == null) {
      spawn('convert', [
          pathbef,
          '-font',
          `./src/font/${font[ran]}.ttf`,
          '-size',
          '960x1280',
          '-pointsize',
          '23',
          '-interline-spacing',
          '3',
          '-annotate',
          '+92+59',
          nama,
          '-annotate',
          '+90+100',
          kelas,
          '-annotate',
          '+89+190',
          fixHeight,
          pathres
        ])
        .on('error', (e) => reject(e.message))
        .on('exit', () => {
          resolve(pathres)
        })
    } else if (hit == 1 && nama != null) {
      spawn('convert', [
          pathbef,
          '-font',
          `./src/font/${font[ran]}.ttf`,
          '-size',
          '960x1280',
          '-pointsize',
          '23',
          '-interline-spacing',
          '3',
          '-annotate',
          '+90+59',
          nama,
          '-annotate',
          '+89+190',
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
          '23',
          '-interline-spacing',
          '3',
          '-annotate',
          '+89+190',
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

const fkaman = async (text, nama = null, no = null, kelas = null, fon = null) => {
  return new Promise((resolve, reject) => {
    const font = ["IndieFlower-Regular"]
    const ran = Math.floor(Math.random() * font.length)
    // const splitText = text.replace(/(\S+\s*){1,13}/g, '$&\n')
    const fixHeight = text.split('\n').slice(0, 38).join('\n')
    const pathbef = './src/gambar/nulisfoliosebelumkanan.jpg'
    const pathres = './public/nulisfoliokanan.jpg'

    let hit = 0

    if (nama != null) {
      nama = "Nama: " + nama
      hit++
    }

    if (no != null) {
      no = "No: " + no
      hit++
    }

    if (kelas != null) {
      kelas = "Kelas: " + kelas
      hit++
    }

    if (hit == 3) {
      spawn('convert', [
          pathbef,
          '-font',
          `./src/font/${font[ran]}.ttf`,
          '-size',
          '960x1280',
          '-pointsize',
          '23',
          '-interline-spacing',
          '3',
          '-annotate',
          '+92+47',
          nama,
          '-annotate',
          '+90+80',
          no,
          '-annotate',
          '+91+113',
          kelas,
          '-annotate',
          '+89+190',
          fixHeight,
          pathres
        ])
        .on('error', (e) => reject(e.message))
        .on('exit', () => {
          resolve(pathres)
        })
    } else if (hit == 2 && kelas == null) {
      spawn('convert', [
          pathbef,
          '-font',
          `./src/font/${font[ran]}.ttf`,
          '-size',
          '960x1280',
          '-pointsize',
          '23',
          '-interline-spacing',
          '3',
          '-annotate',
          '+92+59',
          nama,
          '-annotate',
          '+90+100',
          no,
          '-annotate',
          '+89+190',
          fixHeight,
          pathres
        ])
        .on('error', (e) => reject(e.message))
        .on('exit', () => {
          resolve(pathres)
        })
    } else if (hit == 2 && no == null) {
      spawn('convert', [
          pathbef,
          '-font',
          `./src/font/${font[ran]}.ttf`,
          '-size',
          '960x1280',
          '-pointsize',
          '23',
          '-interline-spacing',
          '3',
          '-annotate',
          '+92+59',
          nama,
          '-annotate',
          '+90+100',
          kelas,
          '-annotate',
          '+89+190',
          fixHeight,
          pathres
        ])
        .on('error', (e) => reject(e.message))
        .on('exit', () => {
          resolve(pathres)
        })
    } else if (hit == 1 && nama != null) {
      spawn('convert', [
          pathbef,
          '-font',
          `./src/font/${font[ran]}.ttf`,
          '-size',
          '960x1280',
          '-pointsize',
          '23',
          '-interline-spacing',
          '3',
          '-annotate',
          '+90+59',
          nama,
          '-annotate',
          '+89+190',
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
          '23',
          '-interline-spacing',
          '3',
          '-annotate',
          '+89+190',
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

const fki = async (text, nama = null, no = null, kelas = null, fon = null) => {
  return new Promise((resolve, reject) => {
    const font = ["IndieFlower-Regular"]
    const ran = Math.floor(Math.random() * font.length)
    const splitText = text.replace(/(\S+\s*){1,13}/g, '$&\n')
    const fixHeight = splitText.split('\n').slice(0, 38).join('\n')
    const pathbef = './src/gambar/nulisfoliosebelumkiri.jpg'
    const pathres = './public/nulisfoliokiri.jpg'

    let hit = 0

    if (nama != null) {
      nama = "Nama: " + nama
      hit++
    }

    if (no != null) {
      no = "No: " + no
      hit++
    }

    if (kelas != null) {
      kelas = "Kelas: " + kelas
      hit++
    }

    if (hit == 3) {
      spawn('convert', [
          pathbef,
          '-font',
          `./src/font/${font[ran]}.ttf`,
          '-size',
          '1720x1280',
          '-pointsize',
          '23',
          '-interline-spacing',
          '4',
          '-annotate',
          '+48+35',
          nama,
          '-annotate',
          '+48+68',
          no,
          '-annotate',
          '+50+102',
          kelas,
          '-annotate',
          '+48+185',
          fixHeight,
          pathres
        ])
        .on('error', (e) => reject(e.message))
        .on('exit', () => {
          resolve(pathres)
        })
    } else if (hit == 2 && kelas == null) {
      spawn('convert', [
          pathbef,
          '-font',
          `./src/font/${font[ran]}.ttf`,
          '-size',
          '1720x1280',
          '-pointsize',
          '23',
          '-interline-spacing',
          '4',
          '-annotate',
          '+48+45',
          nama,
          '-annotate',
          '+49+80',
          no,
          '-annotate',
          '+48+185',
          fixHeight,
          pathres
        ])
        .on('error', (e) => reject(e.message))
        .on('exit', () => {
          resolve(pathres)
        })
    } else if (hit == 2 && no == null) {
      spawn('convert', [
          pathbef,
          '-font',
          `./src/font/${font[ran]}.ttf`,
          '-size',
          '1720x1280',
          '-pointsize',
          '23',
          '-interline-spacing',
          '4',
          '-annotate',
          '+48+45',
          nama,
          '-annotate',
          '+49+80',
          no,
          '-annotate',
          '+48+185',
          fixHeight,
          pathres
        ])
        .on('error', (e) => reject(e.message))
        .on('exit', () => {
          resolve(pathres)
        })
    } else if (hit == 1 && nama != null) {
      spawn('convert', [
          pathbef,
          '-font',
          `./src/font/${font[ran]}.ttf`,
          '-size',
          '1720x1280',
          '-pointsize',
          '23',
          '-interline-spacing',
          '4',
          '-annotate',
          '+48+50',
          nama,
          '-annotate',
          '+48+185',
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
          '1720x1280',
          '-pointsize',
          '23',
          '-interline-spacing',
          '4',
          '-annotate',
          '+48+185',
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

const fkiman = async (text, nama = null, no = null, kelas = null, fon = null) => {
  return new Promise((resolve, reject) => {
    const font = ["IndieFlower-Regular"]
    const ran = Math.floor(Math.random() * font.length)
    // const splitText = text.replace(/(\S+\s*){1,13}/g, '$&\n')
    const fixHeight = text.split('\n').slice(0, 38).join('\n')
    const pathbef = './src/gambar/nulisfoliosebelumkiri.jpg'
    const pathres = './public/nulisfoliokiri.jpg'

    let hit = 0

    if (nama != null) {
      nama = "Nama: " + nama
      hit++
    }

    if (no != null) {
      no = "No: " + no
      hit++
    }

    if (kelas != null) {
      kelas = "Kelas: " + kelas
      hit++
    }

    if (hit == 3) {
      spawn('convert', [
          pathbef,
          '-font',
          `./src/font/${font[ran]}.ttf`,
          '-size',
          '1720x1280',
          '-pointsize',
          '23',
          '-interline-spacing',
          '4',
          '-annotate',
          '+48+35',
          nama,
          '-annotate',
          '+48+68',
          no,
          '-annotate',
          '+50+102',
          kelas,
          '-annotate',
          '+48+185',
          fixHeight,
          pathres
        ])
        .on('error', (e) => reject(e.message))
        .on('exit', () => {
          resolve(pathres)
        })
    } else if (hit == 2 && kelas == null) {
      spawn('convert', [
          pathbef,
          '-font',
          `./src/font/${font[ran]}.ttf`,
          '-size',
          '1720x1280',
          '-pointsize',
          '23',
          '-interline-spacing',
          '4',
          '-annotate',
          '+48+45',
          nama,
          '-annotate',
          '+49+80',
          no,
          '-annotate',
          '+48+185',
          fixHeight,
          pathres
        ])
        .on('error', (e) => reject(e.message))
        .on('exit', () => {
          resolve(pathres)
        })
    } else if (hit == 2 && no == null) {
      spawn('convert', [
          pathbef,
          '-font',
          `./src/font/${font[ran]}.ttf`,
          '-size',
          '1720x1280',
          '-pointsize',
          '23',
          '-interline-spacing',
          '4',
          '-annotate',
          '+48+45',
          nama,
          '-annotate',
          '+49+80',
          no,
          '-annotate',
          '+48+185',
          fixHeight,
          pathres
        ])
        .on('error', (e) => reject(e.message))
        .on('exit', () => {
          resolve(pathres)
        })
    } else if (hit == 1 && nama != null) {
      spawn('convert', [
          pathbef,
          '-font',
          `./src/font/${font[ran]}.ttf`,
          '-size',
          '1720x1280',
          '-pointsize',
          '23',
          '-interline-spacing',
          '4',
          '-annotate',
          '+48+50',
          nama,
          '-annotate',
          '+48+185',
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
          '1720x1280',
          '-pointsize',
          '23',
          '-interline-spacing',
          '4',
          '-annotate',
          '+48+185',
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