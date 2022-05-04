/**
 * Get current season config subcommand handler.
 *
 * Gets the current season config from the season.json file and outputs it back to the discord server.
 * 
 * @file   Get current season config subcommand handler
 * @author LeanCTO
 * @since  1.0.0
 * @copyright (c) 2022 All rights reserved.
 * 
 */

// Discord slash command builder
const { SlashCommandSubcommandBuilder } = require('@discordjs/builders');

// Include our application secret token and season config filename
const { ephemeral } = require('../config.json');

// Current timestamp
const { getCurrentTimestamp, daysDiff } = require ('../includes/utils.js');

// Setup the default export with the function body
module.exports = {
	data: new SlashCommandSubcommandBuilder()
        .setName('config')
        .setDescription('Gets the current season config on the server'),
    async execute(interaction) {
        
        // Server message
        const ts = getCurrentTimestamp();
        console.log("\x1b[33m", `[${ts}] [${interaction.user.username}#${interaction.user.discriminator}] [seasonconfig] Season config requested`);
        console.log("\x1b[0m");

        // Get the number of days remaining
        const { numDays, numHours } = daysDiff(new Date(), interaction.client.seasonConfig.seasonEndDate);

        // Reply in server
        await interaction.reply({ content: "Current season config:\n```Season = "+interaction.client.seasonConfig.season+"\nSeason End Date = "+interaction.client.seasonConfig.seasonEndDate+"\nDays until season end = "+numDays+"\nHours until season end = "+numHours+"```", ephemeral } );
    },
};