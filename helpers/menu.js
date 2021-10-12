const menu = {
  header: `🎀 *Bahagia-Bot* 🎀
_By: RiyanRIS_`,
  footer: `_Bantu Donasi: 085156929375 (OVO)_
_Kami akan sangat-sangat terbantu dengan donasi anda, berapapun nominalnya_`
}

module.exports.mmenu = (prefix) => {
  return `${menu.header}

*「INFO BOT」*
        *_NamaBot : Bot Bahagia_*
        *_NomorBot : https://s.id/botbahagia_*
        *_Instagram : https://s.id/botbahagia-ig_*
        *_YouTube : https://s.id/botbahagia-yt_*
        *_Owner : wa.me/6285156929375_*

*「MENU PERINTAH」*
        *${prefix}help stiker*
        *${prefix}help nulis*
        *${prefix}help downloader*
        *${prefix}help maker*
        *${prefix}help deepai*
        *${prefix}help games*
        *${prefix}help foto*
        *${prefix}help audio*
        *${prefix}help other*

_Tutorial?? Ada di masing-masing menu, atau cek Sosial Media Kami_

_Jika kamu masih bingung cara memakai bot ini, hubungi owner_
_Pesan diluar perintah/command, akan auto dibalas oleh Sim-Simi_

${menu.footer}`
}

module.exports.mnulis = (prefix) => {
  return `${menu.header}
  
*FITUR NULIS*
_Membantu menuliskan text pada sebuah kertas_
_Ada 2 mode, mode baris auto dan baris manual_
_Ada 2 jenis kertas, jenis kertas buku dan kertas folio_
_Masing-masing memiliki bagian kiri dan kanan_
_Cek Instagram atau YouTube untuk melihat tutorial_

*Atribut Yang Tersedia*
    -t = Text yang akan ditulis (Wajib)
    -nama = Nama Lengkap (Opsional)
    -no = Nomor Absen (Opsional)
    -kls = Kelas (Opsional)
    -man = Manual Baris (Opsional)
    -f = Jenis Font [0-4] (Opsional)
    -ker = Kertas [0-6] (Opsional)

_Contoh Perintah:_'
    ${prefix}bka -t Ini adalah kalimat yang akan ditulis oleh BOT.
    ${prefix}bki -nama Riyan Risky W S -no 32 -kls XI MIPA 2 -t Ini adalah kalimat yang akan ditulis oleh BOT.

*List Perintah:*
    *${prefix}bka*
    *${prefix}bukukanan*
        _Menulis dengan media Buku sebelah Kanan_

    *${prefix}bka1*
    *${prefix}bukukanan1*
        _Alternatif jika yang satunya error(Font dan Kertas juga berbeda)_

    *${prefix}bki*
    *${prefix}bukukiri*
        _Menulis dengan media Buku sebelah Kiri_
        
    *${prefix}bkaman*
    *${prefix}bukukananmanual*
        _Menulis dengan media Buku sebelah Kanan Secara Manual_

    *${prefix}bkiman*
    *${prefix}bukukirimanual*
        _Menulis dengan media Buku sebelah Kiri Secara Manual_

    *${prefix}fka*
    *${prefix}foliokanan*
        _Menulis dengan media Folio sebelah Kanan_

    *${prefix}fki*
    *${prefix}foliokiri*
        _Menulis dengan media Folio sebelah Kiri_

    *${prefix}fkaman*
    *${prefix}foliokananmanual*
        _Menulis dengan media Folio sebelah Kanan Secara Manual_

    *${prefix}fkiman*
    *${prefix}foliokirimanual*
        _Menulis dengan media Folio sebelah Kiri Secara Manual_
        
${menu.footer}`
}

module.exports.mstiker = (prefix) => {
  return `${menu.header}
  
*FITUR STICKER BUILDER*
_Membuat Sticker dari foto/video_
_Kirimkan foto/tag foto dengan caption ${prefix}st_
_Max. durasi video adalah 11 second_

*Atribut Yang Tersedia*
    pack = Package Name
    auth = Author Name

_Contoh Perintah:_
    ${prefix}st pack bahagia-bot auth riyanris

*List Perintah: *
    *${prefix}st*
    *${prefix}st pack <pack_name> auth <author_name>*
    *${prefix}st crop*
        
${menu.footer}`
}

