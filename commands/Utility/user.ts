import * as Discord from 'discord.js'

const createEmbed = (message: Discord.Message, user: Discord.User, ) => {
    const avatar: string = user.displayAvatarURL({ format: 'png', dynamic: true });
    const createdAt: string = user.createdAt.toUTCString().slice(0, -3)
    const embed: Discord.MessageEmbed = new Discord.MessageEmbed()
    .setColor('#00ff1e')
        .setAuthor(user.tag, avatar, avatar)
        .setDescription(user)
        .setThumbnail(avatar)
        .addFields(
            { name: "Accout created on", value: createdAt, inline: true },
            { name: "ID", value: user.id, inline: true }
        )

        if (user.presence.activities[0]) {
            embed.addField("Status", user.presence.activities[0].state)
        } else {
            embed.addField('Status', 'No status')
        }

    if (message.member !== null && message.guild.member(user.id)) {
        const joinedAt: string = message.member.joinedAt.toUTCString().slice(0, -3)
        const roles = message.member.roles.cache.map(role => role.toString())
        roles.splice(-1)
        embed.addField(`Roles [${roles.length}]`, roles.join(' '), true)
        embed.addField("Joined server on", joinedAt, true)
        }
    return embed
}

module.exports = {
	name: 'user',
	description: 'Gets information about a user or yourself if no user is given',
	aliases: ['user-info', 'info-user', 'userinfo'],
    guildOnly: false,
    category: "Utility",
    usage: "<@User>",
	cooldown: 5,
    async execute(message: Discord.Message, args) {
        // Get yourself if no arguments
        if (!args.length) return message.channel.send(createEmbed(message, message.author))

        // Get mentioned user if any
        let user: any = message.mentions.users.first()
        if (user) return message.channel.send(createEmbed(message, user))

        // Tries to find user with name that matches the argument
        user = message.client.users.cache.find(user => user.username == args[0])
        if (user) return message.channel.send(createEmbed(message, user))

        // Gets user based on ID
        try {
            user = await message.client.users.fetch(args[0])
            return message.channel.send(createEmbed(message, user))
        } catch {
            return message.channel.send(`Usage: \`,user ${this.usage}\``)
        }
	},
};