import { CommandInteraction, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
	.setName("about")
	.setDescription("About GuraAI");

export const execute = async (interaction: CommandInteraction) => {
	return interaction.reply("about");
};
