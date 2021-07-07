
import * as Discord from 'discord.js';
import { Search } from 'spotify-web-api-node';
import { noImageFound } from '../../config.json'
import { spotify } from './lib/spotify';
import { config } from 'process';
const pagination = require('discord.js-pagination');
const SpotifyWebApi = require('spotify-web-api-node')


const emoji: string[] = ['⏪', '⏩']
const timeout: string = '1800000'
// 0 - 3 // 0 is highest quality 
const prefImgQlty: number = 1



module.exports = {
    name: 'artist',
    description: 'Gets artist information from spotify',
    aliases: ['findartist'],
    args: true,
    guildOnly: false,
    category: "Spotify",
    usage: "<Search>",
    cooldown: 5,
    async execute(message: Discord.Message, args: string[]) {
        let search: Search = await spotify.searchArtists(args.join(' '))
        // let artistIDs: string[] = search.body.artists.items.map(artist => artist.id)
        // artistIDs.forEach((id) =>{

        // })
        let embeds: Discord.MessageEmbed[] = []
        Object.values(search.body.artists.items).forEach(artist => {
            console.log(JSON.stringify(artist, undefined, 3))

            let artistImage: string
            if (artist.images.length > 0) artistImage = artist.images[prefImgQlty].url
            else artistImage = noImageFound

            let genres: string
            if (artist.genres.length > 0) genres = artist.genres.join(', ')
            else genres = "N/A"

            const embed = new Discord.MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setTitle(artist.name)
                .setDescription(' ')
                .setImage(artistImage)
                .addField('Popularity', artist.popularity, true)
                .addField('Followers', artist.followers.total, true)
                .addField("Genres", genres)
                //.addField('Top Tracks', 'test')
                .setURL(artist.external_urls.spotify)
            embeds.push(embed);
        })
        return pagination(message, embeds, emoji, timeout)
    }
}
