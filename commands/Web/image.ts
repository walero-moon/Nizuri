import * as Discord from 'discord.js';
import * as pagination from 'discord.js-pagination';
import * as unirest from 'unirest';
import { errColour } from '../../config.json';

const emoji: string[] = ['⏪', '⏩']
const timeout: string = '60000'

module.exports = {
	name: 'image',
	description: 'Searches for images on the internet.',
    aliases: ['im'],
    args: true,
    guildOnly: true,
    category: "Web",
    usage: "<Query>",
	cooldown: 10,
    execute(message: Discord.Message, args) {
        const query = args.join(' ');
        let req = unirest("GET", "https://bing-image-search1.p.rapidapi.com/images/search");

        req.query({
            "count": '10',
            "q": query
        });
        req.headers({
            "x-rapidapi-key": process.env.RAPIDKEY,
	        "x-rapidapi-host": process.env.RAPIDHOST,
	        "useQueryString": true
        });
        req.end((res) => {
            if (res.error) throw new Error(res.error);
        
            let results: any = res.body.value
            let embeds: any = []
            if (results.length > 0) {
                results.forEach((image) => {
                    const embed: Discord.MessageEmbed = new Discord.MessageEmbed()
                        .setAuthor(message.author.tag, message.author.displayAvatarURL())
                        .setTitle(`Results for "${query}"`)
                        .setDescription(image.name)
                        .setImage(image.contentUrl)
                        .setURL(image.hostPageUrl)
                    embeds.push(embed);
                })
                return pagination(message, embeds, emoji, timeout)
            } else {
                const embed: Discord.MessageEmbed = new Discord.MessageEmbed()
                    .setAuthor(message.author.tag, message.author.displayAvatarURL())
                    .setTitle(`Could not find results for "${query}"`)
                    .setColor(errColour)
                return message.channel.send(embed)
            }
        });
	},
};