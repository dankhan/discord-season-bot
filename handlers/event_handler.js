/**
 * Event handler.
 *
 * crates the events that this bot responds to, loading then from the events folder.
 * 
 * @file   Event handler
 * @author LeanCTO
 * @since  1.0.0
 * @copyright (c) 2022 All rights reserved.
 * 
 */

const fs = require('fs');

module.exports = (client) => {
    
    // load the event files
    const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

    // Parse each and set it up as a once or on event
    for (const file of eventFiles) {
	    const event = require(`../events/${file}`);
	
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        } else {
            client.on(event.name, (...args) => event.execute(...args));
        }
    }
}