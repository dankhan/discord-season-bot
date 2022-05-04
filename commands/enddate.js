/**
 * Set season end date subcommand handler.
 *
 * Sets the new season end date, writes it to the config, and updates the days remaining channel name in the discord server.
 * 
 * @file   Set season end date subcommand handler
 * @author LeanCTO
 * @since  1.0.0
 * @copyright (c) 2022 All rights reserved.
 * 
 */

// Discord slash command builder
const { SlashCommandSubcommandBuilder } = require('@discordjs/builders');

// Get the season config file name so we can write back changes
const { daysRemainingChannelId, ephemeral } = require('../config.json');

// Current timestamp
const { getCurrentTimestamp, daysDiff } = require ('../includes/utils.js');

// Include filesystem functions to write updated files back to server
const fs = require('fs');

// Setup the default export with the function body
module.exports = {
	data: new SlashCommandSubcommandBuilder()
        .setName('enddate')
        .setDescription('Sets a new season end date (mm/dd/yy) in the server')
        .addStringOption(option => 
            option
                .setName('date')
                .setDescription('The new season end date (mm/yy/dd)')
                .setRequired(true)),
    async execute(interaction) {
        
        // Save the old season end date
        const oldSeasonEndDate = { ...interaction.client.seasonConfig}.seasonEndDate;
        
        // Get the new season end date from the option parameter
        const seasonEndDate = interaction.options.get('date').value;

        // Check valid date format for new date
        const dt = new Date(seasonEndDate);
        if (null === seasonEndDate.match(/^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/) || isNaN(dt.valueOf())) {
            await interaction.reply({ content: 'Invalid date format, please enter a date in (mm/dd/yy) format', ephemeral } );
            return;
        }

        // Only update if changed
        if (seasonEndDate !== oldSeasonEndDate) {
            // Update the cached config
            interaction.client.seasonConfig.seasonEndDate = seasonEndDate;

            // Write the new config file so doesn't get lost at server reset
            fs.writeFile('season.json', JSON.stringify(interaction.client.seasonConfig), (error) => {
                if (error) console.error(error);
            });

            // Server message
            let ts = getCurrentTimestamp();
            console.log("\x1b[33m", `[${ts}] [${interaction.user.username}#${interaction.user.discriminator}] [setseasonend] [${seasonEndDate}] set new season end date to ${seasonEndDate}`);
            console.log("\x1b[0m");

            // Get the days remaining channel
		    const channel = await interaction.client.channels.cache.get(daysRemainingChannelId);
        
            // Update the new days remaining message
            const { numDays, numHours } = daysDiff(new Date(), interaction.client.seasonConfig.seasonEndDate);

		    // Only update the channel name if it's changed
		    ts = getCurrentTimestamp();

            // Update the channel name
            if (numDays < 0) {
				channel.setName('📅｜Season finished');
				console.log("\x1b[33m", `[${ts}] [interval] Updated daysRemaining channel name to 'Season finished'`);
			} else if (numDays < 2) {
				channel.setName(`📅｜${numHours} hours left...`);
				console.log("\x1b[33m", `[${ts}] [interval] Updated daysRemaining channel name to '${numHours} hours left...'`);
			} else {
				channel.setName(`📅｜${numDays} days left...`);
				console.log("\x1b[33m", `[${ts}] [interval] Updated daysRemaining channel name to '${numDays} days left...'`);
			}

            // Reply in server
            await interaction.reply({ content: `Current season end date is now ${seasonEndDate}`, ephemeral } );
        } else {
            await interaction.reply({ content: `Season end date is already ${seasonEndDate}!`, ephemeral } );
        }
    },
};