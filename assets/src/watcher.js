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
var con = _.log;
var mode = _.mode;

var x = module.exports = {

  start: (web) => {
    if (_.onPost == true) x.onPost(web);
  },

  onPost: (web) => {
    const SteemBot = require('steembotter').default;
    const username = _.user;
    const postingKey = _.wif;
    const node = web;

    const bot = new SteemBot({
      username,
      postingKey,
      node
    });

    bot.onPost(handlePost);
    bot.start();

    async function handlePost(data, responder) {
      if (mode == 'dry') {
        var author = data.author;
        var dbGet = await sqlite.get(`select author from pending`);
        if (dbGet == undefined) return setNewDatabase(author);
        var dbGet = await sqlite.get(`select * from pending where author = '${author}'`);
        if (dbGet) return;
        var dbGet = await sqlite.get(`select * from done where author = '${author}'`);
        if (dbGet) return;
        if (_.log.dbInserts == true) log.info(`[DB INSERT]: Steemian [ ${author} ] is inserted into the database`)
        setTimeout(function() {
          return cleanDupes();
        }, 1000);
      } else {
        var author = data.author;
        var dbGet = await sqlite.get(`select author from pending`);
        if (dbGet == undefined) return setNewDatabase(author);
        var dbGet = await sqlite.get(`select * from pending where author = '${author}'`);
        if (dbGet) return;
        var dbGet = await sqlite.get(`select * from done where author = '${author}'`);
        if (dbGet) return;
        sqlite.run(`insert into pending (author) values ('${author}')`);
        if (_.log.dbInserts == true) log.info(`[DB INSERT]: Steemian [ ${author} ] is inserted into the database`)
        setTimeout(function() {
          return cleanDupes();
        }, 1000);
      }
    };

    function setNewDatabase(author) {
      sqlite.run(`insert into pending (author) values ('devske')`);
      setTimeout(function() {
        return cleanDupes();
      }, 1000);
    }

    function cleanDupes() {
      if (mode == 'dry') {
        if (_.log.dbCleans == true) log.info(`[DB CLEAN]: All duplicate entries are cleaned !`);
      } else {
        if (_.log.dbCleans == true) log.info(`[DB CLEAN]: All duplicate entries are cleaned !`);
        return sqlite.run(`delete from pending where rowid not in (select min(rowid) from pending group by author)`);
      }
    }
  }

};
