const fs = require('fs');

module.exports = {
	name: 'reload',
	description: 'Reloads a command',
    category: 'Dev Only',
	args: true,
    execute(message, args) {
        if (message.author.id !== "192358823174864896") return message.channel.send(`You don't have permision to use this command`)
        const commandName = args[0].toLowerCase();
        const command = message.client.commands.get(commandName)
            || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if (!command) {
            return message.channel.send(`There is no command with name or alias \`${commandName}\`, ${message.author}!`);
        }

        const commandFolders: string[] = fs.readdirSync('./commands');
        const folderName: string = commandFolders.find(folder => fs.readdirSync(`./commands/${folder}`).includes(`${command.name}.js`));

        delete require.cache[require.resolve(`../${folderName}/${command.name}.js`)];

        try {
        const newCommand = require(`../${folderName}/${command.name}.js`);
        message.client.commands.set(newCommand.name, newCommand);
        message.channel.send(`Command \`${newCommand.name}\` was reloaded!`);
        } catch (error) {
        console.error(error);
        message.channel.send(`There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``);
        }
    
	},
};
