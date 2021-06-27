
import * as Discord from 'discord.js';
const SpotifyWebApi = require('spotify-web-api-node')

import { Menu } from 'discord.js-menu'
import { Track, Search, Album, Artist } from 'spotify-web-api-node';
import { errColour, successColour } from '../../config.json';
import { generateSongSearchMenu } from './lib/menu'
const spotifyApi = new SpotifyWebApi({
    clientId: '4c97a767dfef4d8995b21674541ae6de',
    clientSecret: '9fda595e33ac42248c9ed0547f496d6d',
});

// Retrieve an access token
spotifyApi.clientCredentialsGrant().then(
    function (data) {
        console.log('The access token expires in ' + data.body['expires_in']);
        console.log('The access token is ' + data.body['access_token']);

        // Save the access token so that it's used in future calls
        spotifyApi.setAccessToken(data.body['access_token']);
    },
    function (err) {
        console.log(
            'Something went wrong when retrieving an access token',
            err.message
        );
    }
);

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
        const search: Search = await spotifyApi.searchTracks(args.join(' '))
        // a page contains a section of 5 search results
        let menu: Menu = generateSongSearchMenu(search, 5, message, args)
        menu.start()
    }
}
