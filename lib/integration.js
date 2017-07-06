var path = require('path')
var homedir = require('os').homedir()
var configDir = path.join(homedir, 'timet.json')

function checkAndSend (register, callback) {
  var config = require(configDir)
  if (config.jira) {
    if (!register.description || register.description.indexOf('#') < 0) {
      return callback()
    }
    var issueKey = register.description.split('#')[1].split(' ')[0].split(',')[0].split('.')[0].split('!')[0]
    var options = {
      issueKey: issueKey,
      worklog: {
        comment: register.description,
        timeSpentSeconds: register.time * 60
      }
    }
    var JiraClient = require('jira-connector')
    var jira = new JiraClient(config.jira)
    jira.issue.addWorkLog(options, function (err, data) {
      if (err) {
        console.log(' ', ' OPS '.bgGreen, 'Jira workLog not registred. See the error:')
        console.log(err)
        return callback()
      }
      console.log(' ', ' OK '.bgGreen, 'Jira workLog registred!')
      callback()
    })
  } else {
    callback()
  }
}

module.exports = {checkAndSend}
