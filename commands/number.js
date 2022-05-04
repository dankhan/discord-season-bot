/**
 * Set season number subcommand handler.
 *
 * Sets the new season number, writes it to the config, and updates the season number in the discord server.
 * 
 * @file   Set season number subcommand handler
 * @author LeanCTO
 * @since  1.0.0
 * @copyright (c) 2022 All rights reserved.
 * 
 */

// Discord slash command builder
const { SlashCommandSubcommandBuilder } = require('@discordjs/builders');

// Current timestamp
const { getCurrentTimestamp } = require ('../includes/utils.js');

// Include our application secret token and season config filename
const { seasonCategoryId, ephemeral } = require('../config.json');

// Include filesystem functions to write updated files back to server
const fs = require('fs');

// Setup the default export with the function body
module.exports = {
	data: new SlashCommandSubcommandBuilder()
        .setName('number')
        .setDescription('Sets a new season number in the server')
        .addIntegerOption(option => 
            option
                .setName('season')
                .setDescription('The new season number')
                .setRequired(true)),
    async execute(interaction) {
        
        // Save the old season
        const oldSeason = { ...interaction.client.seasonConfig}.season;
        
        // Get the new season from the option parameter
        const season = interaction.options.get('season').value;

        // Only update if changed
        if (season !== oldSeason) {
            // Update the cached config
            interaction.client.seasonConfig.season = season;

            // Write the value to config file so doesn't get lost at server reset
            fs.writeFile('season.json', JSON.stringify(interaction.client.seasonConfig), (error) => {
                if (error) console.error(error);
            });

            // Server message
            const ts = getCurrentTimestamp();
            console.log("\x1b[33m", `[${ts}] [${interaction.user.username}#${interaction.user.discriminator}] [setseason] [${season}] set new season number to ${season}`);
            console.log("\x1b[0m");

            // Update the presence string
            interaction.client.user.setActivity(`Season ${season}`, { type: 'WATCHING' });

            // Update the category name to current season (it's a channel so use channel functions)
		    let category = await interaction.client.channels.cache.get(seasonCategoryId);
		    category.setName(`Season ${season}`).catch(console.error);
		    console.log("\x1b[33m", `[${ts}] [ready] Updated season category name to 'Season ${season}'`);

            // Reply in server
            await interaction.reply({ content: `Current season is now ${season}`, ephemeral } );
        } else {
            await interaction.reply({ content: `Already season ${season}!`, ephemeral } );
        }
    },
};