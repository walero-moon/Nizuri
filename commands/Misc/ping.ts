module.exports = {
	name: 'ping',
	description: 'Tests bot latency',
	aliases: ['latency', 'lag'],
    guildOnly: false,
    category: "Misc",
	cooldown: 5,
    execute(message, args) {
        const api = Math.round(message.client.ws.ping)
        message.channel.send(`Pong! (${api}ms)`)
	},
};