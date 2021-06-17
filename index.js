const fs = require('fs')
const { prefix, token } = require('./config.json')
const Discord = require('discord.js')

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFolders = fs.readdirSync('./commands')
for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'))

    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);
    }
}

client.once('ready', () => {
	console.log('Nizuri is ready!');
});

client.on('message', (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client['commands'].has(commandName)) return;

    const command = client['commands'].get(commandName);

    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`
        if (command.usage) {
            reply += `\nUsage: \`${prefix}${command.name} ${command.usage}\``
        }
        return message.channel.send(reply)
    }

    try {
        command.execute(message, args);
    } catch (error) {
        console.log(error);
    }
})

client.login(token);
