var tape = require('tape')
var rps = require('./')

tape('win', function (t) {
  t.plan(2)

  var s1 = rps('rock')
  var s2 = rps('scissors')

  s1.pipe(s2).pipe(s1)

  s1.on('win', function () {
    t.ok(true, 's1 should win')
  })

  s1.on('lose', function () {
    t.ok(false, 's1 should not lose')
  })

  s1.on('tie', function () {
    t.ok(false, 's1 should not tie')
  })

  s2.on('win', function () {
    t.ok(false, 's2 should not win')
  })

  s2.on('lose', function () {
    t.ok(true, 's2 should lose')
  })

  s2.on('tie', function () {
    t.ok(false, 's2 should not tie')
  })
})

tape('lose', function (t) {
  t.plan(2)

  var s1 = rps('rock')
  var s2 = rps('paper')

  s1.pipe(s2).pipe(s1)

  s1.on('win', function () {
    t.ok(false, 's1 should not win')
  })

  s1.on('lose', function () {
    t.ok(true, 's1 should lose')
  })

  s1.on('tie', function () {
    t.ok(false, 's1 should not tie')
  })

  s2.on('win', function () {
    t.ok(true, 's2 should win')
  })

  s2.on('lose', function () {
    t.ok(false, 's2 should not lose')
  })

  s2.on('tie', function () {
    t.ok(false, 's2 should not tie')
  })
})

tape('tie', function (t) {
  t.plan(2)

  var s1 = rps('scissors')
  var s2 = rps('scissors')

  s1.pipe(s2).pipe(s1)

  s1.on('win', function () {
    t.ok(false, 's1 should not win')
  })

  s1.on('lose', function () {
    t.ok(false, 's1 should not lose')
  })

  s1.on('tie', function () {
    t.ok(true, 's1 should tie')
  })

  s2.on('win', function () {
    t.ok(false, 's2 should not win')
  })

  s2.on('lose', function () {
    t.ok(false, 's2 should not lose')
  })

  s2.on('tie', function () {
    t.ok(true, 's2 should tie')
  })
})

tape('invalid choice', function (t) {
  t.plan(1)
  t.throws(function () {
    rps('invalid')
  })
})
