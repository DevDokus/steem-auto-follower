// Require
module.exports = {

  log: () => {
    return require('./log.js');
  },

  credits: () => {
    return require('../src/credits.js');
  },

  index: () => {
    return require('../src/index.js');
  },

  post: () => {
    return require('../src/post.js');
  },

  comment: () => {
    return require('../src/comment.js');
  },

  actor: () => {
    return require('../src/actor.js');
  },

  error: () => {
    return require('../strings/error.js');
  },

  warn: () => {
    return require('../strings/warning.js');
  },

  success: () => {
    return require('../strings/success.js');
  },

  reply: () => {
    return require('../src/reply.js');
  }


};
