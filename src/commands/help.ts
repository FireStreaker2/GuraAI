import {
	AttachmentBuilder,
	CommandInteraction,
	EmbedBuilder,
	SlashCommandBuilder,
} from "discord.js";

export const data = new SlashCommandBuilder()
	.setName("help")
	.setDescription("Send a help message");

export const execute = async (interaction: CommandInteraction) => {
  await interaction.deferReply();

	const file = new AttachmentBuilder("src/images/goomba.png");
	const embed = new EmbedBuilder()
		.setColor(0x00d9ff)
		.setTitle("Help")
		.setDescription("Help for GuraAI")
		.setThumbnail("attachment://goomba.png")
		.addFields(
			{ name: "Prefix", value: "``/``" },
			{ name: "/about", value: "About GuraAI" },
			{ name: "/ask", value: "Ask Gura a question!" },
			{ name: "/help", value: "Send this help message" },
			{ name: "/refresh", value: "Refresh the commands for your server" },
			{ name: "/start", value: "Start a conversation in the current channel" },
			{ name: "/remove", value: "Remove the current conversation channel" }
		)
		.setFooter({ text: "Made by firestreaker2" });
	await interaction.editReply({ embeds: [embed], files: [file] });
};
