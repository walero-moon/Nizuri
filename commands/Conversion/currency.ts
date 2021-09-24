import * as Discord from 'discord.js';
import { errColour, successColour, currconv } from '../../config.json';
import * as NodeCache from'node-cache';
import * as fetch from 'node-fetch';
const cache: NodeCache = new NodeCache();
const endpoint: string = "https://free.currconv.com/api/v7/convert?"

async function makeRequest(fromCurrency: string, toCurrency: string) {
    const search: string = endpoint + 
        new URLSearchParams({
            apiKey: process.env.CURRCONV || currconv,
            q: `${fromCurrency}_${toCurrency}`,
            compact: 'y'
        })
    const response = await fetch(search)
    return response
}

const makeEmbed = (message: Discord.Message, fromCurrency: string, fromValue: string,
                  toCurrency: string, value: number): Discord.MessageEmbed => {

    const embed: Discord.MessageEmbed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())

    if (fromValue) {
        let converted: number = (Number(fromValue) * value)
        converted = Math.round((converted + Number.EPSILON) * 100) / 100
        embed.setTitle(`${converted} ${toCurrency}`)
    } else {
        embed.setTitle(`${value} ${toCurrency}`)
    }
    embed.setDescription(`1 ${fromCurrency} = ${value} ${toCurrency}`)
    embed.setFooter('Values updated every hour. Not live exchange.')
    embed.setColor(successColour)
    embed.setTimestamp()
    return embed
}

module.exports = {
	name: 'exchange',
	description: 'Converts from one currency to another.',
    args: true,
	aliases: ['coin', 'money', 'currency', 'ex'],
    guildOnly: false,
    category: "Conversion",
    usage: "[<amount>]<from currency> <to currency>",
	cooldown: 10,
    async execute(message: Discord.Message, args) {
        if (args.length < 2) {
            const embed: Discord.MessageEmbed = new Discord.MessageEmbed()
                .setColor(errColour)
                .setAuthor(message.author.tag, message.author.displayAvatarURL({ format: 'png', dynamic: true }))
                .setTitle(`Missing arguments`)
                .setDescription(`**Usage: \`,exchange ${this.usage}\`**`)
            return message.channel.send(embed);
        }

        let from: any = args[0].toUpperCase()
        let fromValue: string = from.match(/\d+/)
        if (fromValue) fromValue = fromValue[0]

        let fromCurrency: string = from.match(/[a-zA-Z]/g).join('')
        let toCurrency: string = args[1].toUpperCase()

        let inCache = cache.get(`${fromCurrency}_${toCurrency}`)
        if (inCache) {
            const value: number = Number(inCache)
            const embed: Discord.MessageEmbed = makeEmbed(message, fromCurrency, fromValue, toCurrency, value)
            console.log("Taking currency from cache")
            return message.channel.send(embed)
        } else {
            const response = await makeRequest(fromCurrency, toCurrency)
            if (!response.ok) {
                const error: Discord.MessageEmbed = new Discord.MessageEmbed()
                    .setTitle('Error while converting currency. Please contact the dev.')
                    .setColor(errColour)
                    .setFooter('Use [,user 192358823174864896] to get the developer\'s Discord')
                return message.channel.send(error)
            }
            const json = await response.json()
            try {
                const value: number = json[`${fromCurrency}_${toCurrency}`].val
                cache.set(`${fromCurrency}_${toCurrency}`, value, 3600)
                const embed: Discord.MessageEmbed = makeEmbed(message, fromCurrency, fromValue, toCurrency, value)
                return message.channel.send(embed)
            } catch {
                const embed: Discord.MessageEmbed = new Discord.MessageEmbed()
                    .setAuthor(message.author.tag, message.author.displayAvatarURL())
                    .setColor(errColour)
                    .setDescription("Invalid currencies entered.")
                return message.channel.send(embed)
            }
        }
	},
};