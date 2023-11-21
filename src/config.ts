let { TOKEN, CLIENT_ID, ID, CAI_TOKEN } = process.env;

ID = ID ? ID : "oL2IzOD15_wBIP_o6NAWDwiVyAnzz_3aGLu9aU7i254";

if (!TOKEN || !CLIENT_ID || !CAI_TOKEN) throw new Error("Missing Environment Variables");

const CHAT_CHANNELS = new Map();

export const config = {
	TOKEN,
	CLIENT_ID,
	ID,
  CAI_TOKEN,
  CHAT_CHANNELS,
};
