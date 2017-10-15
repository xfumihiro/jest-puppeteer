const NodeEnvironment = require('jest-environment-node')
const puppeteer = require('puppeteer')

class PuppeteerEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config)
  }

  async setup() {
    await super.setup()
    if (!this.global.browserWSEndpoint) {
      throw new Error('this.global.browserWSEndpoint not set')
    }
    this.global.__BROWSER__ = await puppeteer.connect({
      browserWSEndpoint: this.global.browserWSEndpoint
    })
  }

  async teardown() {
    await this.global.__BROWSER__.close()    
    await super.teardown()
  }

  runScript(script) {
    return super.runScript(script)
  }
}

module.exports = PuppeteerEnvironment
