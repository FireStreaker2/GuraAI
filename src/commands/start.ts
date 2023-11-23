import {
	AttachmentBuilder,
	CommandInteraction,
	EmbedBuilder,
	SlashCommandBuilder,
} from "discord.js";
import { config } from "../config";

export const data = new SlashCommandBuilder()
	.setName("start")
	.setDescription("Start a conversation in the current channel");

export const execute = async (interaction: CommandInteraction) => {
	await interaction.deferReply();

	const guild = interaction.guild;
	const channel = interaction.channel?.id;
	config.CHAT_CHANNELS.set(guild?.id, { channel: channel });

	const file = new AttachmentBuilder("src/images/goomba.png");
	const embed = new EmbedBuilder()
		.setColor(0x00ff00)
		.setTitle("Success!")
		.setDescription(
			`<#${channel}> has been succesfully set for ${guild?.name}!`
		)
		.setThumbnail("attachment://goomba.png")
		.addFields({
			name: "Not Working?",
			value: "If the command didn't work, please try again later.",
		})
		.setFooter({ text: "Made by firestreaker2" });

	await interaction.editReply({ embeds: [embed], files: [file] });
};
