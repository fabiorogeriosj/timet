var fs = require('fs')
var path = require('path')
var homedir = require('os').homedir()

module.exports = function (callback) {
  var configPath = path.join(homedir, 'timet.json')
  if (!global.args['trello-key'] || !global.args['trello-token']) {
    console.log()
    console.log(' ', ' OPS! '.bgRed, 'Incorrect parameters Trello configuration, check the documentation!')
    console.log()
    return callback()
  }
  var config = require(configPath)
  config.trello = {
    key: global.args['trello-key'],
    token: global.args['trello-token']
  }
  fs.writeFile(configPath, JSON.stringify(config), function (err) {
    if (err) return callback(err)
    console.log()
    console.log(' ', ' OK '.bgGreen, ' Trello configuration successfully at:', configPath)
    console.log()
    callback()
  })
}
