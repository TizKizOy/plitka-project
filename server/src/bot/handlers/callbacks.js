const { getAllOrders, getLastOrder } = require("../services/order");
const { isAuth } = require("../services/session");
const { sendMainMenu } = require("./menu");

function setupCallbacks(bot) {
  bot.on("callback_query", async (callbackQuery) => {
    const chatId = callbackQuery.message.chat.id;
    const data = callbackQuery.data;

    try {
      if (data === "auth") {
        await bot.sendMessage(
          chatId,
          "🔐 Введите логин и пароль в формате: логин пароль"
        );
        return;
      }

      if (data === "help") {
        return bot.answerCallbackQuery(callbackQuery.id, {
          text: `🤖 Для работы с ботом авторизуйтесь.

Доступные функции после авторизации:
📋 Все заявки
📄 Последняя заявка`,
          show_alert: true,
        });
      }

      if (data !== "auth" && !isAuth(chatId)) {
        return bot.answerCallbackQuery(callbackQuery.id, {
          text: "⚠️ Сначала авторизуйтесь через кнопку 'Авторизация'",
          show_alert: true,
        });
      } 

      if (data === "all_orders") {
        const orders = await getAllOrders();
        if (!orders || orders.length === 0) {
          await bot.sendMessage(chatId, "Нет заявок.");
        } else {
          const chunkSize = 5;
          for (let i = 0; i < orders.length; i += chunkSize) {
            const chunk = orders.slice(i, i + chunkSize);
            let message = "📋 <b>Список заявок:</b>\n\n";
            chunk.forEach((order, index) => {
              const formattedDate = order.dateOfCreation
                ? new Date(order.dateOfCreation).toLocaleString("ru-RU", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })
                : "N/A";
              message += `
${i + index + 1}. 📄 <b>Заявка #${order.pkIdOrder || "N/A"}</b>
👤 <b>Имя:</b> ${order.firstName || "N/A"}
📞 <b>Телефон:</b> <a href="tel:${order.phone}">${order.phone || "N/A"}</a>
📍 <b>Местонахождение:</b> ${order.location || "N/A"}
📅 <b>Дата создания:</b> ${formattedDate}
🔧 <b>Услуга:</b> ${order.serviceName || "N/A"}
📌 <b>Статус:</b> ${order.status || "N/A"}
💬 <b>Комментарий:</b> ${order.comment || "Нет комментариев"}
${index < chunk.length - 1 ? "────────────────────\n" : ""}
              `;
            });
            await bot.sendMessage(chatId, message, { parse_mode: "HTML" });
          }
          await sendMainMenu(bot, chatId);
        }

      } else if (data === "last_order") {
        const lastOrder = await getLastOrder();
        if (!lastOrder) {
          await bot.sendMessage(chatId, "Нет заявок.");
        } else {
          const formattedDate = lastOrder.dateOfCreation
            ? new Date(lastOrder.dateOfCreation).toLocaleString("ru-RU", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })
            : "N/A";
          const message = `
📄 <b>Последняя заявка:</b>
🔹 <b>Номер заявки:</b> <code>${lastOrder.pkIdOrder || "N/A"}</code>
👤 <b>Имя:</b> ${lastOrder.firstName || "N/A"}
📞 <b>Телефон:</b> <a href="tel:${lastOrder.phone}">${
            lastOrder.phone || "N/A"
          }</a>
📍 <b>Местонахождение:</b> ${lastOrder.location || "N/A"}
📅 <b>Дата создания:</b> ${formattedDate}
🔧 <b>Услуга:</b> ${lastOrder.serviceName || "N/A"}
📌 <b>Статус:</b> ${lastOrder.status || "N/A"}
💬 <b>Комментарий:</b> ${lastOrder.comment || "Нет комментариев"}
          `;
          await bot.sendMessage(chatId, message, { parse_mode: "HTML" });
        }
        await sendMainMenu(bot, chatId);
      }
    } catch (error) {
      console.error("Ошибка при обработке callback:", error);
      await bot.sendMessage(chatId, "❌ Произошла ошибка. Попробуйте позже.");
    }
  });
}

module.exports = { setupCallbacks };
