'use strict';

exports.__esModule = true;

exports.default = function () {
  let puppeteerConfig = {};
  if (_fs2.default.existsSync('./puppeteer.config.json')) {
    puppeteerConfig = require(__dirname + '/../../../puppeteer.config.json');
  }
  return puppeteerConfig;
};

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }