#!/usr/bin/env node

var rps = require('./')

var choice = process.argv[2]

if (!/^(rock|paper|scissors)$/i.test(choice)) {
  console.error('Usage: rock-paper-scissors [rock|paper|scissors]')
  process.exit(1)
}

var stream = rps(choice)

stream.on('tie', function (you, opponent) {
  onend('Tied. You both choose %s', you, opponent)
})

stream.on('win', function (you, opponent) {
  onend('You won! %s beats %s', you, opponent)
})

stream.on('lose', function (you, opponent) {
  onend('You lost! %s beats %s', opponent, you)
})

function onend () {
  console.error.apply(console, arguments)
  process.stdin.destroy()
}

process.stdin.pipe(stream).pipe(process.stdout)
