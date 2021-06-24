import * as Discord from 'discord.js'
import * as Qty from 'js-quantities'
import { errColour, successColour } from '../../config.json'

module.exports = {
	name: 'convert',
	description: 'Converts from one unit to another.',
    args: true,
	aliases: ['unit'],
    guildOnly: false,
    category: "Conversion",
    usage: "<10m> <ft>",
	cooldown: 1,
    execute(message: Discord.Message, args) {
        if (args.length < 2) {
            const embed: Discord.MessageEmbed = new Discord.MessageEmbed()
                .setColor(errColour)
                .setAuthor(message.author.tag, message.author.displayAvatarURL({ format: 'png', dynamic: true }))
                .setTitle(`Missing arguments`)
                .setDescription(`**Usage: \`,convert ${this.usage}\`**`)
            return message.channel.send(embed);
        }

        let from: any = args[0].toLowerCase()
        // Checks to see if it's temperature
        let fromValue = from.match(/\d+/)[0]
        let fromUnit = from.match(/[a-zA-Z]/g).join()
        if (fromUnit === 'c' || fromUnit === 'f') {
            from = fromValue + 'temp' + fromUnit.toUpperCase()
        }

        from = Qty.parse(from);
        if (!from) {
            const embed: Discord.MessageEmbed = new Discord.MessageEmbed()
                .setColor(errColour)
                .setAuthor(message.author.tag, message.author.displayAvatarURL({ format: 'png', dynamic: true }))
                .setTitle(`Invalid first argument`)
                .setDescription(`**Usage: \`,convert ${this.usage}\`**`)
            return message.channel.send(embed);
        }

        let to: string = args[1].toLowerCase();
        // Checks if to unit is temperature
        if (to === 'f' || to === 'c') {
            to = 'temp' + to.toUpperCase()
        }
        
        try {
            let result = from.to(to);
            result = result.toPrec(0.01).toString();
            // Checks if it's temperature
            if (result.includes('temp')) {
                const resultUnit = "º" + result.slice(-1);
                const fromUnit = "º" + from.toString().slice(-1);
                result = result.slice(0, -5) + resultUnit;
                from = from.toString().slice(0, -5) + fromUnit;
            }

            const embed: Discord.MessageEmbed = new Discord.MessageEmbed()
                .setColor(successColour)
                .setTitle(`${from} is ${result}`)
            return message.channel.send(embed);

        } catch (err) {
            const embed: Discord.MessageEmbed = new Discord.MessageEmbed()
                .setColor(errColour)
                .setAuthor(message.author.tag, message.author.displayAvatarURL({ format: 'png', dynamic: true }))
                .setTitle(`Cannot convert ${from} to ${to}.`)
                .setDescription(`**Please use valid units.**\n Usage: \`,convert ${this.usage}\``)
            return message.channel.send(embed);
        }
	},
};