import { CommandInteraction, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
	.setName("help")
	.setDescription("Send a help message");

export const execute = async (interaction: CommandInteraction) => {
	return interaction.reply("help");
};
