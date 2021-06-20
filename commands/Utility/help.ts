import { prefix } from '../../config.json';
import * as Discord from 'discord.js';

module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	aliases: ['commands'],
	usage: '[command name]',
    guildOnly: false,
    category: 'Utility',
	cooldown: 5,
	execute(message, args) {
		const msg: Discord.MessageEmbed = new Discord.MessageEmbed();
        let { commands } = message.client;
        const categories: any = {};
        msg.setTitle(":question:  Commands");
        
        if (!args.length) {
            for (let command of commands){
                command = command[1];
                if (!(command.category in categories)) {
                    categories[command.category] = [command.name];
                } else {
                    categories[command.category].push(command.name);
                }
            }
            msg.setDescription("\`\`\`,help [command]\`\`\`")
            for (const [key, value] of Object.entries(categories)) {
                msg.addField(key, value, true);
            }


            return message.author.send(msg)
            .then(() => {
                if (message.channel.type === 'dm') return;
                message.reply('I\'ve sent you a DM with all my commands!');
            })
            .catch(error => {
                console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
                message.reply('it seems like I can\'t DM you! Do you have DMs disabled?');
            });
        }

        const name: string[] = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
            return message.reply('that\'s not a valid command!');
        }

        msg.setTitle(`:question:  \`${command.name}\` command information`);
        const cmdUsage = `\`\`\`,${command.name} ${(command.usage) ? command.usage : ''}\`\`\``
        msg.setDescription(`${command.description}\n${cmdUsage}\n**You can also say** \`${command.aliases.join(', ')}\``);
        if (command.category) msg.addField('Category', command.category, true)
        if (command.category) msg.addField('Cooldown', `${command.cooldown} seconds`, true)

        message.channel.send(msg);
    },
};