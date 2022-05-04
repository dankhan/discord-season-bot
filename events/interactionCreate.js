/**
 * interactionCreate event handler for when the bot receives a message
 *
 * checks the interaction is a command and executes the relevant subcommand handler
 * 
 * @file   interactionCreate Event handler
 * @author LeanCTO
 * @since  1.0.0
 * @copyright (c) 2022 All rights reserved.
 * 
 */

// Include our application secret token and season config filename
const { ephemeral } = require('../config.json');

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		// Only execute commands
		if (!interaction.isCommand()) return;
    
		// Check if the (sub)command exists
		const command = interaction.client.commands.get(interaction.options.getSubcommand());
		if (!command) return;
	
		try {		
			// Execute the command
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: 'There was an error while executing this command', ephemeral });
		}
	},
};