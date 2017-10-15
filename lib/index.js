#!/usr/bin/env node
'use strict';

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _puppeteer = require('puppeteer');

var _puppeteer2 = _interopRequireDefault(_puppeteer);

var _get_puppeteer_config = require('./get_puppeteer_config');

var _get_puppeteer_config2 = _interopRequireDefault(_get_puppeteer_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PATH = './node_modules/jest-puppeteer/';
const PUPPETEER_ENVIRONMENT = PATH + 'puppeteer_environment.js';
const RESULT_PROCESSOR = PATH + 'result_processor.js';

console.log(_chalk2.default.green('Setup Puppeteer Environment.'));
_puppeteer2.default.launch((0, _get_puppeteer_config2.default)()).then(browser => {
  global.__BROWSER__ = browser;
  process.argv = process.argv.concat([`--env=${PUPPETEER_ENVIRONMENT}`, '--config=' + JSON.stringify({
    globals: {
      browserWSEndpoint: browser.wsEndpoint()
    },
    testResultsProcessor: RESULT_PROCESSOR
  })]);
  return require('jest-cli/bin/jest.js');
});