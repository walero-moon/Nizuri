import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

function rollDice(sides: number, amount?: number): number[] {
    return 2;
}

function rollDice(sides: number): number {
    return Math.floor(Math.random() * sides) + 1;
}

const data = new SlashCommandBuilder()
    .setName("roll")
    .setDescription("Rolls a dice.")
    .addIntegerOption(option =>
        option.setName("sides")
            .setDescription("The number of sides on the dice")
            .setRequired(true)
    )
    .addIntegerOption(option => 
        option.setName("dice_amount")
            .setDescription("The number of dice to roll")
        );

const execute = async (interaction: ChatInputCommandInteraction) => {

};