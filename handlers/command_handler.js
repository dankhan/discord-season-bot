/**
 * Command handler.
 *
 * creates the commands this bot supports, loading them from the commands folder.
 * 
 * @file   Command handler
 * @author LeanCTO
 * @since  1.0.0
 * @copyright (c) 2022 All rights reserved.
 * 
 */

// Handler to load all supported commands into the bot
const { Collection } = require('discord.js');

// Include filesystem functions
const fs = require('fs');

// Load the top-level command
const { command } = require('../command.js');

module.exports = (client) => {
    // Create a collection of the subcommands, and their respective execute functions
    client.commands = new Collection();

    // Load all subcommands from the files in the commands folder
    const subCommandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

    // Add each subcommand by loading in from file
    for (const file of subCommandFiles) {
        const subCommand = require(`../commands/${file}`);
        command.addSubcommand(subCommand.data);

        // Add the subcommand and it's execute function to the collection
        client.commands.set(subCommand.data.name, subCommand);
    }
}