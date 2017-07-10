var path = require('path')
var homedir = require('os').homedir()
var configDir = path.join(homedir, 'timet.json')
var convert = require('./convert')
var issueKey = null
var Spinner = null
var spinner = null

function checkAndSend (register, callback) {
  var config = require(configDir)
  if (config.jira) {
    if (!register.description || register.description.indexOf('#') < 0) {
      return callback()
    }
    issueKey = register.description.split('#')[1].split(' ')[0].split(',')[0].split('.')[0].split('!')[0]
    var options = {
      issueKey: issueKey,
      worklog: {
        comment: register.description,
        timeSpentSeconds: register.time * 60
      }
    }
    Spinner = require('cli-spinner').Spinner
    spinner = new Spinner('  ' + '..%s.'.bgGreen + ' Jira connecting...')
    spinner.setSpinnerString('.')
    spinner.setSpinnerDelay(500)
    spinner.start()
    var JiraClient = require('jira-connector')
    var jira = new JiraClient(config.jira)
    jira.issue.addWorkLog(options, function (err, data) {
      spinner.stop(true)
      if (err) {
        console.log(' ', ' OPS '.bgGreen, 'Jira workLog not registred. See the error:')
        console.log(err)
        return callback()
      }
      console.log(' ', ' OK '.bgGreen, 'Jira workLog registred!')
      callback()
    })
  } else if (config.trello) {
    if (!register.description || register.description.indexOf('#') < 0) {
      return callback()
    }
    issueKey = register.description.split('#')[1].split(' ')[0].split(',')[0].split('.')[0].split('!')[0]
    if (issueKey) {
      Spinner = require('cli-spinner').Spinner
      spinner = new Spinner('  ' + '..%s.'.bgGreen + ' Trello connecting...')
      spinner.setSpinnerString('.')
      spinner.setSpinnerDelay(500)
      spinner.start()
      var request = require('request')
      request.post({url: 'https://api.trello.com/1/cards/' + issueKey + '/actions/comments',
        form: {
          key: config.trello.key,
          token: config.trello.token,
          text: 'Time Tracker: ' + convert.convertMinsToHrsMins(register.time) + '\n**' + register.description + '**'
        }}, function (err, httpResponse, body) {
        spinner.stop(true)
        if (err) {
          console.log(' ', ' OPS '.bgGreen, 'Trello workLog not registred. See the error:')
          console.log(err)
          return callback()
        }
        if (!err && httpResponse.statusCode === 200) {
          console.log(' ', ' OK '.bgGreen, 'Trello workLog registred!')
          return callback()
        }
        console.log(' ', ' OPS '.bgGreen, 'Trello workLog not registred. See the return:')
        console.log(body)
        return callback()
      })
    }
  } else {
    callback()
  }
}

module.exports = {checkAndSend}
