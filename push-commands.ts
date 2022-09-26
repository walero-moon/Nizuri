import fs from 'node:fs';
import path from 'node:path';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord.js';
import { clientId, guildId, token } from './config.json';

const commands: any[] = [];
const commandsPath: string = path.join(__dirname, 'commands');
const commandFiles: string[] = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath: string = path.join(commandsPath, file);
	const command = require(filePath);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);