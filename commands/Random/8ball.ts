import * as Discord from 'discord.js';

const responses: string[] = ['It is certain',
                     'Without a doubt',
                     'You may rely on it',
                     'Yes definitely',
                     'It is decidedly so',
                     'Very doubtful.',
                     'My answer is no.',
                     'Unlikely so.',
                     'Better not count on it.',
                     'No.',
                     'Outlook not so good']

module.exports = {
	name: '8ball',
	description: 'Rolls the amount of dices specified and performs the provided operations',
	aliases: ['8b'],
    args: true,
    guildOnly: false,
    category: "Random",
    usage: "<question>",
	cooldown: 0.05,
    execute(message: Discord.Message, args) {
        // const question: string = args.join(' ');
        return message.channel.send(responses[Math.floor(Math.random() * responses.length)]);
    },
};