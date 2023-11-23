import {
	AttachmentBuilder,
	CommandInteraction,
	EmbedBuilder,
	SlashCommandBuilder,
} from "discord.js";

export const data = new SlashCommandBuilder()
	.setName("about")
	.setDescription("About GuraAI");

export const execute = async (interaction: CommandInteraction) => {
	await interaction.deferReply();

	const file = new AttachmentBuilder("src/images/goomba.png");
	const embed = new EmbedBuilder()
		.setColor(0x00d9ff)
		.setTitle("About")
		.setThumbnail("attachment://goomba.png")
		.setDescription(
			"GuraAI is a bot developed with Discord.js, Bun, and TypeScript. It utilizes an unofficial character.ai node package in order to provide the most accurate responses possible."
		)
		.addFields({
			name: "More Resources",
			value:
				"For more info, you may refer to the [GitHub Page](https://github.com/FireStreaker2/GuraAI).",
		})
		.setFooter({ text: "Made by firestreaker2" });
	await interaction.editReply({ embeds: [embed], files: [file] });
};
