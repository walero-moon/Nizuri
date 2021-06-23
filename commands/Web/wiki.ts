import * as Discord from 'discord.js';
import * as fetch from 'node-fetch'

module.exports = {
	name: 'wiki',
	description: 'Searches for a Wikipedia article and returns a short summary.',
    aliases: ['wiki'],
    args: true,
    guildOnly: false,
    category: "Web",
    usage: "<Query>",
	cooldown: 7,
    async execute(message: Discord.Message, args) {
        const endpoint: string = 'https://en.wikipedia.org/w/api.php?'
        const search: string = endpoint +
            new URLSearchParams({
                action: 'query',
                list: 'search',
                inprop: 'url',
                utf8: 'true',
                format: 'json',
                origin: '*',
                srlimit: '20',
                srsearch: args.join('_')
            })
        const response = await fetch(search)
        console.log

        if (!response.ok) {
            message.channel.send('Error getting that article')
        }
        const json = await response.json()

        if (!json.query.search[0]) return message.channel.send('Could not find article')

        const page = endpoint + 
            new URLSearchParams({
                action: "query",
                titles: json.query.search[0].title,
                format: "json",
                prop: "extracts",
                exsentences: '3',
                exintro: 'true',
                explaintext: 'true'
            })
        const result = await fetch(page)
        const rjson = await result.json()
        const summary = rjson.query.pages[Object.keys(rjson.query.pages)].extract.split('\n').join('\n\n')

        const pageImages = endpoint + 
            new URLSearchParams({
                action: "query",
                pageids: json.query.search[0].pageid,
                prop: "pageimages",
                pithumbsize: '200',
                format: "json",
            })
        const images = await fetch(pageImages)
        const ijson = await images.json()
        const image = ijson.query.pages[Object.keys(ijson.query.pages)].thumbnail
        const url = `https://en.wikipedia.org/wiki/${json.query.search[0].title.replace(/ /g, '_')}`

        const embed: Discord.MessageEmbed = new Discord.MessageEmbed()
            .setTitle(json.query.search[0].title)
            .setURL(url)
            .setFooter('From Wikipedia, the free encyclopedia')
            .setDescription(summary)
        if (image) embed.setThumbnail(image.source)
        message.channel.send(embed)
	},
};