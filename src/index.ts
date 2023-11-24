import {
	Client,
	GatewayIntentBits,
	ActivityType,
	AttachmentBuilder,
	EmbedBuilder,
} from "discord.js";
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
	await deploy(guild.id);

	const file = new AttachmentBuilder("src/images/goomba.png");
	const embed = new EmbedBuilder()
		.setColor(0x00d9ff)
		.setTitle("Hello!")
		.setDescription("Domo, same desu~")
		.setThumbnail("attachment://goomba.png")
		.addFields(
			{ name: "Have Fun", value: "I hope you have fun talking with me :3" },
			{
				name: "Get Started",
				value: "To get started, you can look at my commands with ``/help``",
			}
		)
		.setFooter({ text: "Made by firestreaker2" });

	try {
		guild.systemChannel?.send({ embeds: [embed], files: [file] });
	} catch (error) {
		console.error(`Error when sending welcome message: ${error}`);
	}
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

		response.text = response.text.includes(`{"status": "OK"}`)
			? response.text
					.replace(/\{"status"\s*:\s*"OK"\}\s*\.\.\./, "")
					.replace(/[Hh]([ae]llo|ewwo)\s*~/, "")
			: "Error";

		await message.reply({
			content: response.text,
			allowedMentions: { parse: ["users"], repliedUser: true },
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
