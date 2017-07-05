var path = require('path')
var moment = require('moment')
var convert = require('./convert')
var homedir = require('os').homedir()
var configDir = path.join(homedir, 'timet.json')
var Datastore = require('nedb')

module.exports = function (callback) {
  var config = require(configDir)
  var date = moment()
  var db = new Datastore({ filename: config.db, autoload: true })
  var days = config.listDay || 3
  if (Number.isInteger(global.args._[0])) days = global.args._[0]
  var indexDay = 1
  var getRegisters = function () {
    db.find({date: Number(date.format('YYYYMMDD'))}).sort({ datetime: 1 }).exec(function (err, registers) {
      if (err) return callback(err)
      var totalTime = 0
      for (var i in registers) {
        totalTime += registers[i].time
      }
      console.log(' ', (' DATE: ' + date.format(config.format) + ' ').bgWhite.black, checkShowTotal(totalTime).bgGreen.black)
      console.log('  ID  | TIME   | DESCRIPTION')
      if (!registers.length) {
        console.log('  --empty--'.gray)
      } else {
        for (var r in registers) {
          var register = registers[r]
          console.log(('  ' + convert.draw(register.id, 4) + '| ' + convert.draw(convert.convertMinsToHrsMins(register.time), 7) + '| ' + register.description).gray)
        }
      }
      date = date.subtract(1, 'day')
      indexDay++
      if (indexDay <= days) {
        console.log()
        getRegisters()
      } else {
        callback()
      }
    })
  }
  getRegisters()
}

function checkShowTotal (t) {
  if (!t) {
    return ''
  } else {
    return ' ' + convert.convertMinsToHrsMins(t) + ' '
  }
}
