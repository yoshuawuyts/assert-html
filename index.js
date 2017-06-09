var assert = require('assert')

var tokenize = require('./lib/tokenize')

var indentChars = '··'

module.exports = assertHtml

function assertHtml (_assert, left, right) {
  assert.ok(_assert, 'assert-html: _assert should be type object or type function')
  assert.equal(typeof left, 'string', 'assert-html: left should be type string')
  assert.equal(typeof right, 'string', 'assert-html: right should be type string')

  var leftTokens = tokenize(left)
  var rightTokens = tokenize(right)

  var max = Math.max(leftTokens.length, rightTokens.length)
  var leftDepth = -1
  var rightDepth = -1
  var leftToken, rightToken, leftString, rightString
  var leftClosed = false
  var rightClosed = false

  for (var i = 0; i < max; i++) {
    leftToken = leftTokens[i]
    rightToken = rightTokens[i]

    if (leftToken[0] === 'open') {
      leftDepth += 1
      leftClosed = false
    } else if (leftToken[0] === 'text') {
      if (!leftClosed) leftDepth += 1
    } else if (leftToken[0] === 'close') {
      leftDepth -= 1
      leftClosed = true
    }

    if (rightToken[0] === 'open') {
      rightDepth += 1
      rightClosed = false
    } else if (rightToken[0] === 'text') {
      if (!rightClosed) rightDepth += 1
    } else if (rightToken[0] === 'close') {
      rightDepth -= 1
      rightClosed = true
    }

    leftString = String(leftToken[1])
    rightString = String(rightToken[1])

    for (var j = 0; j < leftDepth; j++) {
      leftString = indentChars + ' ' + leftString
    }

    for (var k = 0; k < rightDepth; k++) {
      rightString = indentChars + ' ' + rightString
    }

    _assert.equal(leftString, rightString, leftString)
  }
}
