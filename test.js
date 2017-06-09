var assert = require('assert')
var tape = require('tape')
var html = require('bel')

var assertHtml = require('./')

tape('compare two DOM strings: OK', function (_assert) {
  var a, b

  a = html`<div><b>hello</b> planet</div>`.toString()
  b = html`<div><b>hello</b> planet</div>`.toString()

  _assert.doesNotThrow(function () {
    assertHtml(assert, a, b)
  })

  _assert.end()
})

tape('compare two DOM strings: NOT OK', function (_assert) {
  var a, b

  a = html`<div><b>hello</b> planet</div>`.toString()
  b = html`<div>earth</div>`.toString()

  _assert.throws(function () {
    assertHtml(assert, a, b)
  })

  _assert.end()
})
