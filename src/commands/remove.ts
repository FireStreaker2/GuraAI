import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { config } from "../config";

export const data = new SlashCommandBuilder()
	.setName("remove")
	.setDescription("Remove the current conversation channel");

export const execute = async (interaction: CommandInteraction) => {
	const guild = interaction.guild?.id;

	if (config.CHAT_CHANNELS.has(guild)) {
		config.CHAT_CHANNELS.delete(guild);
		await interaction.reply(
			`Current channel succesfully been removed for ${guild}!`
		);
	} else {
		await interaction.reply(`No channel set for ${guild}`);
	}
};
