import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

const data = new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("Gets the avatar URL of the user, or your own.")
    .addUserOption(option =>
        option.setName("target")
            .setDescription("The user's avatar to show")
    );

const execute = async (interaction: ChatInputCommandInteraction) => {
    const user = interaction.options.getUser("target");
    const userAvatar = user
        // @ts-ignore
        ? user.displayAvatarURL({ dynamic: true })
        // @ts-ignore
        : interaction.user.displayAvatarURL({ dynamic: true });
    return interaction.reply(userAvatar);
}

export { data, execute };