import * as Discord from 'discord.js';
import * as Dice from './libFiles/dice';
import { errColour } from '../../config.json'

module.exports = {
	name: 'roll',
	description: 'Rolls the amount of dices specified and performs the provided operations',
	aliases: ['r', 'dice', 'd'],
    args: true,
    guildOnly: false,
    category: "Random",
    usage: "[<dice amount>]d<dice size> [<operation> <number>]",
	cooldown: 0.05,
    execute(message: Discord.Message, args) {
        const dices: any[] = args[0].split('d');

        // Catch too many dice
        if (dices[0] > 200) {
            const embed: Discord.MessageEmbed = new Discord.MessageEmbed()
                .setColor(errColour)
                .setTitle('Too many dice to roll')
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
            return message.channel.send(embed)
        }
        // Catch invalid usage
        if (dices.length === 1 || (args[1] && !args[2])) {
            const embed: Discord.MessageEmbed = new Discord.MessageEmbed()
                .setColor(errColour)
                .setTitle('Invalid usage')
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setDescription(`\`${this.usage}\`\n**Parameters inside [ ] are optional.**\n`)
                .addFields(
                    { name: 'Example 1', value: '\`,r d20\`', inline: true},
                    { name: 'Example 2', value: '\`,r d8 + 6\`', inline: true},
                    { name: 'Example 3', value: '\`,r 2d10\`', inline: true},
                    { name: 'Example 4', value: '\`,r 3d20 + 3\`', inline: true},
                )
            return message.channel.send(embed)
        }
        
        const result: number[] = Dice.roll(dices[1], dices[0]); // Get dices
        const totalDice: number = result.reduce((a, b) => a + b); // Sum dices
        const diceEquation: string = `${result.join(' + ')} = ${totalDice}` // Make display equation

        let total: number = totalDice
        let finalEquation: string = diceEquation
        const embed: Discord.MessageEmbed = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setTitle(total)
            .setThumbnail('https://cdn.discordapp.com/attachments/609579101858037794/721879458725756999/download.png')

        if (args[1] && args[2]) {
            args[0] = totalDice; // Replace so we can use eval()
            const equation: string = args.join(' ');
            total = eval(equation);
            finalEquation += ` | ${equation} = ${total}`
            embed.setTitle(total)
            embed.addFields(
                { name: "Dice sum", value: diceEquation, inline: true},
                { name: "Total", value: `${equation} = ${total}`, inline: true}
            )
        }
        
        embed.setDescription(`:game_die: \`${finalEquation}\` :game_die:`)

        return message.channel.send(embed);
	},
};