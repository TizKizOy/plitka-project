const TelegramBot = require("node-telegram-bot-api");
const dotenv = require("dotenv");
dotenv.config();

const token = process.env.TOKEN_BOT;
const bot = new TelegramBot(token, { polling: true });

const { setupCommands } = require("./handlers/commands");
const { setupCallbacks } = require("./handlers/callbacks");
const { handleAuthMessage } = require("./handlers/authHandler");

setupCommands(bot);
setupCallbacks(bot);

bot.on("message", async (msg) => {
  await handleAuthMessage(bot, msg);
});

module.exports = { bot };
