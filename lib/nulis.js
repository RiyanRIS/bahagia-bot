const {
  spawn
} = require('child_process')

const randomname = new Date().getTime()
const font = ['IndieFlower-Regular', 'Caveat-VariableFont_wght', 'ComingSoon-Regular', 'TheGirlNextDoor-Regular', 'WaitingfortheSunrise-Regular', 'Zahraaa']

module.exports.nulis = (args, jennn) => {
  return new Promise((resolve, reject) => {
    let nama = "",
      kelas = "",
      no = "",
      txt = "",
      fon = "",
      kertas = "",
      isParam = false,
      hit = 0,
      manual = false

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
      // reject(msg.tanpatext)
      // return
      txt = args.join(" ")
    }

    fon = parseInt(fon)
    kertas = parseInt(kertas)

    if (kertas == NaN) {
      kertas = 0
    }

    if (fon == NaN) {
      fon = 0
    }

    if (!manual) {
      // ATUR JUMLAH KATA DALAM SATU BARIS
      if(3 >= kertas){ // JIKA KERTAS BUKU, 11 KATA
        txt = txt.replace(/(\S+\s*){1,11}/g, '$&\n')
      } else if(5 >= kertas){ // JIKA KERTAS FOLIO, 14 KATA
        txt = txt.replace(/(\S+\s*){1,14}/g, '$&\n')
      }
    }

    if(jennn == "bukukiri"){
      kertas = 3
    } else if(jennn == "fka"){
      kertas = 4
    } else if(jennn == "fki"){
      kertas = 5
    }

    if (kertas == 0) {
      prosesbukkan0(hit, fon, nama, no, kelas, txt).then((res) => resolve(res)).catch((e) => reject(e))
    } else if (kertas == 1) {
      prosesbukkan1(hit, fon, nama, no, kelas, txt).then((res) => resolve(res)).catch((e) => reject(e))
    } else if (kertas == 2) {
      // reject({message: "Maaf fitur ini sedang dalam pengembangan. Gunakan versi yang lain.."})
      prosesbukkan2(hit, fon, nama, no, kelas, txt).then((res) => resolve(res)).catch((e) => reject(e))
    } else if (kertas == 3) {
      prosesbukkir3(hit, fon, nama, no, kelas, txt).then((res) => resolve(res)).catch((e) => reject(e))
    } else if (kertas == 4) {
      prosesfolkan4(hit, fon, nama, no, kelas, txt).then((res) => resolve(res)).catch((e) => reject(e))
    } else if (kertas == 5) {
      prosesfolkir5(hit, fon, nama, no, kelas, txt).then((res) => resolve(res)).catch((e) => reject(e))
    }
  })
}

