import { MessageEmbed, ColorResolvable, Message } from "discord.js"
import { Track, Search, Album, Artist } from 'spotify-web-api-node';
const spotifyWebApi = require('spotify-web-api-node')
import { getAverageColor } from 'fast-average-color-node';
import { spotify } from './spotify'

const createSongEmbed = (song: Track, message: Message) =>  {
    // let features = await spotify.getAudioFeaturesForTrack(song.id)
    // console.log(features)
    let color: any
    let r, g, b: number
    getAverageColor(song.album.images[0].url).then(c => {
        color = c.value.slice(0, 3)
        r = c.value[0]
        g = c.value[1]
        b = c.value[2]
    });
    let artistNames = song.artists.map(artist => artist.name)
    const songEmbed = new MessageEmbed()
        .setColor([r, g, b])
        .setTitle(song.name)
        .setURL(song.external_urls.spotify)
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setDescription('by ' + artistNames.join(', '))
        .setThumbnail(message.author.avatarURL())
        .addFields(
            { name: 'Album', value: song.album.name, inline: true },
            { name: 'Year', value: song.album.release_date, inline: true },
            { name: 'Duration', value: song.duration_ms, inline: true },
        )
        .addField('Inline field title', 'Some value here', true)
        .setImage('https://i.imgur.com/wSTFkRM.png')
        .setTimestamp()
        .setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');
    return songEmbed
}

export { createSongEmbed }