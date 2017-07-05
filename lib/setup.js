var fs = require('fs')
var path = require('path')
var readline = require('readline')
var homedir = require('os').homedir()

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

module.exports = function (callback) {
  var db = path.join(homedir, 'timet.db')
  console.log('  Hello, let\'s set up your Time Tracker, if you want ')
  console.log('  to leave the default settings just leave it blank!')
  console.log()
  console.log()
  rl.question('  Enter database path: ('+db+'): ', function (answer) {
    if(answer.trim() === ''){

    }
    callback()
  })
  //console.log('  The local database will save in: ', path.join(homedir, 'timetdb.json'))
}
