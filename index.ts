import * as fs from 'fs';
import { prefix, token } from './config.json';
import * as Discord from 'discord.js'

const client: Discord.Client = new Discord.Client();
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


// On ready do this
client.once('ready', () => {
	console.log('\nNizuri is ready!');
});


client.on('message', (message) => {
    // Check if message starts with the prefix or if it isn't a bot
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    // Slice prefix, and get arguments
    const args: string[] = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName: string = args.shift().toLowerCase(); // Set command name to be arg[0] and remove it from args

    const command: Discord.Command = client.commands.get(commandName) // Get command or checks for aliases
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        
    if (!command) return; // return if command not found

    // Check if command is guildOnly
    if (command.guildOnly && message.channel.type === 'dm') {
        return message.reply('I can\'t execute that command inside DMs!');
    }

    // Check if command needs args and if the user passed arguments
    if (command.args && !args.length) {
        let reply: string = `You didn't provide any arguments, ${message.author}!`

        // Checks if proper usage exists, if it does, add the proper usage to the reply
        if (command.usage) {
            reply += `\nUsage: \`${prefix}${command.name} ${command.usage}\``
        }
        return message.channel.send(reply)
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
            return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
        }
    }
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    // Executes command, duh
    try {
        command.execute(message, args);
    } catch (error) {
        console.log(error);
    }
})

client.login(token);