# Discord Season Bot

This bot will display the current season in the bot activity presence:

![Activity](/docs/assets/activity.png?raw=true "Activity")

It will update the season category name to represent the current season number.
And it will update a channel name to show a countdown timer (both in days, and in hours when < 2 days)

![Channels](/docs/assets/channels.png?raw=true "Channels")

It adds a set of `[season] [subcommand]` slash commands to the server, and handles the requests.

![Messages](/docs/assets/messages.png?raw=true "Messages")

## Configuration

Done in two configuration files on the server:
 * 	 config.json - containing application and discord server specific ids
 *   season.json - acting as a simple DB/persisted storage for values set in the bot
 
### config.json ###
```
{
	"clientId": "<your-client-id>",                 // the bot client id
	"guildId": "<your-guild-id>",                   // the discord server id you are adding the bot to
	"seasonCategoryId": "<your-category-id>",       // the channel category id in your discord server for the season channel info
	"daysRemainingChannelId": "<your-channel-id>",  // the channel id in discord your server for the season countdown timer
	"token": "<your-discord-token>",                // the bot's secret access token
	"ephemeral": false,                             // whether messages are visible channel-wide or jut by the individual
	"commandName": "season",                        // the top-level slash command this bot uses
	"updateInterval": "300000"                      // how many ms does the countdown timer refresh the channel name (note: discord rate limited)
}
```

### season.json ###
```
{
     "season": <integer>,                           // the season number to set in the server
     "seasonEndDate": "<string mm/dd/yyyy>"         // the season end date used to show the countdown timer
}
```

## Installation

* Ensure bot is setup as a developer app in https://discord.com/developers/applications
* Configure the bot to get the secret tokens for the config.json file
* Add the bot to the discord server and authorise the requested permissions https://discord.com/oauth2/authorize?client_id=[clientid]&permissions=8&scope=bot%20applications.commands
* Configure the bot permissions and visbility in the server - copy the server (guildId) in the config
* Setup a new chanel category which will be renamed to `[Season X]` - put the categoryid into the config
* Setup a new voice channel which will be used to show the season countdown timer and copy the channelid into the config
* Run `node ./deploy-commands.js` to setup the slash commands on the server
* Test everything is working by sending `/season config` slash command in the server

## Commands

All commands are setup as slash commands on the discord server under a single top-level command - `/season`.

Slash commands can be called using `/season [subcommand]` format.
 
The following slash commands are currently supported:

| Slash Command | Sub command | parameter         | Description                                                                       |
|---------------|-------------|-------------------|-----------------------------------------------------------------------------------|
| `/season`     | `config`    | <none>            | Gets the current season config and outputs it back to the discord server.         |
|               | `enddate`   | string (mm/dd/yy) | Sets the new season end date, updates the config, and updates the discord server. |
|               | `number`    | integer           | Sets the new season number, updates the config and the discord server.            |

## Events

Additionally, a number of events are setup to respond to server events.

| Event                       | Description                                                                 |
|-----------------------------|-----------------------------------------------------------------------------|
| `client.ready`              | OnReady event handler for when the client connection to discord is complete |
| `client.interactionCreate`  | interactionCreate event handler for when the bot receives a message         |
