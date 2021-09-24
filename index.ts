// All this code was literally taken from https://discordjs.guide/

import * as fs from 'fs';
import { prefix, token } from './config.json';
import * as Discord from 'discord.js'

const call: string = process.env.PREFIX || prefix 

const client: Discord.Client = new Discord.Client();

// Dynamically retrieve event files
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
	import(`./events/${file}`)
        .then((event) => {
            if (event.once) {
                client.once(event.name, (...args) => event.execute(...args, client));
            } else {
                client.on(event.name, (...args) => event.execute(...args, client));
            }
            console.log(`Loaded ${file}`)
        }
    )
}

client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

// Loop through commands folder and load different commands
const commandFolders: string[] = fs.readdirSync('./commands')
for (const folder of commandFolders) {
    const commandFiles: string[] = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'))
    console.log(`Loading ${folder}`)

  for (const file of commandFiles) {
      import(`./commands/${folder}/${file}`)
        .then((command) => client.commands.set(command.name, command));
      console.log(`\tLoaded ${file}`)
  }
}

client.on('message', (message) => {
    // Check if message starts with the prefix or if it isn't a bot
    if (!message.content.startsWith(call) || message.author.bot) return;

    // Slice prefix, and get arguments
    const args: string[] = message.content.slice(call.length).trim().split(/ +/);
    const commandName: string = args.shift().toLowerCase(); // Set command name to be arg[0] and remove it from args

    const command: Discord.Command = client.commands.get(commandName) // Get command or checks for aliases
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        
    if (!command) return; // return if command not found

    // Check if command is guildOnly
    if (command.guildOnly && message.channel.type === 'dm') {
        return message.reply('I can\'t execute that command inside DMs!');
    }

    // Checks if user has permission to use command
    if (command.permissions) {
        const authorPerms = message.channel.permissionsFor(message.author);
        if (!authorPerms || !authorPerms.has(command.permissions)) {
            return message.reply('You can not do this!');
        }
    }

    // Check if command needs args and if the user passed arguments
    if (command.args && !args.length) {
        const embed: Discord.MessageEmbed = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setTitle('Missing arguments for command')
            .setColor('#ff2424')

        // Checks if proper usage exists, if it does, add the proper usage to the reply
        if (command.usage) {
            embed.setDescription(`\nUsage: \`${call}${command.name} ${command.usage}\``)
        }
        return message.channel.send(embed)
    }

    // Takes care of command cooldown
    const { cooldowns } = client;

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const now: any = Date.now();
    const timestamps: any = cooldowns.get(command.name);
    const cooldownAmount: any = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
        const expirationTime: any = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before using the \`${command.name}\` command.`);
        }
    }
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    // Executes command, duh
    try {
        message.channel.startTyping()
        command.execute(message, args);
        message.channel.stopTyping()
    } catch (error) {
        console.log(error);
    }
})

client.login(process.env.TOKEN || token);