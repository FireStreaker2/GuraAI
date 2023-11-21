import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { deploy } from "../deploy";

export const data = new SlashCommandBuilder()
	.setName("refresh")
	.setDescription("Refresh commands in your server");

export const execute = async (interaction: CommandInteraction) => {
	await interaction.deferReply();

	if (interaction.guild?.id) {
		await deploy({ guildId: interaction.guild?.id });
		await interaction.editReply("Commands have been refreshed!");
	} else {
		await interaction.editReply("Error");
	}
};
