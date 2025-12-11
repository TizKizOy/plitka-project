const TelegramBot = require("node-telegram-bot-api");
const dotenv = require("dotenv");
dotenv.config();
const { removeAuthSession, isWaitingForAuth } = require("./services/session");

const token = process.env.TOKEN_BOT;
const bot = new TelegramBot(token, { polling: true });

const { setupCommands } = require("./handlers/commands");
const { setupCallbacks } = require("./handlers/callbacks");
const { handleAuthMessage } = require("./handlers/authHandler");

setupCommands(bot);
setupCallbacks(bot);

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  if (await isWaitingForAuth(chatId)) {
    await handleAuthMessage(bot, msg);
    await removeAuthSession(chatId);
  }
});

module.exports = { bot };
