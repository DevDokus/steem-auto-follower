//////////////////////////////////////////////////////////////////////////////
// Dont change any code below if you are not knowing what you are doing !
//////////////////////////////////////////////////////////////////////////////
const sqlite = require('sqlite');
sqlite.open(`./db.sqlite`);
const _ = require('../../settings');
const req = require('../functions/require.js');

var log = req.log();
var error = req.error();
var warn = req.warn();
var suc = req.success();

module.exports = {

  start: () => {
    // Setup the database.
    setTimeout(function() {
      DB();
      setTimeout(function() {
        return checkOpt();
      }, 1000);
    }, 1000);

    function DB() {
      sqlite.run(`create table if not exists pending (author text)`);
      sqlite.run(`create table if not exists done (author text)`);
    }

    function checkOpt() {
      if (_.user == '' || _.user == ' ') return log.error(error.user());
      if (_.wif == '' || _.wif == ' ') return log.error(error.wif());
      if (_.onComment == false) log.attention(warn.onComment());
      if (cooldown() < 900000) log.attention(warn.fastCooldown());
      if (_.error == true) log.success(suc.error());
      if (_.webSocket == '' || _.webSocket == ' ') {
        var webSocket = 'https://rpc.steemviz.com';
      } else {
        var webSocket = _.webSocket;
      }

      log.success(`--------------------------------------------------------`);
      log.success(`------------------ PROGRAM IS RUNNING ------------------`);
      log.success(`--------------------------------------------------------`);

      if (_.mode == 'dry') {
        log.error(``)
        log.error(`[WARNING]: You are in [DRY] mode ! THIS IS FOR TESTING`)
        log.error(`[WARNING]: No changes will be made. Only console messages.`)
        log.error(``)
      }

      var mode = _.mode.toLowerCase();
      if (mode == 'watcher') return req.watcher().start(webSocket);
      if (mode == 'actor') return req.actor().start(webSocket);
      if (mode == 'superior' || mode == 'dry') {
        req.watcher().start(webSocket);
        req.actor().start(webSocket);
        return;
      }

      function cooldown() {
        var time = _.cooldown.split(' ');
        if (time[1] == 'sec') return time[0] * 1000;
        if (time[1] == 'min') return time[0] * 60 * 1000;
      };
    }
  }

};
