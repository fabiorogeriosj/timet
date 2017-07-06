var path = require('path')
var moment = require('moment')
var homedir = require('os').homedir()
var configDir = path.join(homedir, 'timet.json')
var Datastore = require('nedb')

module.exports = function (callback) {
  var config = require(configDir)
  var db = new Datastore({ filename: config.db, autoload: true })
  if (global.args._.length < 3) {
    console.log()
    console.log(' ', ' OPS! '.bgRed, 'Incorrect parameters, check the documentation!')
    console.log()
    return callback()
  }

  var date = moment(global.args._[1], config.format)
  if (!date.isValid()) {
    console.log()
    console.log(' ', ' OPS! '.bgRed, 'Incorrect format date, you need set ' + config.format)
    console.log()
    return callback()
  }
  var id = global.args._[2]
  date = Number(date.format('YYYYMMDD'))
  if (isNaN(Number(id))) {
    console.log()
    console.log(' ', ' OPS! '.bgRed, 'Incorrect id informed, check the documentation!')
    console.log()
    return callback()
  }
  db.remove({ id: id, date: date }, {}, function (err, numRemoved) {
    if (err) return callback(err)
    if (!numRemoved) {
      console.log()
      console.log(' ', ' OPS '.bgYellow, 'This record has already been removed or does not exist in the database!')
      console.log()
    } else {
      console.log()
      console.log(' ', ' OK '.bgGreen, 'Registry successfully removed!')
      console.log()
    }
    callback()
  })
}
