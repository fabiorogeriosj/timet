var fs = require('fs')
var path = require('path')
var homedir = require('os').homedir()

module.exports = function (callback) {
  var configPath = path.join(homedir, 'timet.json')
  if (!global.args['jira-login'] || global.args['jira-login'].toString().split(':').length !== 2 || !global.args['jira-host']) {
    console.log()
    console.log(' ', ' OPS! '.bgRed, 'Incorrect parameters Jira configuration, check the documentation!')
    console.log()
    return callback()
  }
  var config = require(configPath)
  config.jira = {
    host: global.args['jira-host'],
    basic_auth: {
      username: global.args['jira-login'].toString().split(':')[0],
      password: global.args['jira-login'].toString().split(':')[1]
    }
  }
  fs.writeFile(configPath, JSON.stringify(config), function (err) {
    if (err) return callback(err)
    console.log()
    console.log(' ', ' OK '.bgGreen, ' Jira configuration successfully at:', configPath)
    console.log()
    callback()
  })
}
