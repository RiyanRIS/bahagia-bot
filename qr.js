const { WAConnection } = require('@adiwajshing/baileys')
const fs = require("fs")

async function connectToWhatsApp () {

    const conn = new WAConnection() 
    conn.version = [3, 3234, 9];
    conn.on ('open', () => {
      console.log (`credentials updated!`)
      const authInfo = conn.base64EncodedAuthInfo() // get all the auth info we need to restore this session
      fs.writeFileSync('./auth_info.json', JSON.stringify(authInfo, null, '\t')) // save this info to a file
    })

    await conn.connect ()
}

connectToWhatsApp ()
.catch (err => console.log("unexpected error: " + err) )