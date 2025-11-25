const { sendAuthMenu, sendMainMenu } = require("./menu");
const { isAuth } = require("../services/session");

function setupCommands(bot) {
  bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;
    await sendAuthMenu(bot, chatId);
  });

  bot.onText(/\/command/, async (msg) => {
    const chatId = msg.chat.id;
    await sendMainMenu(bot, chatId);
  });
}

module.exports = { setupCommands };
