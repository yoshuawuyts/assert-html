var assertHtml = require('./')
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
