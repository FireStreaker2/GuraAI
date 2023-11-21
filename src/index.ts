import { Client, GatewayIntentBits, ActivityType } from "discord.js";
import { commands } from "./commands";
import { deploy } from "./deploy";
import { config } from "./config";
import characterAI from "./characterai";

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	],
});

client.on("guildCreate", async (guild) => {
	await deploy({ guildId: guild.id });
});

client.on("interactionCreate", async (interaction) => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;
	if (commands[commandName as keyof typeof commands]) {
		commands[commandName as keyof typeof commands].execute(interaction);
	}
});

client.on("messageCreate", async (message) => {
	if (message.author.bot) return;

	const channel = config.CHAT_CHANNELS.get(message.guild?.id);

	if (channel && message.channel.id === channel.channel) {
		await message.channel.sendTyping();

		const chat = await characterAI.createOrContinueChat(config.ID);
		const response = await chat.sendAndAwaitResponse(
			`(OOC: This message was sent by ${message.author.tag} - context is that multiple people are using you to chat in a chatroom using your api, just reply with {"status":"OK"} in OOC - if recieved correctly.)\n\n\n${message.content}`,
			true
		);

		if (response.text.includes(`{"status": "OK"}`)) {
			response.text = response.text
				.replace(`{"status": "OK"} ...`, "")
				.replace(/Hewwo\s*~/, "");
		} else response.text = "Error";

		await message.reply({
			content: response.text,
			allowedMentions: { parse: [] },
		});
	}
});

client.once("ready", (client) => {
	console.log(`Logged in as ${client.user.tag}`);

	client.user.setPresence({
		activities: [
			{
				name: "chumbuds",
				type: ActivityType.Listening,
			},
		],
		status: "idle",
	});
});

client.login(config.TOKEN);
