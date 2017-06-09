# assert-html [![stability][0]][1]
[![npm version][2]][3] [![build status][4]][5]
[![downloads][8]][9] [![js-standard-style][10]][11]

Assert two HTML strings are equal.

## Usage
```js
var assertHtml = require('assert-html')
var tape = require('tape')
var html = require('bel')

tape('compare two DOM strings', function (assert) {
  var a, b
  a = html`<section>hello planet</section>`.toString()
  b = html`<section>hello world</section>`.toString()
  assertHtml(assert, a, b)

  a = html`<div><b>hello</b> planet</div>`.toString()
  b = html`<div><b>hello</b> planet</div>`.toString()
  assertHtml(assert, a, b)
  assert.end()
})
```

## API
### `assertHtml(assert, expected, actual)`
Assert two DOM strings are equal using a custom assert function. Calls
`assert.equal()` method from the assert function.

## License
[MIT](https://tldrlegal.com/license/mit-license)

[0]: https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square
[1]: https://nodejs.org/api/documentation.html#documentation_stability_index
[2]: https://img.shields.io/npm/v/assert-html.svg?style=flat-square
[3]: https://npmjs.org/package/assert-html
[4]: https://img.shields.io/travis/yoshuawuyts/assert-html/master.svg?style=flat-square
[5]: https://travis-ci.org/yoshuawuyts/assert-html
[6]: https://img.shields.io/codecov/c/github/yoshuawuyts/assert-html/master.svg?style=flat-square
[7]: https://codecov.io/github/yoshuawuyts/assert-html
[8]: http://img.shields.io/npm/dm/assert-html.svg?style=flat-square
[9]: https://npmjs.org/package/assert-html
[10]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[11]: https://github.com/feross/standard
