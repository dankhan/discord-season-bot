/**
 * Season bot for discord.
 *
 * Adds a set of [season] [subcommand] slash commands to the server, and handles the requests.
 * 
 * @file   Main application entry point
 * @author LeanCTO
 * @since  1.0.0
 * @copyright (c) 2022 All rights reserved.
 * 
 * ## Configuration
 * 
 * Done in two configuration files on the server:
 * 	 config.json - containing application and discord server specific ids
 *   season.json - acting as a simple DB/persisted storage for values set in the bot
 * 
 * 
 * ## Setup
 * 1. Ensure bot is setup as a developer app in https://discord.com/developers/applications
 * 2. Configure the bot to get the secret tokens for the config.json file
 * 3. Add the bot to the discord server and authorise the requested permissions https://discord.com/oauth2/authorize?client_id=[clientid]&permissions=8&scope=bot%20applications.commands
 * 4. Configure the bot permissions and visbility in the server - copy the server (guildId) in the config
 * 5. Setup a new chanel category which will be renamed to `[Season X]` - put the categoryid into the config
 * 6. Setup a new voice channel which will be used to show the season countdown timer and copy the channelid into the config
 * 7. Run `node ./deploy-commands.js` to setup the slash commands on the server
 * 8. Test everything is working by sending `/season config` slash command in the server
 */

// Include the discord dev framework
const { Client, Intents } = require('discord.js');

// Include our application config
const { token } = require('./config.json');

// Read in our current season config - e.g. {"season":0,"seasonEndDate":"6/30/2022"}
let { season, seasonEndDate } = require(`./season.json`);

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});

// Cache our seasonconfig in the client so other commands can access it
client.seasonConfig = { season, seasonEndDate };

// Load up all the supported bot commands and events
['command_handler', 'event_handler'].forEach(handler => {
	require(`./handlers/${handler}`)(client);
})

// Login to the season bot using the bot's private token
client.login(token);
