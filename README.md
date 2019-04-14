# Steem Auto Follower
This program will auto follow Steemians for you! <br>
Build your following by following others. <br>
This program is highly customizable.  <br>

<b> NOTE: This program is currently under development!</b><br>
The scripts are working but we are still cleaning it up a bit,<br>
and making more features into it for the future.<br>
So come back later for more features !
<hr>

### Contact the developer:
| Platform | Value | Username | Chance of Reply |
|---|---|---|---|
| Steemit | https://steemit.com/@devske/ | Devske | On Blogs Only |
| Discord | https://discord.gg/AdCZUFA | @Devske#0895 | Best Option |
| Email | devske@outlook.com | ---- | Good Option |

<hr>

## How to start the script ?
When you have installed the dependencies via the **install.bat**, <br>
and when you have set all parameters in the **settings.js**, <br>
you can simply double click and activate the **start.bat** <br>
and enjoy the magic happening!

<hr>

## How to install
* First, you need to make sure to install **NodeJS**. <br>
This version was made and tested with **v10.15.3** <br>
https://nodejs.org/dist/v10.15.3/

* After you installed node you need to extract <br>
the *.rar* file Github will provide you.

* Click on the **install.bat** file. <br>
This will install the node dependencies.
<hr>

## How to set up the script?
1. Open the **Settings.js** with a code editor of choice.
2. [user] Set your Steemit account name.
3. [wif] Set your Steemit "Private Posting Key"
4. Set the rest of the parameters.
All info about the parameters you will find in the file.

#### Below the available options
| Options | Value | Type | Description |
| --- | --- | --- | --- |
| user | AccountName | string | Set your account name |
| wif | PP Key | string | Set your Private Posting Key |
| webSocket | Optional | string | Set your own RPC Node |
| cooldown | 1 min / 60 sec | string | Set cooldown between follows |
| mode | dry watcher actor superior | string | Set the run mode |
| log.follow | true false | Boolean | Log when you follow a user |
| log.errors | true false | Boolean | Log detailed errors |
| log.dbInserts | true false | Boolean | Log when we insert something into the DB. |
| log.dbCleans | true false | Boolean | Log when we clean the DB. |
| log.dbDeletes | true false | Boolean | Log when we delete something from the DB |
| log.cool.finish | true false | Boolean | Log when the cooldown has finished |
| log.cool.set | true false | Boolean | Log when an new cooldown has been set |
| log.cool.debug | true false | Boolean | Log the cooldown debug messages. |
| log.cool.interval | true false | Boolean | Set the cooldown debug interval in seconds. |
<hr>
