# prettify-html [![Build Status](https://secure.travis-ci.org/johnotander/prettify-html.svg?branch=master)](https://travis-ci.org/johnotander/prettify-html) [![NPM Package](https://img.shields.io/npm/v/prettify-html.svg?style=flat)](https://www.npmjs.com/package/prettify-html) [![NPM Downloads](https://img.shields.io/npm/dt/prettify-html.svg?style=flat)](https://www.npmjs.com/package/prettify-html) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)


__Work in progress__

Prettify your html.

## Installation

```bash
npm install --save prettify-html
```
or
```bash
yarn add prettify-html
```

## Usage

```javascript
var prettifyHtml = require('prettify-html')

var html = '<div>my <a href="link">nested</a> html</div>'
var prettified = prettifyHtml(html)

/* output:
<div>
  my
  <a href="link">nested</a>
  html
</div>
*/
```

## License

MIT

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

Crafted with <3 by John Otander ([@4lpine](https://twitter.com/4lpine)).

**Contributors:**
 - [Troy Alford](https://github.com/TroyAlford)

***

> This package was initially generated with [yeoman](http://yeoman.io) and the [p generator](https://github.com/johnotander/generator-p.git).
