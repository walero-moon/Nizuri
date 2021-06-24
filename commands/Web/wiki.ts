import * as Discord from 'discord.js';
import * as fetch from 'node-fetch'
import { errColour } from '../../config.json'

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
        try {
            if (!response.ok) {
                const error: Discord.MessageEmbed = new Discord.MessageEmbed()
                    .setTitle('Error while getting an article. Please contact the dev.')
                    .setColor(errColour)
                    .setFooter('Use [,user 192358823174864896] to get the developer\'s Discord')
                return message.channel.send(error)
            }
            const json = await response.json()
            console.log(json.query.search)
    
            if (!json.query.search[0]) {
                const error: Discord.MessageEmbed = new Discord.MessageEmbed()
                .setTitle('Could not find article')
                .setColor(errColour)
            return message.channel.send(error)
            }
    
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
        } catch (err) {
            const error: Discord.MessageEmbed = new Discord.MessageEmbed()
                    .setTitle('Error while getting an article. Please contact the dev.')
                    .setDescription(err)
                    .setColor(errColour)
                    .setFooter('Use [,user 192358823174864896] to get the developer\'s Discord')
            console.log(err)
            return message.channel.send(error)
        }
	},
};