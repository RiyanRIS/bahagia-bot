const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs')
const path = require('path')

module.exports.removebg = async(inputPath) => {
  return new Promise((resolve, reject) => {
    const formData = new FormData()

    formData.append('size', 'auto')
    formData.append('image_file', fs.createReadStream(inputPath), path.basename(inputPath))

    axios({
      method: 'post',
      url: 'https://api.remove.bg/v1.0/removebg',
      data: formData,
      responseType: 'arraybuffer',
      headers: {
        ...formData.getHeaders(),
        'X-Api-Key': 'w9KCHyFdxwdgDRY8W51yyZnL',
      },
      encoding: null
    })
    .then((response) => {
      if(response.status != 200){
        reject('Error:', response.status, response.statusText)
      } else{
        // fs.writeFileSync("no-bg.png", response.data)
        resolve(response.data)
      }
    })
    .catch((error) => {
      reject(error.message)
        // return console.error('Request failed:', error);
    });
  })
}
