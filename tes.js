// const got = require('got');
// const FileType = require('file-type');

// const url = 'https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg';

// (async () => {
// 	const stream = got.stream(url);

// 	console.log(await FileType.fromStream(stream));
// 	//=> {ext: 'jpg', mime: 'image/jpeg'}
// })();

// const axios = require("axios")
// const cheerio = require("cheerio")
// const fs = require("fs")

// const tebakgambar = async () => {
// 	await axios.get('https://jawabantebakgambar.net/all-answers/')
// 		.then(({ data }) => {
// 			const $ = cheerio.load(data)
// 			const result = [];
// 			let random = Math.floor(Math.random() * 2836) + 2;
// 			let link2 = 'https://jawabantebakgambar.net'
// 			for (let index = 2; index < 2836; index++) {
// 				$(`#images > li:nth-child(${index}) > a`)
// 					.each(function(a, b) {
// 						const img = link2 + $(b).find('img').attr('data-src')
// 						const jwb = $(b).find('img').attr('alt')
// 						let data = {
// 							image: img,
// 							jawaban: jwb
// 						}
// 						if(index < 500){
// 							let tebakgambarbaru = JSON.parse(fs.readFileSync("./tebakgambar/1.json"))
// 							tebakgambarbaru.push(data)
// 							fs.writeFileSync("./tebakgambar/1.json",JSON.stringify(tebakgambarbaru))
// 						} else if(index < 1000){
// 							let tebakgambarbaru = JSON.parse(fs.readFileSync("./tebakgambar/2.json"))
// 							tebakgambarbaru.push(data)
// 							fs.writeFileSync("./tebakgambar/2.json",JSON.stringify(tebakgambarbaru))
// 						} else if(index < 1500){
// 							let tebakgambarbaru = JSON.parse(fs.readFileSync("./tebakgambar/3.json"))
// 							tebakgambarbaru.push(data)
// 							fs.writeFileSync("./tebakgambar/3.json",JSON.stringify(tebakgambarbaru))
// 						} else if(index < 2000){
// 							let tebakgambarbaru = JSON.parse(fs.readFileSync("./tebakgambar/4.json"))
// 							tebakgambarbaru.push(data)
// 							fs.writeFileSync("./tebakgambar/4.json",JSON.stringify(tebakgambarbaru))
// 						} else {
// 							let tebakgambarbaru = JSON.parse(fs.readFileSync("./tebakgambar/5.json"))
// 							tebakgambarbaru.push(data)
// 							fs.writeFileSync("./tebakgambar/5.json",JSON.stringify(tebakgambarbaru))
// 						}
						
// 				})
// 			}
// 		})
// 		.catch((e) => {
// 			console.error(e)
// 		})
// }

// tebakgambar()

// const fs = require("fs")

// let datanya = JSON.parse(fs.readFileSync("./tebakgambar/5.json"))
// let datanya6 = JSON.parse(fs.readFileSync("./tebakgambar/6.json"))

// for (let index = 1; index < 797; index++) {
// 	let data = {
// 		image: datanya[index].image,
// 		jawaban: datanya[index].jawaban
// 	}
// 	if(index < 500){
// 		let tebakgambarbaru = JSON.parse(fs.readFileSync("./tebakgambar/5.json"))
// 		tebakgambarbaru.push(data)
// 		fs.writeFileSync("./tebakgambar/5.json",JSON.stringify(tebakgambarbaru))
// 	} else if(index < 1000){
// 		let tebakgambarbaru = JSON.parse(fs.readFileSync("./tebakgambar/6.json"))
// 		tebakgambarbaru.push(data)
// 		fs.writeFileSync("./tebakgambar/6.json",JSON.stringify(tebakgambarbaru))
// 	}
// }
