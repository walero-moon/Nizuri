
import * as Discord from 'discord.js';
import { Search } from 'spotify-web-api-node';
import { spotify } from './lib/spotify';
const pagination = require('discord.js-pagination');
const SpotifyWebApi = require('spotify-web-api-node')


const emoji: string[] = ['⏪', '⏩']
const timeout: string = '60000'



module.exports = {
    name: 'artist',
    description: 'Gets artist information from spotify',
    aliases: ['findartist'],
    args: true,
    guildOnly: false,
    category: "Spotify",
    usage: "<Search>",
    cooldown: 5,
    async execute(message: Discord.Message, args) {
        const search: Search = await spotify.searchArtists(args.join(' '))
        let embeds: Discord.MessageEmbed[] = []
        Object.values(search.body.artists.items).forEach(artist => {
            const embed = new Discord.MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setTitle(`Results for "${args.join(' ')}"`)
                .setDescription(artist.name)
                .setImage(artist.images[0].url)
                .setURL(artist.external_urls.spotify)
            embeds.push(embed);
        })
        return pagination(message, embeds, emoji, timeout)
    }
}