module.exports.mdownloader = (prefix) => {
  return `${menu.header}

*FITUR DOWNLOADER*
_Download media, video, audio atau photo dari YouTube, Instagram, Twitter atau yang lainya._

_Contoh Perintah:_
    ${prefix}yt https://youtu.be/ojNRfGNw18U

*List Perintah:*
    *${prefix}yt <Link-YouTube>*
    *${prefix}ig <Link-Instagram>*
    *${prefix}igs <Link-Instagram-Story>*
    *${prefix}tw <Link-Twitter>*
    *${prefix}tt <Link-Tiktok>*

*FAQ:*
    Q: Kok Marker Not Found Mulu?
    A: Kirim ulang aja, karena bot lagi rame itu.
        
${menu.footer}`
}

module.exports.mmaker = (prefix) => {
  return `${menu.header}

*FITUR MEME MAKER*
_Membutuhkan satu argumen teks_

_Contoh Perintah:_
    ${prefix}memechangemymind wanita adalah objek paling rumit setelah otak manusia

*List Perintah:*
    *${prefix}memechangemymind <Text>*
    *${prefix}memehartatahta <Text>*
    *${prefix}memetrump <Text>*
    *${prefix}memeskeleton <Text>*

_Membutuhkan dua/lebih argumen teks_
_Pisahkan antar text dengan_ *;*

_Contoh Perintah:_
    ${prefix}memedrake Matematika;Olah raga

*List Perintah:*
    *${prefix}memedrake <Text1>;<Text2>*
    *${prefix}memetwobutton <Text1>;<Text2>*
    *${prefix}memeslapping <Text1>;<Text2>*
    *${prefix}memedistrack <Text1>;<Text2>;<Text3>*
    *${prefix}memesadpablo <Text1>;<Text2>;<Text3>*
    *${prefix}memebaloon <Text1>;<Text2>;<Text3>;<Text4>;<Text5>*

*FAQ:*
    Q: Kok Marker Not Found Mulu?
    A: Kirim ulang aja, karena bot lagi rame itu.

${menu.footer}`
}

module.exports.mdeepai = (prefix) => {
  return `${menu.header}
  
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
    _Mewarnai foto hitam putih menggunakan Machine Learning_

*${prefix}img2hd*
    _Mengubah gambar kualitas rendah menjadi HD_

*${prefix}img2toon*
    _Membuat foto menjadi mode kartun_
        
${menu.footer}`
}

module.exports.mgames = (prefix) => {
  return `${menu.header}
  
*GAMES*
_Tulis *skip* untuk keluar dari game_

*${prefix}tg*
*${prefix}tebakgambar*
    _Game Tebak Gambar_

*${prefix}tp*
*${prefix}tebakpribahasa*
    _Game Tebak Peribahasa_
        
${menu.footer}`
}

module.exports.mfoto = (prefix) => {
  return `${menu.header}
  
*GENERATE GAMBAR KEREN*
_Cobain aja satu-satu_

_Contoh Perintah:_
    ${prefix}textdaun Riyan Risky W S

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
    *${prefix}textcarbon <Teks>*

_Yang ini gunakan 2 text_
_Pisahkan antar text menggunakan *';'*_
_Semisal:_ ${prefix}textlove Surti;Tejo

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
        
${menu.footer}`
}

module.exports.maudio = (prefix) => {
  return `${menu.header}
  
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
        
${menu.footer}`
}

module.exports.mother = (prefix) => {
  return `${menu.header}

*FITUR LAIN-LAIN*

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
  _Maka tulis:_ ${prefix}sms 89677249020

*${prefix}kontak <NoHP>,<Nama>*
  _Membuat Kartu Kontak_
  _Jadi kamu ga perlu save nomor kalau mau chat_
  _Contoh:_ ${prefix}kontak 085156929375,Owner Bot Bahagia

*${prefix}bucin <Nama>*
  _Membuat Web Bucin_
  _Kirim linknya ke Pacarmu biar terkagum-kagum_
  _Contoh:_ ${prefix}bucin Ayunda

*${prefix}katacinta*
  _Kata cinta random_

*${prefix}katamotivasi*
  _Kata motivasi random_

*${prefix}faktaunik*
  _Fakta unik random_
        
${menu.footer}`
}