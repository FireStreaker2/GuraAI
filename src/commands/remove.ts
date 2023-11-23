import {
	AttachmentBuilder,
	CommandInteraction,
	EmbedBuilder,
	SlashCommandBuilder,
} from "discord.js";
import { config } from "../config";

export const data = new SlashCommandBuilder()
	.setName("remove")
	.setDescription("Remove the current conversation channel");

export const execute = async (interaction: CommandInteraction) => {
	await interaction.deferReply();

	const guild = interaction.guild;
	const file = new AttachmentBuilder("src/images/goomba.png");
	const embed = new EmbedBuilder()
		.setThumbnail("attachment://goomba.png")
		.setFooter({ text: "Made by firestreaker2" });

	if (config.CHAT_CHANNELS.has(guild?.id)) {
		config.CHAT_CHANNELS.delete(guild?.id);
		embed
			.setColor(0x00ff00)
			.setTitle("Success!")
			.setDescription(
				`Current channel succesfully been removed for ${guild?.name}!`
			)
			.addFields({
				name: "Not Working?",
				value: "If the command didn't work, please try again later.",
			});
	} else {
		embed
			.setColor(0xff0000)
			.setTitle("Error!")
			.setDescription(`No conversation channel set for ${guild?.name}`);
	}

	await interaction.editReply({ embeds: [embed], files: [file] });
};
