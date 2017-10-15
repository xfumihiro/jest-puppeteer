#!/usr/bin/env node
import chalk from 'chalk'
import puppeteer from 'puppeteer'
import getPuppeteerConfig from './get_puppeteer_config'

const PATH = './node_modules/jest-puppeteer/'
const PUPPETEER_ENVIRONMENT = PATH + 'puppeteer_environment.js'
const RESULT_PROCESSOR = PATH + 'result_processor.js'

console.log(chalk.green('Setup Puppeteer Environment.'))
puppeteer
  .launch(getPuppeteerConfig())
  .then(browser => {
    global.__BROWSER__ = browser
    process.argv = process.argv.concat([
      `--env=${PUPPETEER_ENVIRONMENT}`,
      '--config=' + JSON.stringify({
        globals: {
          browserWSEndpoint: browser.wsEndpoint()
        },
        testResultsProcessor: RESULT_PROCESSOR
      })
    ])
    return require('jest-cli/bin/jest.js')
  })
