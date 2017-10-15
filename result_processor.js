const chalk = require('chalk')

const resultProcessor = result => {
  console.log(chalk.green('Teardown Puppeteer Environment.'))  
  global.__BROWSER__.close()
  return result
}
module.exports = resultProcessor
