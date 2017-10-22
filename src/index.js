#!/usr/bin/env node
import chalk from 'chalk'
import puppeteer from 'puppeteer'
import path from 'path'
import yargs from 'yargs'
import getPuppeteerConfig from './get_puppeteer_config'

const PATH = './node_modules/jest-puppeteer/'
const PUPPETEER_ENVIRONMENT = PATH + 'puppeteer_environment.js'
const RESULT_PROCESSOR = PATH + 'result_processor.js'

function cleanArgv(argv) {
  const clean = argv.slice(0);
  argv.forEach((arg, index) => {
    if (arg.indexOf('--config=') === 0 || arg.indexOf('-c=') === 0) {
      clean.splice(index, 1);
    } else if (arg.indexOf('--config') === 0 || arg.indexOf('-c') === 0) {
      clean.splice(index, 2);
    }
  });
  return clean;
}

console.log(chalk.green('Setup Puppeteer Environment.'))
puppeteer
  .launch(getPuppeteerConfig())
  .then(browser => {
    global.__BROWSER__ = browser

    const args = yargs(process.argv.slice(2)).options({
      config: {
        alias: 'c',
        type: 'string'
      },
    }).argv;
    const config = args.config ? require(path.resolve(args.config)) : {}
    const cleanedArgv = cleanArgv(process.argv);

    process.argv = cleanedArgv.concat([
      `--env=${PUPPETEER_ENVIRONMENT}`,
      '--config=' + JSON.stringify(Object.assign({}, config, {
        globals: {
          browserWSEndpoint: browser.wsEndpoint()
        },
        testResultsProcessor: RESULT_PROCESSOR
      }))
    ])

    return require('jest-cli/bin/jest.js')
  })
