async function sendAuthMenu(bot, chatId) {
  const options = {
    reply_markup: {
      inline_keyboard: [
        [
          { text: "🔐 Авторизация", callback_data: "auth" },
          { text: "❓ Помощь", callback_data: "help" },
        ],
      ],
    },
  };
  await bot.sendMessage(
    chatId,
    "👋 Привет! Для работы с ботом необходимо авторизоваться.",
    options
  );
}

async function sendMainMenu(bot, chatId) {
  const options = {
    reply_markup: {
      inline_keyboard: [
        [
          { text: "📋 Все заявки", callback_data: "all_orders" },
          { text: "📄 Последняя заявка", callback_data: "last_order" },
        ],
        [
          { text: "🚪 Выход", callback_data: "exit" },
          { text: "❓ Помощь", callback_data: "help_after_auth" },
        ],
      ],
    },
  };
  await bot.sendMessage(chatId, "Выберите действие:", options);
}

module.exports = { sendMainMenu, sendAuthMenu };
