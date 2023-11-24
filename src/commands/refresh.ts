import {
	AttachmentBuilder,
	CommandInteraction,
	EmbedBuilder,
	SlashCommandBuilder,
} from "discord.js";
import { deploy } from "../deploy";

export const data = new SlashCommandBuilder()
	.setName("refresh")
	.setDescription("Refresh commands in your server");

export const execute = async (interaction: CommandInteraction) => {
	await interaction.deferReply();

	const file = new AttachmentBuilder("src/images/goomba.png");
	const embed = new EmbedBuilder()
		.setThumbnail("attachment://goomba.png")
		.setFooter({ text: "Made by firestreaker2" });

	if (interaction.guild?.id) {
		await deploy(interaction.guild.id);

		embed
			.setColor(0x00ff00)
			.setTitle("Refreshed!")
			.setDescription("Commands have succesfully been refreshed!")
			.addFields({
				name: "Not Working?",
				value: "If the command didn't work, please try again later.",
			});
	} else {
		embed
			.setColor(0xff0000)
			.setTitle("Error!")
			.setDescription("An error occurred. Please try again later.");
	}

	await interaction.editReply({ embeds: [embed], files: [file] });
};
