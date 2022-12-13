import { 
    EmbedBuilder, 
    ChatInputCommandInteraction, 
    ImageURLOptions, 
    SlashCommandBuilder, 
    SlashCommandIntegerOption, 
    SlashCommandUserOption, 
    User,
    SlashCommandBooleanOption
} from 'discord.js';

const data =  new SlashCommandBuilder()
		.setName('avatar')
		.setDescription('Replies a user\'s avatar')
        .addUserOption((option: SlashCommandUserOption) => 
            option.setName("target")
                .setDescription("The user to get the avatar from.")
        )
        .addIntegerOption((option: SlashCommandIntegerOption) => 
            option.setName("size")
                .setDescription("The size of the image to return. Default: 512")
                .addChoices(
                    { name: "16", value: 16 },
                    { name: "32", value: 32 },
                    { name: "64", value: 64 },
                    { name: "128", value: 128 },
                    { name: "256", value: 256 },
                    { name: "512", value: 512 },
                    { name: "1024", value: 1024 },
                    { name: "2048", value: 2048 },
                    { name: "4096", value: 4096 }
                )
        )
        .addBooleanOption((option: SlashCommandBooleanOption) => 
            option.setName("ephemeral")
                    .setDescription("Whether to hide response from other users or not. Defaults to false.")
        );

const execute = async (interaction: ChatInputCommandInteraction ) => {
        // Get options
        const commandUser: User = interaction.user
        const desiredUser: User = interaction.options.getUser('target') ?? commandUser;
        const desiredSize: ImageURLOptions["size"] = 
            interaction.options.getInteger('size') as ImageURLOptions["size"]
            ?? 512 as ImageURLOptions["size"];
        const ephemeral: boolean = interaction.options.getBoolean('ephemeral') ?? false
        
        
        // Get avatar
        const avatarURL = desiredUser.displayAvatarURL({
            extension: 'png',
            size: desiredSize
        });

        // Create embed
        const embed = new EmbedBuilder()
            .setColor("#2c1428")
            .setDescription(`${desiredUser}'s icon`)
            .setFooter({
                text: avatarURL
            })
            .setImage(avatarURL)
            .setTimestamp()
            .setAuthor({
                name: commandUser.tag, 
                iconURL: commandUser.displayAvatarURL()
            })
        
		return interaction.reply({
            embeds: [embed],
            ephemeral: ephemeral
        });
	};

export { data, execute };