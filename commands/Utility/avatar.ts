import * as Discord from 'discord.js'

module.exports = {
	name: 'avatar',
	description: 'Gets a user\'s avatar or your own if no user is given.',
	aliases: ['icon', 'pfp'],
    guildOnly: false,
	cooldown: 5,
    execute(message, args) {
        console.log('Avatar ran')
        console.log(!args.length)
        console.log(message.author.username)
        if (!args.length) {
            const avatar: string = message.author.displayAvatarURL({ format: 'png', dynamic: true });
            const embed: Discord.MessageEmbed = new Discord.MessageEmbed()
                .setTitle(`${message.author.tag}`)
                .setDescription(`${message.author}'s Avatar`)
                .setImage(avatar)
            message.channel.send(embed)
        }
	},
};