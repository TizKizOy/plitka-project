const { findUser, checkPassword, setSession } = require("../services/session");
const { sendMainMenu } = require("./menu");

async function handleAuthMessage(bot, msg) {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text && text.split(" ").length === 2) {
    const [login, password] = text.split(" ");

    try {
      const user = await findUser(login);
      if (user && (await checkPassword(user, password))) {
        setSession(chatId, login);
        await bot.sendMessage(
          chatId,
          `✅ Авторизация успешна! Добро пожаловать, ${login}`
        );
        await sendMainMenu(bot, chatId);

      } else {
        await bot.sendMessage(chatId, "❌ Неверный логин или пароль.");
      }
    } catch (error) {
      console.error("Ошибка авторизации:", error);
      await bot.sendMessage(chatId, "❌ Ошибка сервера. Попробуйте позже.");
    }
  }
}

module.exports = { handleAuthMessage };
