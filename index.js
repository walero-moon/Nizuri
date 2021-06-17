const fs = require('fs')
const { prefix, token } = require('./config.json')
const Discord = require('discord.js')

const client = new Discord.Client();
client.commands = new Discord.Collection();

// Loop through commands folder and load different commands
const commandFolders = fs.readdirSync('./commands')
for (const folder of commandFolders) {
  const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'))

  for (const file of commandFiles) {
      const command = require(`./commands/${folder}/${file}`);
      client.commands.set(command.name, command);
  }
}

// On ready do this
client.once('ready', () => {
	console.log('Nizuri is ready!');
});


client.on('message', (message) => {
  // Check if message starts with the prefix or if it isn't a bot
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  // Slice prefix, and get arguments
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase(); // Set command name to be arg[0] and remove it from args

  const command = client.commands.get(commandName) // Get command or checks for aliases
    || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    
  if (!command) return; // return if command not found

  // Check if command needs args and if the user passed arguments
  if (command.args && !args.length) {
      let reply = `You didn't provide any arguments, ${message.author}!`

      // Checks if proper usage exists, if it does, add the proper usage to the reply
      if (command.usage) {
          reply += `\nUsage: \`${prefix}${command.name} ${command.usage}\``
      }
      return message.channel.send(reply)
  }

  try {
      command.execute(message, args); // Executes command, duh
  } catch (error) {
      console.log(error);
  }
})

client.login(token);
