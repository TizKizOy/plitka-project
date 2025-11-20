const { sendAuthMenu } = require("./menu");

function setupCommands(bot) {
  bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;
    await sendAuthMenu(bot, chatId);
  });
}

module.exports = { setupCommands };
