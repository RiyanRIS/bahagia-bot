const moment = require("moment-timezone");
const time = moment.tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss")
console.log(time)