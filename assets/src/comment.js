//////////////////////////////////////////////////////////////////////////////
// Dont change any code below if you are not knowing what you are doing !
//////////////////////////////////////////////////////////////////////////////
const sqlite = require('sqlite');
sqlite.open(`./db.sqlite`);
const _ = require('../../settings');
const req = require('../functions/require.js');
const steem = require('steem');

var log = req.log();
var error = req.error();
var warn = req.warn();
var suc = req.success();
var con = _.log;
var mode = _.mode;

var x = module.exports = {

  start: (web) => {
    const SteemBot = require('steembotter').default;
    const username = _.user;
    const postingKey = _.wif;
    const node = web;
    const mode = _.mode.toLowerCase();

    const bot = new SteemBot({
      username,
      postingKey,
      node
    });

    bot.onComment(comment);
    bot.start();

    function comment(d, r) {
      if (mode == 'dry') return dry(d, r);
      if (mode == 'watcher') return normal(d, r);
    }
  }

};

async function dry(d, r) {
  var author = d.author;
  // Check the users reputation.
  steem.api.getAccounts([author], function() {
    if (err && _.log.errors == true) log.error(err);
    var rep = steem.formatter.reputation(res[0].reputation);
    var low = _.rep_low;
    var high = _.rep_high;
    if (rep < low || rep > high) return;
  });

  // check if the database contains entries.
  var dbGet = await sqlite.get(`select author from pending`);
  if (dbGet == undefined) return setNewDatabase(author);

  var dbGet = await sqlite.get(`select * from pending where author = '${author}' and type = 'comment'`);
  if (dbGet) return;
  var dbGet = await sqlite.get(`select * from done where author = '${author}'`);
  if (dbGet) return;
  if (_.log.dbInserts == true) log.info(`[DB INSERT]: Steemian [ ${author} ] is inserted into the database`)
  setTimeout(function() {
    return cleanDupes();
  }, 1000);
};

async function normal(d, r) {
  var author = d.author;
  steem.api.getAccounts([author], function(err, res) {
    if (err && _.log.errors == true) return log.error(err);
    var rep = steem.formatter.reputation(res[0].reputation);
    var low = _.rep_low;
    var high = _.rep_high;
    if (rep < low || rep > high) return;
  });

  // check if the database contains entries.
  var dbGet = await sqlite.get(`select author from pending`);
  if (dbGet == undefined) return setNewDatabase(author);

  var dbGet = await sqlite.get(`select * from pending where author = '${author}' and type == 'comment'`);
  if (dbGet) return;
  var dbGet = await sqlite.get(`select * from done where author = '${author}'`);
  if (dbGet) return;
  var xResp = JSON.stringify(r);
  sqlite.run(`insert into pending (author, type, data) values ('${author}', 'comment', '${xResp}')`);
  if (_.log.dbInserts == true) log.info(`[DB INSERT]: Steemian [ ${author} ] is inserted into the database`)
  setTimeout(function() {
    return cleanDupes(author);
  }, 1000);

};

function setNewDatabase(author) {
  var options = {
    targetUsername: "devske",
    targetPermlink: "new-to-steemit-my-introduction-what-i-will-be-doing-on-steemit",
  };

  sqlite.run(`insert into pending (author, type, data) values ('devske', 'blog', '${JSON.stringify(options)}')`);
  setTimeout(function() {
    return cleanDupes(author);
  }, 1000);
};

function cleanDupes(author) {
  if (mode == 'dry') {
    if (_.log.dbCleans == true) log.info(`[DB CLEAN]: All duplicate entries are cleaned !`);
  } else {
    if (_.log.dbCleans == true) log.info(`[DB CLEAN]: All duplicate entries are cleaned !`);
    return sqlite.run(`delete from pending where rowid not in (select min(rowid) from pending group by author)`);
  }
};
