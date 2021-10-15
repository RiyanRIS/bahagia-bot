const moment = require("moment-timezone")
const firebase = require('./db_firabase')

const firestore = firebase.firestore()
const users = firestore.collection('apiwa/v1/users')

module.exports.add = async (from, msg) => {
  let data = await users.doc(from).get()
  if(!data.exists) {
    let dataawal = {
      msg: msg
    }
    await data.doc(tanggal).set(dataawal);
  } else {
    let datanew = {
      msg: msg
    }
    await data.doc(from).update(datanew)
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