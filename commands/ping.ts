import { ChatInputCommandInteraction, Interaction, SlashCommandBuilder } from 'discord.js';

const data =  new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!');

const execute = async (interaction: ChatInputCommandInteraction ) => {
	    const ping: number = new Date().getMilliseconds() - interaction.createdAt.getMilliseconds();
		return interaction.reply(`Pong! (${ping}ms)`);
	};

export { data, execute };