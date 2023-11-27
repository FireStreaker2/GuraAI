<div align="center">
  <div>
    <img src="./src/images/goomba.png" height="128" />
    <h1>GuraAI</h1>
  </div>

  <div>
    <img src="https://img.shields.io/badge/bun-282a36?style=for-the-badge&logo=bun&logoColor=fbf0df" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
  </div>
</div>

# About
GuraAI was a discord bot made with [discord.js](https://discord.js.org/), [TypeScript](https://www.typescriptlang.org/) and [bun](https://bun.sh/). It utilizes [node_characterai](https://github.com/realcoloride/node_characterai) in order to retreieve data from [character.ai](https://character.ai/), in order to act as a chatbot. 

# Note
Due to the limitations of the [node_characterai](https://github.com/realcoloride/node_characterai) package, you **must** wait for a response before sending another message (due to puppeteer constraints). While there is a way around this, it requires [making multiple chromium instances](https://github.com/FireStreaker2/GuraAI#others), which requires a lot of system resources. Because of this, there is no official already hosted bot, and you must [selfhost](https://github.com/FireStreaker2/GuraAI#setup) it.

# Usage
## Setup
If you would like to selfhost this bot, make sure you have [bun](https://bun.sh/) installed first.
```bash
$ git clone https://github.com/FireStreaker2/GuraAI.git
$ cd GuraAI
$ bun i
$ cp .env.example .env
$ bun start
```

## Configuration
There are a couple environment variables you can configure in order to adjust the bot.
* ``TOKEN``: Token of the discord bot
* ``CLIENT_ID``: ID of the discord bot
* ``ID``: ID of the character on character.ai
* ``CAI_TOKEN``: Your token for character.ai

> [!NOTE]  
> Look [here](https://github.com/realcoloride/node_characterai#using-an-access-token) for more info regarding how to get your character.ai token


## Others
### Talking with multiple people at once
If you would like to have the bot be able to talk to multiple people at once, you can configure it to make new instances of the CharacterAI package every time. For example:
```ts
// ask.ts
import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { config } from "../config";

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

  const CharacterAI = require("node_characterai");
  const characterAI = new CharacterAI();
  await characterAI.authenticateWithToken(config.CAI_TOKEN);

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
```

### Login as guest
If you would like to login as a guest instead of authenticating with your own token, you can edit ```characterai.ts``` like so:
```diff
// characterai.ts
import { config } from "./config";

const CharacterAI = require("node_characterai");
const characterAI = new CharacterAI();
- characterAI.authenticateWithToken(config.CAI_TOKEN);
+ await characterAI.authenticateAsGuest();

export default characterAI;
```

# Contributing
If you would like to contribute, you can <a href="https://github.com/FireStreaker2/GuraAI/fork">fork the repo</a> and <a href="https://github.com/FireStreaker2/GuraAI/compare">make a PR</a>, or contact me via email @ ``suggestions@firestreaker2.gq``

# License
[MIT](https://github.com/FireStreaker2/GuraAI/blob/main/LICENSE)