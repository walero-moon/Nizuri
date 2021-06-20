import * as Discord from 'discord.js'

module.exports = {
	name: 'avatar',
	description: 'Gets a user\'s avatar or your own if no user is given.',
	aliases: ['icon', 'pfp'],
    guildOnly: false,
    category: "Utility",
    usage: "[User]",
	cooldown: 5,
    execute(message: Discord.Message, args) {
        if (!args.length) {
            const avatar: string = message.author.displayAvatarURL({ format: 'png', dynamic: true });
            const embed: Discord.MessageEmbed = new Discord.MessageEmbed()
                .setTitle(`${message.author.tag}`)
                .setDescription(`${message.author}'s Avatar`)
                .setImage(avatar)
            return message.channel.send(embed)
        }

        const avatar: string = message.mentions.users.first().displayAvatarURL({ format: 'png', dynamic: true})
        const user: Discord.User = message.mentions.users.first()
        const embed: Discord.MessageEmbed = new Discord.MessageEmbed()
            .setTitle(`${user.tag}`)
            .setDescription(`${user}'s Avatar`)
            .setImage(avatar)
        return message.channel.send(embed)
	},
};