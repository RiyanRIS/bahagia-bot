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

*${prefix}yts <Link-YT>*
    _Download lagu dari YouTube(HD Audio)_

*${prefix}yt <Link-YT>*
    _Download video dari YouTube(HD Video)_

*${prefix}igdl <Link-IG>*
    _Download video dari Instagram_
    _jika menggunakan igdl tidak berhasil, gunakan perintah *igdl1*_

*${prefix}twdl <Link-TW>*
    _Twitter Video Downloader_
    _jika menggunakan twdl tidak berhasil, gunakan perintah *twdl1*_

*${prefix}ttdl <Link-Tiktok>*
    _Tiktok Video Downloader_
    _jika menggunakan ttdl tidak berhasil, gunakan perintah *ttdl1*_

*${prefix}ocr*
    _Mengubah gambar menjadi teks_
    _Kirim gambar dan beri ${prefix}ocr_

*${prefix}carbon <Teks>*
    _Mengubah teks menjadi gambar keren_

*${prefix}qr <Teks>*
    _Membuat QR kode dari text tertentu_

*${prefix}qrr*
    _Membaca hasil QR kode dari gambar_

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

module.exports.getBuffer = async (url, opts) => {
  try {
    const reqdata = await axios({
      method: "get",
      url,
      headers: {
        'DNT': 1,
        'Upgrade-Insecure-Requests': 1,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36'
      },
      ...opts,
      responseType: 'arraybuffer'
    });
    return reqdata.data
  } catch (e) {
    throw e
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