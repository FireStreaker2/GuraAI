import { REST, Routes } from "discord.js";
import { commands } from "./commands";
import { config } from "./config";

const data = Object.values(commands).map((command) => command.data);

const rest = new REST({ version: "10" }).setToken(config.TOKEN);

type DeployProps = {
	guildId: string;
};

export const deploy =  async ({ guildId }: DeployProps) => {
	try {
		console.log("Started refreshing application (/) commands.");

		await rest.put(Routes.applicationGuildCommands(config.CLIENT_ID, guildId), {
			body: data,
		});

		console.log("Successfully reloaded application (/) commands.");
	} catch (error) {
		console.error(error);
	}
}
