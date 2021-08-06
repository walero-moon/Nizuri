// All this code was literally taken from https://discordjs.guide/

import * as fs from 'fs';
import { prefix, token } from './config.json';
import { Client, Collection, Intents } from 'discord.js'

const client: Client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });


// ({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.DIRECT_MESSAGES, 
//     Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, 
//     Intents.FLAGS.GUILD_MESSAGE_TYPING, Intents.FLAGS.DIRECT_MESSAGE_REACTIONS, 
//     Intents.FLAGS.DIRECT_MESSAGE_TYPING]});

client.once('ready', async () => {
    if (!client.application?.owner) await client.application?.fetch();
    const data = [
        {
            name: 'ping',
            description: 'Replies with Pong!',
        }
    ];
    await client.guilds.cache.get('450074513284268032')?.commands.set(data)
    console.log('Ready!')
})

// Dynamically retrieve event files
// const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
// for (const file of eventFiles) {
// 	import(`./events/${file}`)
//         .then((event) => {
//             if (event.once) {
//                 client.once(event.name, (...args) => event.execute(...args, client));
//             } else {
//                 client.on(event.name, (...args) => event.execute(...args, client));
//             }
//             console.log(`Loaded ${file}`)
//         }
//     )
// }

client.commands = new Collection();

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

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

	if (!client.commands.has(interaction.commandName)) return;

	try {
		await client.commands.get(interaction.commandName).execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
})

client.login(token);