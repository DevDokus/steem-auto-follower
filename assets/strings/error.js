// Error strings

module.exports = {

  user: () => {
    return `
--------------------------------------------------------
[ERROR]: No Steemit account user name set! Go to the
settings.js file, and fill in the missing information!
--------------------------------------------------------
`
},

wif: () => {
  return `
--------------------------------------------------------
[ERROR]: No [ PRIVATE POSTING KEY ] defined in the
settings.js. Please fill in the missing information!
--------------------------------------------------------
`
},

noData: () => {
  return `
--------------------------------------------------------
[ERROR]: You have selected [ Actor ] for your mode,
but there are no users stored in the database !
Please select [ Watcher ] to store new users.
Please select [ Superior ] to store and follow users.
--------------------------------------------------------
`
}

};
