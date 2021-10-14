const fun = require("./helpers/function")
const dl = require("./helpers/downloader")
const {ttdl} = require("./lib/ttdl")
const {pengumum} = require("./lib/game")
const axios = require("axios")
const cheerio = require("cheerio")
const FormData = require("form-data")
const FileType = require('file-type')
const got = require('got')
const fs = require("fs")
const qs = require("qs")
const request = require("request")
const {spawn} = require('child_process');
const {exec} = require('child_process');
const hit = require('./database/hit')

hit.addtoday().catch((e) => console.log(e))