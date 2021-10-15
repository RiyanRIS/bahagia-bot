const moment = require("moment-timezone")
const firebase = require('./db_firabase')

const firestore = firebase.firestore()

module.exports.add = async (from, msg) => {
  const users = firestore.collection('apiwa/v1/users/'+from+'/chat')

  let time = moment.tz("Asia/Jakarta").format("YYYYMMDDHHmmss")

  let data = await users.doc(time).get()
  if(!data.exists) {
    let dataawal = {
      msg: msg
    }
    await users.doc(time).set(dataawal);
  } else {
    let datanew = {
      msg: msg
    }
    await users.doc(time).set(datanew)
  }
}

module.exports.addtoday = async () => {
  const tanggal = moment.tz("Asia/Jakarta").format("YYYYMMDD")
  const hittotal = firestore.collection('apiwa/v1/hit')
  let datatoday = await hittotal.doc(tanggal).get()
  if(!datatoday.exists) {
    let data = {
      val: 1
    }
    await hittotal.doc(tanggal).set(data);
  } else {
    let totalnew = {
      val: datatoday.data().val + 1
    }
    await hittotal.doc(tanggal).update(totalnew)
  }
}