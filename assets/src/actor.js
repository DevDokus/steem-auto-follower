//////////////////////////////////////////////////////////////////////////////
// Dont change any code below if you are not knowing what you are doing !
//////////////////////////////////////////////////////////////////////////////
const sqlite = require('sqlite');
sqlite.open(`./db.sqlite`);
const _ = require('../../settings');
const req = require('../functions/require.js');
const Countdown = require('countdown-js');
const steem = require('steem');

const Tiny = require('tiny-timer')
let tiny = new Tiny();
var cool = 0;

var log = req.log();
var error = req.error();
var warn = req.warn();
var suc = req.success();
var mode = _.mode;

tiny.on('done', ()=> {
  if (_.log.cool.finish == true) log.attention(`[COOLDOWN]: Has finished, waiting for new follow.`);
  cool = 0;
  return;
});

var time = [];
function seeTime() {
  var count = cooldown() + 1500;
  var end = new Date(new Date().getTime() + count);
  var timer = Countdown.timer(end, function(timeLeft) {
    time = [];
    time.push(`${timeLeft.minutes}:${timeLeft.seconds}`);
  }, function() {
      time = [];
      if (_.log.cool.finish == true) log.attention(`[TIMER]: Cooldown timer (TIME) has been reset`);
  });
}

function cooldown() {
  var time = _.cooldown.split(' ');
  if (time[1] == 'sec') return time[0] * 1000;
  if (time[1] == 'min') return time[0] * 60 * 1000;
};

var x = module.exports = {

  start: (web) => {
    x.check(web);
    setInterval(async function () {
      return x.check(web);
    }, _.log.cool.interval * 1000);
  },

  check: (web)=> {
    return start();
    async function start() {
      if (_.log.cool.debug == true && cool == 1) return log.attention(`[COOLDOWN]: Hot Hot Hot Hot.. TO HOT (${time})`);
      if (cool == 1) return;
      seeTime();
      var data = await sqlite.get(`select * from pending order by random() limit 1`);
      if (!data) return x.exit();
      if (_.log.cool.set == true) log.success(`[COOLDOWN]: Okey let's cool this place down !`);
      tiny.start(cooldown() + 1000, [1000]);
      cool = 1;
      return x.follow(web, data.author);
    };
  },

  follow: (web, author) => {
    var follower = _.user;
    var following = author;
    steem.api.setOptions({ url: web });
    var json = JSON.stringify(['follow', {
      follower: follower, following: following, what: ['blog']
    }]);

    if (mode == 'dry') {
          if (_.log.follow == true) log.success(`[FOLLOWING]: You are now following user [ ${author} ]`);
          return x.setDone(author);
    } else {
      steem.broadcast.customJson(_.wif, [], [follower], 'follow', json,
        function(err, result) {
          if (err && _.log.errors == true) return log.error(err);
          if (_.log.follow == true) log.success(`[FOLLOWING]: You are now following user [ ${author} ]`);
          return x.setDone(author);
        }
      );
    }
  },

  setDone: (author)=> {
    try {
      if (mode == 'dry') {
        if (_.log.dbInserts == true) log.info(`[DB INSERT]: Steemian [ ${author} ] is recorded as done`);
        return x.dbDelete(author);
      } else {
        sqlite.run(`insert into done (author) values ('${author}')`);
        if (_.log.dbInserts == true) log.info(`[DB INSERT]: Steemian [ ${author} ] is recorded as done`);
        return x.dbDelete(author);
      }
    } catch (err) {
      if (_.log.errors == true) return log.error(err);
    }
  },

  dbDelete: (author)=> {
    try {
      if (mode == 'dry') {
        if (_.log.follow == true) log.info(`[DB DELETE]: Steemian [ ${author} ] deleted out of Pending.`);
      } else {
        sqlite.run(`delete from pending where author = '${author}'`);
        if (_.log.follow == true) log.info(`[DB DELETE]: Steemian [ ${author} ] deleted out of Pending.`);
      }
    } catch (err) {
      if (_.log.errors == true) return log.error(err);
    }
  },

  exit: ()=> {
    if (mode == 'dry') return;
    log.error(error.noData());
    return process.exit();
  }

};
