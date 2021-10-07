const axios = require("axios")

module.exports.getGroupAdmins = (participants) => {
  admins = []
  for (let i of participants) {
    i.isAdmin ? admins.push(i.jid) : ''
  }
  return admins
}

module.exports.helpBiasa = (prefix) => {
  return `
🎀 *Bahagia-Bot* 🎀
_By: RiyanRIS_

*STICKER BUILDER*
    _Membuat Sticker dari foto/video_
    _Gunakan pack untuk package name_
    _Gunakan auth untuk author name_
    _Gunakan crop untuk mengubah ukuran menjadi kotak_
    _Package dan author bersifat opsional_
    _Max. panjang durasi video adalah 11 second_

    *List Perintah: *
        *${prefix}st*
        *${prefix}st pack <pack_name> auth <author_name>*
        *${prefix}st crop*

*DOWNLOADER*
    _Download media, video, audio atau photo dari YouTube, Instagram, Twitter atau yang lainya._

    *List Perintah:*
        *${prefix}yt <Link-YT>*   
        *${prefix}ig <Link-IG>*     
        *${prefix}igs <Link-IG>*     
        *${prefix}tw <Link-TW>*        
        *${prefix}tt <Link-Tiktok>*         

*ARTIFICIAL INTELLIGENCE (AI)*

    *${prefix}ocr*
        _Optical Character Recognition (OCR)_
        _Mengekstrak texs dari gambar_

    *${prefix}rmbg*
        _Remove Image Background_

    *${prefix}qr <Teks>*
        _Menggenerate QR-Code dari text/link_

    *${prefix}qrr*
        _Mendecode QR-Code menjadi text_

    *${prefix}tts <Teks>*
        _Prosa Text-to-Speech_
        _Sintesis suara alami dari teks secara instan dalam Bahasa Indonesia_

    *${prefix}colorize*
    *${prefix}col*
        _Mewarnai foto hitam putih menggunakan AI_

    *${prefix}img2hd*
        _Mengubah gambar kualitas rendah menjadi HD_

    *${prefix}img2toon*
        _Membuat foto menjadi mode kartun_
    
*GAMES*
    _Tulis *skip* untuk keluar dari game_

    *${prefix}tg*
    *${prefix}tebakgambar*
        _Game Tebak Gambar_

    *${prefix}tp*
    *${prefix}tebakpribahasa*
        _Game Tebak Peribahasa_

*NULIS*
    _Membantu menuliskan text pada sebuah kertas_

    *Atribut Yang Tersedia*
    -t = Text yang akan ditulis (Wajib)
    -nama = Nama Lengkap (Opsional)
    -no = Nomor Absen (Opsional)
    -kls = Kelas (Opsional)

    _Contoh Penggunaan:_
    *${prefix}bka -nama Riyan Risky W S -no 32 -t Ini adalah kalimat yang akan ditulis oleh BOT.*

    *List Perintah:*
        *${prefix}bka*
        *${prefix}bukukanan*
            _Menulis dengan media Buku sebelah Kanan_

        *${prefix}bka1*
        *${prefix}bukukanan1*
            _Alternatif jika yang satunya error_

        *${prefix}bki*
        *${prefix}bukukiri*
            _Menulis dengan media Buku sebelah Kiri_

        *${prefix}fka* _<! BELUM TERSEDIA>_
        *${prefix}foliokanan*
            _Menulis dengan media Folio sebelah Kanan_

        *${prefix}fki* _<! BELUM TERSEDIA>_
        *${prefix}foliokiri*
            _Menulis dengan media Folio sebelah Kiri_

*AUDIO MANIPULATION*

    *${prefix}aurobot*
        _Suara kek robot_
    
    *${prefix}aubass*
        _Suara bassnya jadi kerasa_
    
    *${prefix}aublown*
        _Suara jadi lembut_
    
    *${prefix}audeep*
        _Suara jadi dalem banget_

    *${prefix}ausmooth*
        _Suara jadi alus bet aluss_
    
    *${prefix}aufast*
        _Suara jadi cepet_

    *${prefix}auslow*
        _Suara jadi lambaaatt_
    
    *${prefix}aufat*
        _Suara jadi gendut_

    *${prefix}aureverse*
        _Suara jadi kebalik_

    *${prefix}aunc*
        _Efek nightcore_

    *${prefix}autupai*
        _Efek kek tupai_

*MEME MAKER*

    *${prefix}cmm <Text>*
        _Membuat meme Change My Mind_

    *${prefix}htt <Text>*
        _Harta Tahta {Text-Kamu}_

    *${prefix}trump <Text>*
        _Membuat meme Trump Tweets_

*GENERATE GAMBAR KEREN*
    _Cobain aja satu-satu_

    *List Perintah: *
        *${prefix}textdaun <Text>*
        *${prefix}text2daun <Text>*
        *${prefix}textmatrix <Text>*
        *${prefix}textpetir <Text>*
        *${prefix}textgradient <Text>*
        *${prefix}textglow <Text>*
        *${prefix}textneon <Text>*
        *${prefix}text2neon <Text>*
        *${prefix}textcoklat <Text>*
        *${prefix}text2coklat <Text>*
        *${prefix}texthbd <Text>*
        *${prefix}textsnow <Text>*
        *${prefix}textsky <Text>*
        *${prefix}textsand <Text>*
        *${prefix}textpencil <Text>*
        *${prefix}textballoon <Text>*
        *${prefix}text2graf <Text>*
        *${prefix}text2fire <Text>*
        *${prefix}text2space <Text>*
        *${prefix}textgold <Text>*
        *${prefix}textangel <Text>*
        *${prefix}textbp <Text>*
        *${prefix}text2bp <Text>*
        *${prefix}text3bp <Text>*
        *${prefix}textabear <Text>*
        *${prefix}textsad <Text>*
        *${prefix}textpubg <Text>*
        *${prefix}text2pubg <Text>*
        *${prefix}text3pubg <Text>*
        *${prefix}carbon <Teks>*

    _Yang ini gunakan 2 text_
    _Pisahkan antar text menggunakan *';'*_
    _Semisal: *${prefix}textlove Surti;Tejo*_

        *${prefix}textlove <Nama1>;<Nama2>*
        *${prefix}text2love <Nama1>;<Nama2>*
        *${prefix}textpornhub <Kata1>;<Kata2>*
        *${prefix}texttiktok <Kata1>;<Kata2>*
        *${prefix}textavenger <Kata1>;<Kata2>*
        *${prefix}textgraf <Kata1>;<Kata2>*


    _Yang ini harus melampirkan gambar dan pastikan objek ada ditengah, biar pas._
        
        *${prefix}textkabut*
        *${prefix}textkucing*
        *${prefix}textpaper*
    
*LAIN-LAIN..*

    *${prefix}kbbi <Kata>*
        _Kamus Besar Bahasa Indonesia_

    *${prefix}kbj <Kata>*
        _Kamus Bahasa Jawa_

    *${prefix}aksara <Teks>*
        _Ubah teks kedalam Aksara Jawa_

    *${prefix}pln <ID-PEL>*
        _Cek tagihan listrik pascabayar_

    *${prefix}sms <NO-TELP>*
        _Bomb SMS, gunakan format 87755xxx_
        _Misal nomor target 089677249020_
        _Maka tulis_ *${prefix}sms 89677249020*

    *${prefix}kontak <NoHP>*
        _Membuat Kartu Kontak_

    *${prefix}bucin <Nama>*
        _Membuat Web Bucin_
        _Kirim ke Pacarmu biar terkagum-kagum_

    *${prefix}katacinta*
        _Kata cinta random_

    *${prefix}katamotivasi*
        _Kata motivasi random_

    *${prefix}faktaunik*
        _Fakta unik random_

🛡 _Semua data yang kamu kirim, nggak kami simpen kok, dijamin aman deh_\n
🛠 _Request fitur atau ada masalah pada bot ini, hubungi Developer_`
}

