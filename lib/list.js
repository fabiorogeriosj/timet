var fs = require('fs')
var path = require('path')
var moment = require('moment')
var convert = require('./convert')
var homedir = require('os').homedir()
var configDir = path.join(homedir, 'timet.json')
var Datastore = require('nedb')

module.exports = function (filter, callback) {
  if (arguments.length === 1) {
    callback = filter
    filter = {}
  }
  var outputReport = ''
  var config = require(configDir)
  var date = filter.dateEnd ? moment(filter.dateEnd, config.format) : moment()
  var db = new Datastore({ filename: config.db, autoload: true })
  var days = config.listDay || 3
  if (Number.isInteger(global.args._[0])) days = global.args._[0]
  if (filter.dateInit) {
    var dateEnd = Number(date.format('YYYYMMDD'))
    var dateInit = Number(moment(filter.dateInit, config.format).format('YYYYMMDD'))
    var diff = dateEnd - dateInit
    if (diff) {
      days = diff + 1
    }
  }
  var indexDay = 1
  var getRegisters = function () {
    db.find({date: Number(date.format('YYYYMMDD'))}).sort({ datetime: 1 }).exec(function (err, registers) {
      if (err) return callback(err)
      var totalTime = 0
      var totalTimeObj = {}
      var tags = []
      for (var i in registers) {
        var itemTime = registers[i].time
        totalTime += itemTime
        registers[i].tags.map(item => {
          if (totalTimeObj[item] === undefined) {
            totalTimeObj[item] = itemTime
            tags.push(item)
          } else {
            totalTimeObj[item] = itemTime + totalTimeObj[item]
          }
        })
      }

      var timeByTag = ''
      tags.map(item => {
        timeByTag += item + ' ' + checkShowTotal(totalTimeObj[item]) + ' | '
      })

      console.log(' ', (' DATE: ' + date.format(config.format) + ' ').bgWhite.black, checkShowTotal(totalTime).bgGreen.black)
      if (timeByTag.length > 0) { console.log(' ', timeByTag.bgGreen.black) }
      console.log('  ID  | TIME   | DESCRIPTION')
      if (global.args.report) {
        outputReport += 'DATE: ' + date.format(config.format) + '\n'
        outputReport += 'ID  | TIME   | DESCRIPTION \n'
      }
      if (!registers.length) {
        console.log('  --empty--'.gray)
        if (global.args.report) {
          outputReport += '--empty-- \n\n'
        }
      } else {
        for (var r in registers) {
          var register = registers[r]
          console.log(('  ' + convert.draw(register.id, 4) + '| ' + convert.draw(convert.convertMinsToHrsMins(register.time), 7) + '| ' + register.description).gray)
          if (global.args.report) {
            outputReport += convert.draw(register.id, 4) + '| ' + convert.draw(convert.convertMinsToHrsMins(register.time), 7) + '| ' + register.description + '\n'
          }
        }
      }
      if (global.args.report && checkShowTotal(totalTime)) {
        outputReport += 'TOTAL: ' + checkShowTotal(totalTime) + '\n\n'
      }
      date = date.subtract(1, 'day')
      indexDay++
      if (indexDay <= days) {
        console.log()
        getRegisters()
      } else {
        if (global.args.report) fs.writeFileSync('timet.txt', outputReport, 'utf8')
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