const prosesbukkan0 = (hit, fon, nama, no, kelas, txt) => {
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
    } else if (fon == 5) {
      pointer = '21'
      space = '5'
    } else {
      fon = 0
      pointer = '20'
      space = '7.2'
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

const prosesbukkan1 = (hit, fon, nama, no, kelas, txt) => {
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
    } else if (fon == 5) {
      pointer = '28'
      space = '10.5'
    } else {
      fon = 0
      pointer = '28'
      space = '11'
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

const prosesbukkan2 = (hit, fon, nama, no, kelas, txt) => {
  return new Promise((resolve, reject) => {
    let pointer, space
    const pathbef = './src/gambar/magernulis1.jpg'
    const pathres = `./public/${randomname}.jpg`
    const teks = txt.split('\n').slice(0, 28).join('\n')

    if (fon == 0) {
      pointer = '15'
      space = '0'
    } else if (fon == 1) {
      pointer = '18'
      space = '-1'
    } else if (fon == 2) {
      pointer = '13'
      space = '2'
    } else if (fon == 3) {
      pointer = '14'
      space = '-4'
    } else if (fon == 4) {
      pointer = '15'
      space = '-3'
    } else if (fon == 5) {
      pointer = '15'
      space = '4'
    } else {
      fon = 0
      pointer = '15'
      space = '0'
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
          '+345+56',
          nama,
          '-annotate',
          '+345+78',
          no,
          '-annotate',
          '+344+100',
          kelas,
          '-annotate',
          '+347+142',
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
        '+345+60',
        nama,
        '-annotate',
        '+345+85',
        no,
        '-annotate',
        '+347+142',
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
        '+345+60',
        nama,
        '-annotate',
        '+345+85',
        kelas,
        '-annotate',
        '+347+142',
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
        '+345+64',
        nama,
        '-annotate',
        '+347+142',
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
        '+347+142',
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

const prosesbukkir3 = (hit, fon, nama, no, kelas, txt) => {
  return new Promise((resolve, reject) => {
    let pointer, space
    const pathbef = './src/gambar/nulisbukusebelumkiri.jpg'
    const pathres = `./public/${randomname}.jpg`
    const teks = txt.split('\n').slice(0, 31).join('\n')

    if (fon == 0) {
      pointer = '20'
      space = '5'
    } else if (fon == 1) {
      pointer = '25'
      space = '3.45'
    } else if (fon == 2) {
      pointer = '18'
      space = '7.3'
    } else if (fon == 3) {
      pointer = '18'
      space = '0'
    } else if (fon == 4) {
      pointer = '22'
      space = '-2'
    } else if (fon == 5) {
      pointer = '20'
      space = '5'
    } else {
      fon = 0
      pointer = '20'
      space = '5'
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
          '+160+40',
          nama,
          '-annotate',
          '+160+64',
          no,
          '-annotate',
          '+160+89',
          kelas,
          '-annotate',
          '+140+153',
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
          '+160+55',
          nama,
          '-annotate',
          '+160+80',
          no,
          '-annotate',
          '+140+153',
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
          '+160+55',
          nama,
          '-annotate',
          '+160+80',
          kelas,
          '-annotate',
          '+140+153',
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
          '+160+60',
          nama,
          '-annotate',
          '+140+153',
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
          '+140+153',
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

const prosesfolkan4 = (hit, fon, nama, no, kelas, txt) => {
  return new Promise((resolve, reject) => {
    let pointer, space
    const pathbef = './src/gambar/nulisfoliosebelumkanan.jpg'
    const pathres = `./public/${randomname}.jpg`
    const teks = txt.split('\n').slice(0, 38).join('\n')

    if (fon == 0) {
      pointer = '23'
      space = '3'
    } else if (fon == 1) {
      pointer = '28'
      space = '2,5'
    } else if (fon == 2) {
      pointer = '22'
      space = '4'
    } else if (fon == 3) {
      pointer = '22'
      space = '-4'
    } else if (fon == 4) {
      pointer = '25'
      space = '-4'
    } else if (fon == 5) {
      pointer = '23'
      space = '3'
    } else {
      fon = 0
      pointer = '23'
      space = '3'
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
          '+90+47',
          nama,
          '-annotate',
          '+91+80',
          no,
          '-annotate',
          '+90+113',
          kelas,
          '-annotate',
          '+89+193',
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
        '+90+50',
        nama,
        '-annotate',
        '+91+85',
        no,
        '-annotate',
        '+89+193',
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
        '+90+50',
        nama,
        '-annotate',
        '+91+85',
        kelas,
        '-annotate',
        '+89+193',
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
        '+90+55',
        nama,
        '-annotate',
        '+89+193',
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
        '+89+193',
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

const prosesfolkir5 = (hit, fon, nama, no, kelas, txt) => {
  return new Promise((resolve, reject) => {
    let pointer, space
    const pathbef = './src/gambar/nulisfoliosebelumkiri.jpg'
    const pathres = `./public/${randomname}.jpg`
    const teks = txt.split('\n').slice(0, 38).join('\n')

    if (fon == 0) {
      pointer = '23'
      space = '4'
    } else if (fon == 1) {
      pointer = '28'
      space = '3'
    } else if (fon == 2) {
      pointer = '21'
      space = '6'
    } else if (fon == 3) {
      pointer = '21'
      space = '-1'
    } else if (fon == 4) {
      pointer = '25'
      space = '-3'
    } else if (fon == 5) {
      pointer = '23'
      space = '4'
    } else {
      fon = 0
      pointer = '23'
      space = '4'
    }

    if (hit == 3) {
      spawn('convert', [
        pathbef,
        '-font',
        `./src/font/${font[fon]}.ttf`,
        '-size',
        '1720x1280',
        '-pointsize',
        pointer,
        '-interline-spacing',
        space,
        '-annotate',
        '+48+38',
        nama,
        '-annotate',
        '+48+70',
        no,
        '-annotate',
        '+50+105',
        kelas,
        '-annotate',
        '+48+185',
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
        '+90+50',
        nama,
        '-annotate',
        '+91+85',
        no,
        '-annotate',
        '+89+193',
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
        '+90+50',
        nama,
        '-annotate',
        '+91+85',
        kelas,
        '-annotate',
        '+89+193',
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
        '+90+55',
        nama,
        '-annotate',
        '+89+193',
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
        '+89+193',
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