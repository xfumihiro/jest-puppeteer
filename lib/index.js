#!/usr/bin/env node
'use strict';

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _puppeteer = require('puppeteer');

var _puppeteer2 = _interopRequireDefault(_puppeteer);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _yargs = require('yargs');

var _yargs2 = _interopRequireDefault(_yargs);

var _get_puppeteer_config = require('./get_puppeteer_config');

var _get_puppeteer_config2 = _interopRequireDefault(_get_puppeteer_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PATH = './node_modules/jest-puppeteer/';
const PUPPETEER_ENVIRONMENT = PATH + 'puppeteer_environment.js';
const RESULT_PROCESSOR = PATH + 'result_processor.js';

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

console.log(_chalk2.default.green('Setup Puppeteer Environment.'));
_puppeteer2.default.launch((0, _get_puppeteer_config2.default)()).then(browser => {
  global.__BROWSER__ = browser;

  const args = (0, _yargs2.default)(process.argv.slice(2)).options({
    config: {
      alias: 'c',
      type: 'string'
    }
  }).argv;
  const config = args.config ? require(_path2.default.resolve(args.config)) : {};
  const cleanedArgv = cleanArgv(process.argv);

  process.argv = cleanedArgv.concat([`--env=${PUPPETEER_ENVIRONMENT}`, '--config=' + JSON.stringify(Object.assign({}, config, {
    globals: {
      browserWSEndpoint: browser.wsEndpoint()
    },
    testResultsProcessor: RESULT_PROCESSOR
  }))]);

  return require('jest-cli/bin/jest.js');
});