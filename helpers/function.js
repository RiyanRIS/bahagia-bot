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

*${prefix}sticker*
    _Membuat Sticker dari foto/video_

*${prefix}ytmp3 <Link-YT>*
    _Download lagu dari YouTube_

*${prefix}ytmp4 <Link-YT>*
    _Download video dari YouTube_

*${prefix}igdl <Link-IG>*
    _Download video dari Instagram_

*${prefix}twdl <Link-TW>*
    _Twitter Video Downloader_

*${prefix}ttdl <Link-Tiktok>*
    _Tiktok Video Downloader_

*${prefix}ocr*
    _Mengubah gambar menjadi teks_
    *_Jangan lupa lampirin gambar yang ingin di scan_

*${prefix}carbon <Teks>*
    _Mengubah teks menjadi gambar keren_

*${prefix}qr <Teks>*
    _Membuat QR kode dari text/link tertentu_

*${prefix}qrr*
    _Membaca hasil QR kode dari gambar_
    *_Jangan lupa lampirin gambar yang ingin di scan_

*${prefix}rmbg*
    _Menghapus background foto_
    *_Jangan lupa lampirin gambar yang ingin di hapus backgroudnya_

*${prefix}pln <ID-PEL>*
    _Cek tagihan listrik pascabayar_

*${prefix}sms <NO-TELP>*
    _Bomb SMS, gunakan format 87755xxx_
    _Misal nomor target 089677249020_
    _Maka tulis_ *${prefix}sms 89677249020*

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
