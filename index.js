var shallowEqual = require('shallow-equal/objects')
var assert = require('assert')

var tokenize = require('./lib/tokenize')

// https://stackoverflow.com/questions/317053/regular-expression-for-extracting-tag-attributes
var matchAttributes = /(\S+)=["']?((?:.(?!["']?\s+(?:\S+)=|[>"']))+.)["']?/g
var indentChars = '··'

module.exports = assertHtml

function assertHtml (_assert, left, right) {
  assert.ok(_assert, 'assert-html: _assert should be type object or type function')
  assert.equal(typeof left, 'string', 'assert-html: left should be type string')
  assert.equal(typeof right, 'string', 'assert-html: right should be type string')

  var leftTokens = tokenize(left)
  var rightTokens = tokenize(right)

  var max = Math.max(leftTokens.length, rightTokens.length)

  // start at -1 so the initial opening tag puts us at 0
  var leftDepth = -1
  var rightDepth = -1

  var leftToken, rightToken, leftString, rightString, leftAttrs, rightAttrs,
    leftFmt, rightFmt, leftTag, rightTag, leftType, rightType
  var leftClosed = false
  var rightClosed = false

  for (var i = 0; i < max; i++) {
    leftToken = leftTokens[i]
    rightToken = rightTokens[i]

    leftType = leftToken[0]
    rightType = rightToken[0]

    if (leftType === 'open') {
      leftDepth += 1
      leftClosed = false
    } else if (leftType === 'text') {
      if (!leftClosed) leftDepth += 1
    } else if (leftType === 'close') {
      leftDepth -= 1
      leftClosed = true
    }

    if (rightType === 'open') {
      rightDepth += 1
      rightClosed = false
    } else if (rightType === 'text') {
      if (!rightClosed) rightDepth += 1
    } else if (rightType === 'close') {
      rightDepth -= 1
      rightClosed = true
    }

    leftString = String(leftToken[1])
    rightString = String(rightToken[1])

    if (leftType !== 'text') leftAttrs = getAttributes(leftString)
    if (rightType !== 'text') rightAttrs = getAttributes(rightString)

    leftFmt = leftString
    for (var j = 0; j < leftDepth; j++) {
      leftFmt = indentChars + ' ' + leftFmt
    }

    rightFmt = rightString
    for (var k = 0; k < rightDepth; k++) {
      rightFmt = indentChars + ' ' + rightFmt
    }

    // if attributes aren't the same, just compare the two versions
    if (!shallowEqual(leftAttrs, rightAttrs) || leftType !== rightType ||
      leftType === 'text' || rightType === 'text') {
      _assert.equal(leftString, rightString, leftFmt)
    } else {
      leftTag = leftString.match(/^<[/]{0,1}(\w*)/)[1]
      rightTag = rightString.match(/^<[/]{0,1}(\w*)/)[1]
      _assert.equal(leftTag, rightTag, leftFmt)
    }
  }
}

function getAttributes (str) {
  var attrs = str.match(matchAttributes)
  if (!attrs) return {}
  return attrs.reduce(function (kv, pair) {
    var arr = pair.split('=')
    var key = arr[0]
    var val = arr[1]
    if (val) val = val.replace(/['"]/g, '')
    kv[key] = val
    return kv
  }, {})
}
