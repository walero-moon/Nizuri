import * as Discord from 'discord.js'

const createEmbed = (message: Discord.Message, user: Discord.User, ) => {
    const avatar: string = user.displayAvatarURL({ format: 'png', dynamic: true });
    const createdAt: string = user.createdAt.toUTCString().slice(0, -3)
    const embed: Discord.MessageEmbed = new Discord.MessageEmbed()
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
            embed.addField('\u200B', '\u200B')
        }

    if (message.member !== null) {
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
    usage: "[User]",
	cooldown: 5,
    execute(message: Discord.Message, args) {
        if (!args.length) {
            const avatar: string = message.author.displayAvatarURL({ format: 'png', dynamic: true });
            const createdAt: string = message.author.createdAt.toUTCString().slice(0, -3)
            const embed: Discord.MessageEmbed = new Discord.MessageEmbed()
                .setAuthor(message.author.tag, avatar, avatar)
                .setDescription(message.author)
                .setThumbnail(avatar)
                .addFields(
                    { name: "Accout created on", value: createdAt, inline: true },
                    { name: "ID", value: message.author.id, inline: true }
                )

                if (message.author.presence.activities[0]) {
                    embed.addField("Status", message.author.presence.activities[0].state)
                } else {
                    embed.addField('\u200B', '\u200B')
                }

            if (message.member !== null) {
                const joinedAt: string = message.member.joinedAt.toUTCString().slice(0, -3)
                const roles = message.member.roles.cache.map(role => role.toString())
                roles.splice(-1)
                embed.addField(`Roles [${roles.length}]`, roles.join(' '), true)
                embed.addField("Joined server on", joinedAt, true)
                }
            return message.channel.send(embed)
        }

        const avatar: string = message.mentions.users.first().displayAvatarURL({ format: 'png', dynamic: true})
        const user: Discord.User = message.mentions.users.first()
        const createdAt: string = user.createdAt.toUTCString().slice(0, -3)
        const embed: Discord.MessageEmbed = new Discord.MessageEmbed()
            .setAuthor(user.tag, avatar, avatar)
            .setDescription(user)
            .setThumbnail(avatar)
            .addFields(
                { name: "Accout created on", value: createdAt, inline: true},
                { name: "ID", value: message.author.id, inline: true }
            )

            if (user.presence.activities[0]) {
                embed.addField("Status", user.presence.activities[0].state)
            } else {
                embed.addField('\u200B', '\u200B')
            }

        if (message.member !== null) {
            const joinedAt: string = message.member.joinedAt.toUTCString().slice(0, -3)
            const roles = message.member.roles.cache.map(role => role.toString())
            roles.splice(-1)
            embed.addField(`Roles [${roles.length}]`, roles.join(' '), true)
            embed.addField("Joined server on", joinedAt, true)
            }
        return message.channel.send(embed)
	},
};