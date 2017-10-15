import fs from 'fs'

export default function () {
  let puppeteerConfig = {}
  if (fs.existsSync('./puppeteer.config.json')) {
    puppeteerConfig = require(__dirname + '/../../../puppeteer.config.json')
  }
  return puppeteerConfig
}
