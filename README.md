# jest-puppeteer

> Headless Chrome (Puppeteer) Environment Wrapper for Jest

It's basically a wrapper of Puppeteer environment for Jest.

First it launches puppeteer and keep the browserWSEndpoint at global.browserWSEndpoint.

Then it run Jest tests.

Each test case can have their puppeteer instance connect to the browser via global.browserWSEndpoint and teardown when finished.

Finally, it teardowns the browser instance via a custom Jest result processor.

### Installation

> **Note**: This wrapper depends on the Async Test Environment API in jest@21.3.0-beta.2

```sh
npm install -D jest@21.3.0-beta.2 puppeteer jest-puppeteer
```
or
```sh
yarn add --dev jest@21.3.0-beta.2 puppeteer jest-puppeteer
```

### Usage

see example

### License

MIT

If you enjoy my work, please click the sponsor link below

<a target='_blank' rel='nofollow' href='https://app.codesponsor.io/link/cu1HheDZfnqZS4YAy7Hf8bGU/xfumihiro/jest-puppeteer'>
  <img alt='Sponsor' width='888' height='68' src='https://app.codesponsor.io/embed/cu1HheDZfnqZS4YAy7Hf8bGU/xfumihiro/jest-puppeteer.svg' />
</a>

or [buy me a :beer:](https://paypal.me/xfumihiro/0usd)!
