import { Message, MessageEmbed } from "discord.js";
import { getAverageColor } from 'fast-average-color-node';
import { Track } from 'spotify-web-api-node';
import { spotify } from './spotify'
const spotifyWebApi = require('spotify-web-api-node')
const keys = ["C", "D♭", "D", "E♭", "E", "F", "G♭", "G", "A♭", "A", "B♭", "B"]

const getSongKey = (keyNumber: number): string => {
    if (typeof keyNumber != 'number') {
        throw new TypeError
    }
    if (keyNumber < 0 || keyNumber > 11) {
        throw new RangeError
    }
    let relativeMin = 0
    if (keyNumber < 3) {
        relativeMin = keyNumber + 9
    } else {
        relativeMin = keyNumber - 3
    }
    return `${keys[keyNumber]} Maj or ${keys[relativeMin]} Min`
},

const milliToMAndS = (millis: number): string => {
    const min = Math.floor(millis / 60000);
    const sec = ((millis % 60000) / 1000).toFixed(0);
    return min + ':' + (Number(sec) < 10 ? '0' : '') + sec;
}

const createSongEmbed = async (song: Track, message: Message) => {
    // let features = await spotify.getAudioFeaturesForTrack(song.id)
    // console.log(features)
    let features = await spotify.getAudioFeaturesForTrack(song.id)
    let artistNames = song.artists.map(artist => artist.name)
    let color = await (await getAverageColor(song.album.images[0].url)).value.slice(0, 3)
    const songEmbed = new MessageEmbed()
        .setColor(color)
        .setTitle(song.name)
        .setURL(song.external_urls.spotify)
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setDescription('by **' + artistNames.join(', ') + '**')
        .setImage(song.album.images[0].url)
        // .setThumbnail(message.author.avatarURL())
        .addFields(
            { name: 'Album', value: song.album.name, inline: true },
            { name: 'Year', value: song.album.release_date, inline: true },
            { name: 'Duration', value: milliToMAndS(song.duration_ms), inline: true },
            { name: "Tempo", value: features.body.tempo, inline: true },
            { name: "Key", value: getSongKey(features.body.key), inline: true },
            { name: "Acousticness", value: features.body.acousticness, inline: true },
            { name: "Danceability", value: features.body.danceability, inline: true },
            { name: "Energy", value: features.body.energy, inline: true },
            { name: "Instrumentalness", value: features.body.instrumentalness, inline: true },
            { name: "Speechiness", value: features.body.speechiness, inline: true },
            { name: "Liveness", value: features.body.liveness, inline: true },
            { name: "Valence", value: features.body.valence, inline: true },
        )
    // .setTimestamp()
    // .setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');
    return message.channel.send(songEmbed)
}

export { createSongEmbed };

