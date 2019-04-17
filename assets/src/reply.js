//////////////////////////////////////////////////////////////////////////////
// Dont change any code below if you are not knowing what you are doing !
//////////////////////////////////////////////////////////////////////////////
const _ = require('../../settings');
const req = require('../functions/require.js');
const sqlite = require('sqlite');
const steem = require('steem');

var log = req.log();
var error = req.error();
var warn = req.warn();
var suc = req.success();
var con = _.log;
var mode = _.mode;

var x = module.exports = {

  start: (author) => {
    if (_.reply.blog == true) x.blog(author);
    if (_.reply.comment == true) x.comment(author);
  },

  blog: async function(author) {
    var dbGet = await sqlite.get(`select * from pending where author = '${author}' and type = 'blog'`);
    var data = JSON.parse(dbGet.data);
    var targetPermlink = data.targetPermlink;
    var link = steem.formatter.commentPermlink(author, targetPermlink);

    const o = [
      _.wif,
      author,
      targetPermlink,
      _.user,
      link,
      '',
      _.reply.msg,
      ''
    ];

    steem.broadcast.comment(o[0], o[1], o[2], o[3], o[4], o[5], o[6], o[7], function(err, result) {
      if (err && _.log.errors == true) return log.error(err)
      if (_.log.replies == true) log.success(suc.reply());
      return req.actor().setDone(author);
    });
  },


    comment: async function(author) {
      var dbGet = await sqlite.get(`select * from pending where author = '${author}' and type = 'comment'`);
      var data = JSON.parse(dbGet.data);
      var targetPermlink = data.targetPermlink;
      var link = steem.formatter.commentPermlink(author, targetPermlink);

      const o = [
        _.wif,
        author,
        targetPermlink,
        _.user,
        link,
        '',
        _.reply.msg,
        ''
      ];

      steem.broadcast.comment(o[0], o[1], o[2], o[3], o[4], o[5], o[6], o[7], function(err, result) {
        if (err && _.log.errors == true) return log.error(err)
        if (_.log.replies == true) log.success(suc.reply());
        return req.actor().setDone(author);
      });
    },


};
