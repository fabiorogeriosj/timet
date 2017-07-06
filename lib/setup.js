var fs = require('fs')
var path = require('path')
var readline = require('readline')
var homedir = require('os').homedir()
var platform = require('os').platform()

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

module.exports = function (callback) {
  var config = path.join(homedir, 'timet.json')
  var db = path.join(homedir, 'timet.db')
  var format = 'M/D/YYYY'
  console.log('  Hello, let\'s set up your Time Tracker, if you want ')
  console.log('  to leave the default settings just leave it blank!')
  console.log()
  console.log()
  rl.question('  Enter database path: (' + db + '): ', function (answer) {
    if (answer.trim() !== '') {
      db = answer.trim()
    }
    rl.question('  Enter format date MomentJS (' + format + '): ', function (answer) {
      if (answer.trim() !== '') {
        format = answer.trim()
      }
      if (platform === 'win32') {
        db = db.replace(/\\/g, '\\\\')
      }
      fs.writeFile(config, '{"db":"' + db + '", "format":"' + format + '", "listDay":"3"}', function (err) {
        if (err) return console.log(err)
        console.log()
        console.log(' ', ' OK '.bgGreen, ' Setup completed successfully at:', config)
        console.log()
        callback()
      })
    })
  })
  // console.log('  The local database will save in: ', path.join(homedir, 'timetdb.json'))
}
