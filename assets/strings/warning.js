// Error strings

module.exports = {

  onComment: () => {
    return `
--------------------------------------------------------
[ATTENTION]: The option [ onComment ] in the settings.js
file, is set to [ false ]. This means that we [ NOT ]
follow any Steemit user! Currently, we will only gather
the Steemians data and store this in the database.
--------------------------------------------------------
Set the option [ onComment ] to [ true ] to enable follow.
--------------------------------------------------------
`
},

fastCooldown: () => {
  return `
--------------------------------------------------------
[ATTENTION]: The cooldown you have set is small!  There
is no problem, but depending on the amount of your
STEAM POWER. You might run out of resource credits.
--------------------------------------------------------
We recommend a cooldown of 15 minutes or longer.
--------------------------------------------------------
`
}

};
