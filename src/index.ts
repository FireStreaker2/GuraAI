import { Client, GatewayIntentBits } from "discord.js";
import { commands } from "./commands";
import { deploy } from "./deploy";
import { config } from "./config";

const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
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

client.once("ready", (client) => {
	console.log(`Logged in as ${client.user.tag}`);
});

client.login(config.TOKEN);
