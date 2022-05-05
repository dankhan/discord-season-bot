/**
 * OnReady event handler for when the client connection to discord is complete
 *
 * Performs a number of setup activities and ensures the season-specific channels are correct based on the season.config
 * 
 * @file   OnReady Event handler
 * @author LeanCTO
 * @since  1.0.0
 * @copyright (c) 2022 All rights reserved.
 * 
 */

// Get the season config file name so we can write back changes
const { seasonCategoryId, daysRemainingChannelId, updateInterval } = require('../config.json');

// Current timestamp
const { getCurrentTimestamp, daysDiff } = require ('../includes/utils.js');

// Read in our current season config
let { season, seasonEndDate } = require('../season.json');

// Get current timestamp
let ts = getCurrentTimestamp();

// Allow access to filesystem to reload config file
const fs = require('fs');

// Track last number of hours so we know when to update channel name
let lastNumHours = '';

// Function to read season config from file and update channel name
let channel = undefined;
const updateChannelName = async () => {
	// Read in the latest season config
	seasonConfig = JSON.parse(fs.readFileSync('./season.json'));

	// Calculate the number of days remaining in the season
	if (seasonConfig.seasonEndDate && channel) {
		const { numDays, numHours, numWeeks } = daysDiff(new Date(), seasonConfig.seasonEndDate);

		// Only update the channel name if it's changed
		if (numHours !== lastNumHours) {

			// Get current timestamp
			let ts = getCurrentTimestamp();

			// Update the channel name
			if (numDays < 0) {
				channel.setName('📅｜Season finished');
				console.log("\x1b[33m", `[${ts}] [interval] Updated daysRemaining channel name to 'Season finished'`);
			} else if (numDays < 2) {
				channel.setName(`📅｜${numHours} hours left...`);
				console.log("\x1b[33m", `[${ts}] [interval] Updated daysRemaining channel name to '${numHours} hours left...'`);
			} else if (numWeeks > 3) {
				channel.setName(`📅｜${numWeeks} weeks left...`);
				console.log("\x1b[33m", `[${ts}] [interval] Updated daysRemaining channel name to '${numWeeks} weeks left...'`);
			} else {
				channel.setName(`📅｜${numDays} days left...`);
				console.log("\x1b[33m", `[${ts}] [interval] Updated daysRemaining channel name to '${numDays} days left...'`);
			}

			// Set the last updated values
			lastNumHours = numHours;
		}
	}
};

module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		console.log("\x1b[33m", `[${ts}] [ready] ${client.user.username} is online!`);
		console.log("\x1b[33m", `[${ts}] [ready] Season config is [season: ${season}, seasonEndDate: ${seasonEndDate}]`);

		// Set the bot's activity to the season #
        client.user.setActivity(`Season ${season}`, { type: 'WATCHING' });
		console.log("\x1b[33m", `[${ts}] [ready] Updated bot activity to 'Watching season ${season}'`);

		// Update the category name to current season (it's a channel so use same functions)
		let category = await client.channels.cache.get(seasonCategoryId);
		category.setName(`Season ${season}`).catch(console.error);
		console.log("\x1b[33m", `[${ts}] [ready] Updated season category name to 'Season ${season}'`);

		// Get the days remaining channel
		channel = await client.channels.cache.get(daysRemainingChannelId);
		
		// Setup an interval to update the channel name
		updateChannelName();
		setInterval(updateChannelName, updateInterval);
	},
};