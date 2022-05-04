/**
 * Slash Command Deploy Script.
 *
 * Deploy slash commands into the Discord server specified in the config file.
 * 
 * @file   Slash command deploy script
 * @author LeanCTO
 * @since  1.0.0
 * @copyright (c) 2022 All rights reserved.
 * 
 */
const fs = require('fs');

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const { clientId, guildId, token } = require('./config.json');

// Load the top-level command
const { command } = require('./command.js');

// Load all subcommands from the files in the commands folder
const subCommandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// Add each subcommand by loading in from file
for (const file of subCommandFiles) {
	const subCommand = require(`./commands/${file}`);
	command.addSubcommand(subCommand.data);
}

// Login to the API and setup these commands on the server - post array of commands as JSON
const rest = new REST({ version: '9' }).setToken(token);
rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: [ command.toJSON() ] })
	.then(() => console.log('Successfully registered application slash commands.'))
	.catch(console.error);