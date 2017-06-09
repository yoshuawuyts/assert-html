var assertHtml = require('./')
var tape = require('tape')
var html = require('bel')

tape('compare two DOM strings', function (assert) {
  var a, b
  a = html`<section foo="bar" bin="baz">hello planet</section>`.toString()
  b = html`<section>hello world</section>`.toString()
  assertHtml(assert, a, b)

  a = html`<div foo="bar"><b>hello</b> planet</div>`.toString()
  b = html`<div foo="bar"><b>hello</b> planet</div>`.toString()
  assertHtml(assert, a, b)

  a = html`<div foo="bar" bin="baz"><b>hello</b> planet</div>`.toString()
  b = html`<div bin="baz" foo="bar"><b>hello</b> planet</div>`.toString()
  assertHtml(assert, a, b)

  a = html`<div foo bin="baz"><b>hello</b> planet</div>`.toString()
  b = html`<div bin="baz" foo><b>hello</b> planet</div>`.toString()
  assertHtml(assert, a, b)

  assert.end()
})
