import { 
    EmbedBuilder, 
    ChatInputCommandInteraction,
    SlashCommandBuilder, 
    SlashCommandIntegerOption,
    SlashCommandBooleanOption
} from 'discord.js';

const roll = (size: number, amount?: number): number[] => {
    if (amount) {
        const results: number[] = []
        for (let i = 0; i < amount; i++) {
            results.push(Math.floor(Math.random() * (size - 1 + 1)) + 1);
        }
        return results
    }
    return [Math.floor(Math.random() * size) + 1];
}

const data =  new SlashCommandBuilder()
		.setName('roll')
		.setDescription('Rolls dice(s) and performs additions and other operations on them.')
        .addIntegerOption((option: SlashCommandIntegerOption) => 
            option.setName("sides")
                .setDescription("The amount of sides the dice you want to roll has.")
                .setRequired(true)
                .setMinValue(2)
                .setMaxValue(2000)
        )
        .addIntegerOption((option: SlashCommandIntegerOption) => 
            option.setName("amount")
                .setDescription("The amount of dices you want to roll.")
                .setMinValue(1)
                .setMaxValue(50)
        )
        .addBooleanOption((option: SlashCommandBooleanOption) => 
            option.setName("ephemeral")
                    .setDescription("Whether to hide response from other users or not. Defaults to false.")
        );

const execute = async (interaction: ChatInputCommandInteraction ) => {
        // Get options
        const sides = interaction.options.getInteger('sides');
        const diceAmount = interaction.options.getInteger('amount');
        const ephemeral: boolean = interaction.options.getBoolean('ephemeral') ?? false;
        
        // Get dices
        const dices: number[] = roll(sides as number, diceAmount as number)
        const diceSumTotal: number = dices.reduce((a, b) => a + b)
        const diceSumEquation: string = `${dices.join(' + ')} = ${diceSumTotal}`

        // Create embed
        const embed = new EmbedBuilder()
            .setColor("#2c1428")
            .setTitle(diceSumTotal.toString())
            .setDescription(`:game_die: **\`${diceSumEquation}\`** :game_die:`)
            .setTimestamp()
            .setAuthor({
                name: interaction.user.tag, 
                iconURL: interaction.user.displayAvatarURL()
            })

        if (sides) embed.addFields({ name: "Dice sides", value: sides.toString() })
        if (diceAmount) embed.addFields({ name: "Amount of dice rolled", value: diceAmount.toString() })
        
		return interaction.reply({
            embeds: [embed],
            ephemeral: ephemeral
        });
	};

export { data, execute };
