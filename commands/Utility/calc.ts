import * as Discord from 'discord.js';

module.exports = {
	name: 'calc',
	description: 'Takes a mathematical expression and returns its result.',
	aliases: ['c', 'math'],
    args: true,
    guildOnly: false,
    category: "Utility",
    usage: "<Expression>",
	cooldown: 0.05,
    execute(message: Discord.Message, args) {
        const expression: string = args.join(' ').replace('^', '**');
        const embed: Discord.MessageEmbed = new Discord.MessageEmbed()
        
        try {
            const result: number = eval(expression)
            embed.setTitle(result)
            embed.setDescription(`\`${expression}\` = ${result}`)
            return message.channel.send(embed);
        } catch (e) {
            embed.setColor('#ff2424')
            embed.setTitle('Invalid expression')
            embed.setDescription('**Remember to insert * for multiplication, even if there are parenthesis right after.**')
            embed.addFields(
                { name: 'Example 1', value: '\`,calc 5 + 10 * (3 + 10)\`', inline: true},
                { name: 'Example 2', value: '\`,calc 2^5\`', inline: true}
            )
            return message.channel.send(embed);
        }
	},
};