
import * as Discord from 'discord.js';
const SpotifyWebApi = require('spotify-web-api-node')

import { Menu } from 'discord.js-menu'
import { Track, Search, Album, Artist } from 'spotify-web-api-node';
import { generateSongSearchMenu } from './lib/menu'
import { spotify } from './lib/spotify'
module.exports = {
    name: 'song',
    description: 'Gets track information from spotify',
    aliases: ['findsong'],
    args: true,
    guildOnly: false,
    category: "Spotify",
    usage: "<Search>",
    cooldown: 5,
    async execute(message: Discord.Message, args) {
        const search: Search = await spotify.searchTracks(args.join(' '))
        // a page contains a section of 5 search results
        let menu: Menu = generateSongSearchMenu(search, 5, message, args)
        menu.start()
    }
}
