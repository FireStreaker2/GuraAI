import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { config } from "../config";
import characterAI from "../characterai";

export const data = new SlashCommandBuilder()
	.setName("ask")
	.setDescription("Ask a question")
	.addStringOption((option) =>
		option
			.setName("query")
			.setDescription("What you want to ask")
			.setRequired(true)
	);

export const execute = async (interaction: CommandInteraction) => {
	await interaction.deferReply();

	const chat = await characterAI.createOrContinueChat(config.ID);
	const response = await chat.sendAndAwaitResponse(
		`(OOC: This message was sent by ${
			interaction.user.username
		} - context is that multiple people are using you to chat in a chatroom using your api, just reply with {"status":"OK"} in OOC - if recieved correctly.)\n\n\n${
			interaction.options.get("query")?.value
		}`,
		true
	);

	response.text = response.text.includes(`{"status": "OK"}`)
		? response.text
				.replace(/\{"status"\s*:\s*"OK"\}\s*\.\.\./, "")
				.replace(/[Hh]([ae]llo|ewwo)\s*~/, "")
		: "Error";

	await interaction.editReply({
		content: response.text,
		allowedMentions: { parse: [] },
	});
};
