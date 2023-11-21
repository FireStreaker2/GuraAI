import { config } from "./config";

const CharacterAI = require("node_characterai");
const characterAI = new CharacterAI();
await characterAI.authenticateWithToken(config.CAI_TOKEN);

export default characterAI;
