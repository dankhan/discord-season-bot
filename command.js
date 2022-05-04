/**
 * Top-level bot command script.
 *
 * The bot setsup a single slash comand, and all other commands are subcommands of this.
 * 
 * @file   Top-level bot command script
 * @author LeanCTO
 * @since  1.0.0
 * @copyright (c) 2022 All rights reserved.
 * 
 */
const { SlashCommandBuilder } = require('@discordjs/builders');
const { commandName } = require('./config.json');

// We build top level season command and add the other commands as subcommands under that command keyword
module.exports = {
	command: new SlashCommandBuilder()
	    .setName(commandName)
	    .setDescription('Get or set information about the current season in the server')
	    .setDefaultPermission(false)
};