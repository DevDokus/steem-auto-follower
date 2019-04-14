////////////// DONT CHANGE THIS ///////////////////
var opt = {};
opt.log = {};
opt.log.cool = {};
///////////////////////////////////////////////////

opt.user = ''; //[1]
opt.wif = ''; //[2]
opt.webSocket = ''; //[3]
opt.onComment = true; //[4]
opt.cooldown = '15 min'; //[5]
opt.mode = 'superior'; //[6]

opt.log.follow = true; //[7]
opt.log.errors = true; //[8]
opt.log.dbInserts = true; //[9]
opt.log.dbCleans = false; //[10]
opt.log.dbDeletes = true; //[11]
opt.log.cool.finish = true; //[12]
opt.log.cool.set = true; //[13]

opt.log.cool.debug = true; //[14]
opt.log.cool.interval = 60; //[15]

/*
Help Guide:
[1]: Your own steemit account name -- without @ !
[2]: Your "Private posting Key" -- NOT PUBLIC
[3]: The RPC Node connection to the blockchain
[4]: Follow user when he or she makes a comment.
[5]: Set the cooldown between follows.

[6]: Mode to run the bot. There are 2 available modes.
 - watcher
 - actor
 - superior
 - dry

[7]: Log when you follow someone.
[8]: Log full error messages.
[9]: Log when we insert something into the database.
[10]: Log when we clean the database.
[11]: Log when we delete something from the database.
[12]: Log when the cooldown is finished.
[13]: Log when a new cooldown is set.
[14]: Log the cooldown debug messages.
[15]: Set the cooldown debug interval in seconds.


*/
/*


EXTRA INFO:

[3]: --- >>
The default RPC node rpc.steem.com. If you would
like a different webSocket you can define your own.
But you do not have to set anything to make it work !

[5] --- >>
The cooldown can be set in 2 different ways.
You can set it in minutes or in seconds.
Make sure to include 'min' or 'sec' !
 - '15 min'
 - '900 sec'

[8]: --- >>
Watcher: will only watch the blockchain and gather
the steemians usernames. This will be stored in the
database, so you can follow them later.

Actor: When set to actor the script will only start
to follow the steemians stored in the databse.
When actor is activated no new steemians will be stored.
Once the database is empty the script stops.

Superior: When set to superior we will gather the usernames
and at the same time we will follow the users that are stored
into the database.

Dry: When set to dry we will only show you a test version.
You will see the results in the console but no actions will
be taken on the Blockchain. This is for testing only.

*/

////////////// DONT CHANGE THIS ///////////////////
module.exports = opt;
///////////////////////////////////////////////////
