module.exports={

  error: function(msg) {
    var chalk = require('chalk');
    return console.log(chalk.red(msg));
  },

  info: function(msg) {
    var chalk = require('chalk');
    return console.log(chalk.cyan(msg));
  },

  success: function(msg) {
    var chalk = require('chalk');
    return console.log(chalk.green(msg));
  },

  attention: function(msg) {
    var chalk = require('chalk');
    return console.log(chalk.yellow(msg));
  }

};
