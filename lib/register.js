var path = require('path')
var moment = require('moment')
var homedir = require('os').homedir()
var configDir = path.join(homedir, 'timet.json')
var Datastore = require('nedb')

module.exports = function (old, callback) {
  if (arguments.length === 1) {
    callback = old
    old = {}
  }
  var config = require(configDir)
  var db = new Datastore({ filename: config.db, autoload: true })
  var timeInfo = old.timeInfo || global.args._[0]
  var description = old.description || global.args._.slice(1).join(' ')
  var datetime = new Date().getTime()
  var date = old.date ? Number(moment(old.date, config.format).format('YYYYMMDD')) : Number(moment().format('YYYYMMDD'))
  var time = 0
  if (timeInfo.indexOf('h') >= 0 || timeInfo.indexOf('H') >= 0) {
    time += Math.floor(parseInt(timeInfo) * 60)
  }
  if (timeInfo.indexOf('m') >= 0 || timeInfo.indexOf('M') >= 0) {
    time += parseInt(timeInfo)
  }
  if (timeInfo.indexOf(':') >= 0) {
    time += Math.floor(parseInt(parseInt(timeInfo.split(':')[0]) * 60))
    time += parseInt(timeInfo.split(':')[1])
  }
  db.find({date: date, time: time, description: description}, function (err, registerDuplicate) {
    if (err) return callback(err)
    if (registerDuplicate.length) {
      console.log()
      console.log(' ', ' OPS! '.bgRed, 'There is already a register like this, alter the description or the time to enter!')
      console.log()
      callback()
    } else {
      db.find({date: date}).sort({ id: -1 }).limit(1).exec(function (err, registers) {
        if (err) return callback(err)
        var id = !registers.length ? 1 : registers[0].id + 1
        if (time && description) {
          var register = {
            id: id,
            date: date,
            datetime: datetime,
            time: time,
            description: description
          }
          db.insert(register, function (err, newDoc) {
            if (err) return callback(err)
            console.log()
            console.log(' ', ' OK '.bgGreen, 'Registry successfully saved!')
            console.log()
            callback()
          })
        } else {
          console.log()
          console.log(' ', ' OPS! '.bgRed, 'Incorrect parameters, check the documentation!')
          console.log()
          callback()
        }
      })
    }
  })
}
