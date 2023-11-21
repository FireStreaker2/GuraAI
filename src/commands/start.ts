import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { config } from "../config";

export const data = new SlashCommandBuilder()
	.setName("start")
	.setDescription("Start a conversation in the current channel");

export const execute = async (interaction: CommandInteraction) => {
	const channel = interaction.channel?.id;
	const guild = interaction.guild?.id;

	config.CHAT_CHANNELS.set(guild, { channel: channel });

	await interaction.reply(`${channel} has been succesfully set for ${guild}!`);
};
