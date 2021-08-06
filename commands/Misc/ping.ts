module.exports = {
	name: 'ping',
	description: 'Tests bot latency',
	aliases: ['latency', 'lag'],
    guildOnly: false,
    category: "Misc",
	cooldown: 5,
    async execute(interaction) {
        const api = Math.round(interaction.client.ws.ping)
        await interaction.reply(`Pong! (${api}ms)`)
	},
};