module.exports.adminHelp = (prefix) => {
  return `
  🎀 *Bahagia-Bot* 🎀

*${prefix}add <nomor hp>*
    _Tambah member kedalam group!_

*${prefix}kick <@mention-user>*
    _Kick out member!_
    _Bisa juga menggunakan ${prefix}remove, ${prefix}ban_

*${prefix}promote <@mention-user>*
    _Mempromosikan user menjadi admin group!_

*${prefix}demote <@mention-user>*
    _Menurunkan user dari admin group!_

*${prefix}rename <nama-baru>*
    _Mengubah nama group!_

*${prefix}chat <on/off>*
    _Enable/disable group_
    _/chat on - semua bisa ngirim pesan!_
    _/chat off - hanya admin yang ngirim pesan!_

*${prefix}link*
    _Memunculkan link undangan group!_
    _Perintah lain: ${prefix}getlink, ${prefix}grouplink_

*${prefix}sticker*
    _Membuat stiker!_
    *Parameter:*
        _crop_ - Memperkecil ukuran stiker!
        _author_ - Memberi metadata author pada stiker!
        _pack_ - Memberi metadata pack pada stiker!
        _nometadata_ - Menghapus semua metadata pada stiker!
    *Examples:*
        _${prefix}sticker pack bahagia-bot author riyanris_
        _${prefix}sticker crop_
        _${prefix}sticker nometadata_

*${prefix}removebot*
    _Mengeluarkan bot dari group!_`
}

module.exports.getRandom = (ext) => {
  return `${Math.floor(Math.random() * 1000000)}${ext}`
}

module.exports.randomString = (length) => {
  let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyzsadw'
  let str = '';
  lengt = length || 9
  for (let i = 0; i < length; i++) {
    str += chars[Math.floor(Math.random() * 65)];
  }
  return str
}

module.exports.shortlink = async (url) => {
  const getdt = await axios.get(`https://tinyurl.com/api-create.php?url=${url}`)
  return getdt.data
}

module.exports.formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

module.exports.getBuffer = async (url, options) => {
	try {
		options ? options : {}
		const res = await axios({
			method: "get",
			url,
			headers: {
				'DNT': 1,
				'Upgrade-Insecure-Request': 1
			},
			...options,
			responseType: 'arraybuffer'
		})
		return res.data
	} catch (e) {
		console.log(`Error : ${e}`)
	}
}

module.exports.isUrl = (url) => {
  return url.match(
    new RegExp(
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%.+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&/=]*)/,
      "gi"
    )
  )
}

module.exports.fetchJson = (url, options) => new Promise(async (resolve, reject) => {
  axios.get(url,)
      .then(({data}) => {
        resolve(data)
      })
      .catch((err) => {
          reject(err)
      })
})

module.exports.contains = (target, pattern) => {
    var value = 0;
    pattern.forEach(function (word) {
        if (target.includes(word)) {
        value++
        }
    });
    return value
}
