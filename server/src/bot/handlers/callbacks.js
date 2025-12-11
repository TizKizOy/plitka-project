const {
  isAuth,
  clearSession,
  addAuthSession,
  removeAuthorizedChatIds,
} = require("../services/session");
const { formatOrderMessage } = require("../services/formatOrderMessage");
const { handleFieldEdit, updateAndShowOrder } = require("./orderHandlers");
const {
  getAllOrders,
  getLastOrder,
  deleteOrder,
  getOrderById,
} = require("../services/order");

function setupCallbacks(bot) {
  bot.on("callback_query", async (callbackQuery) => {
    const chatId = callbackQuery.message.chat.id;
    const messageId = callbackQuery.message.message_id;
    const data = callbackQuery.data;

    try {
      if (data === "auth") {
        await addAuthSession(chatId);
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
1️⃣ Все заявки,
2️⃣ Последняя заявка
3️⃣ Редактирование и удаление заявок`,
          show_alert: true,
        });
      }

      const authed = await isAuth(chatId);
      if (!authed && data !== "auth") {
        return bot.answerCallbackQuery(callbackQuery.id, {
          text: "⚠️ Сначала авторизуйтесь через кнопку 'Авторизация'",
          show_alert: true,
        });
      }

      if (data === "exit") {
        await clearSession(chatId);
        await removeAuthorizedChatIds(chatId);
        await bot.answerCallbackQuery(callbackQuery.id, {
          text: "Вы вышли из аккаунта. 👋",
          show_alert: true,
        });
        return;
      }

      if (data === "help_after_auth") {
        const helpMessage = `
📌 <b>Инструкция по работе с ботом:</b>

1️⃣ <b>Все заявки</b>
Нажмите кнопку "Все заявки", чтобы увидеть список всех доступных заявок.
- Каждая заявка будет иметь кнопки "Редактировать" и "Удалить".
- Чтобы отредактировать заявку, нажмите "Редактировать", затем выберите поле, которое хотите изменить, и следуйте инструкциям.
- Чтобы удалить заявку, нажмите "Удалить", затем подтвердите удаление.

2️⃣ <b>Последняя заявка</b>
Нажмите кнопку "Последняя заявка", чтобы увидеть информацию о последней добавленной заявке.
- Вы также можете отредактировать или удалить её, используя соответствующие кнопки.

3️⃣ <b>Выход</b>
Нажмите кнопку "Выход", чтобы завершить сессию и выйти из аккаунта.
    `;
        await bot.sendMessage(chatId, helpMessage, { parse_mode: "HTML" });
      }

      if (data === "all_orders") {
        const orders = await getAllOrders();
        if (!orders || orders.length === 0) {
          await bot.sendMessage(chatId, "Нет заявок.");
        } else {
          let orderNumber = 1;
          for (const order of orders) {
            const message = formatOrderMessage(order, orderNumber++);
            await bot.sendMessage(chatId, message, {
              parse_mode: "HTML",
              reply_markup: {
                inline_keyboard: [
                  [
                    {
                      text: `Редактировать #${order.pkIdOrder}`,
                      callback_data: `change_order_${order.pkIdOrder}`,
                    },
                    {
                      text: `Удалить #${order.pkIdOrder}`,
                      callback_data: `delete_order_${order.pkIdOrder}`,
                    },
                  ],
                ],
              },
            });
          }
        }
      }

      if (data === "last_order") {
        const lastOrder = await getLastOrder();
        if (!lastOrder) {
          await bot.sendMessage(chatId, "Нет заявок.");
        } else {
          const message = `
📄 <b>Последняя заявка:</b>
${formatOrderMessage(lastOrder, 1).replace("1 📄", "")}
          `;
          await bot.sendMessage(chatId, message, {
            parse_mode: "HTML",
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: `Редактировать #${lastOrder.pkIdOrder}`,
                    callback_data: `change_order_${lastOrder.pkIdOrder}`,
                  },
                  {
                    text: `Удалить #${lastOrder.pkIdOrder}`,
                    callback_data: `delete_order_${lastOrder.pkIdOrder}`,
                  },
                ],
              ],
            },
          });
        }
      }

      if (data.startsWith("change_order_")) {
        const orderId = data.split("_")[2];
        const order = await getOrderById(orderId);
        if (!order) {
          await bot.sendMessage(chatId, "Заявка не найдена.");
          return;
        }
        const message = `✏️
${formatOrderMessage(order)}
Выберите поле для редактирования заявки #${orderId}:
        `;
        await bot.editMessageText(message, {
          chat_id: chatId,
          message_id: messageId,
          parse_mode: "HTML",
          reply_markup: {
            inline_keyboard: [
              [
                { text: "Имя", callback_data: `change_name_${orderId}` },
                { text: "Телефон", callback_data: `change_phone_${orderId}` },
              ],
              [
                {
                  text: "Местонахождение",
                  callback_data: `change_location_${orderId}`,
                },
                { text: "Услуга", callback_data: `change_service_${orderId}` },
              ],
              [
                { text: "Статус", callback_data: `change_status_${orderId}` },
                {
                  text: "Комментарий",
                  callback_data: `change_comment_${orderId}`,
                },
              ],
              [{ text: "Назад", callback_data: `show_order_${orderId}` }],
            ],
          },
        });
      }

      if (data.startsWith("show_order_")) {
        const orderId = data.split("_")[2];
        const order = await getOrderById(orderId);
        if (!order) {
          await bot.sendMessage(chatId, "Заявка не найдена.");
          return;
        }
        const message = `✏️ ${formatOrderMessage(order)}`;
        await bot.editMessageText(message, {
          chat_id: chatId,
          message_id: messageId,
          parse_mode: "HTML",
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: `Редактировать #${order.pkIdOrder}`,
                  callback_data: `change_order_${order.pkIdOrder}`,
                },
                {
                  text: `Удалить #${order.pkIdOrder}`,
                  callback_data: `delete_order_${order.pkIdOrder}`,
                },
              ],
            ],
          },
        });
      }

      if (data.startsWith("change_name_")) {
        const orderId = data.split("_")[2];
        const newName = await handleFieldEdit(
          bot,
          chatId,
          messageId,
          orderId,
          "firstName",
          "Имя"
        );
        await updateAndShowOrder(bot, chatId, messageId, orderId, {
          firstName: newName,
        });
      }

      if (data.startsWith("change_phone_")) {
        const orderId = data.split("_")[2];
        const newPhone = await handleFieldEdit(
          bot,
          chatId,
          messageId,
          orderId,
          "phone",
          "Телефон"
        );
        await updateAndShowOrder(bot, chatId, messageId, orderId, {
          phone: newPhone,
        });
      }

      if (data.startsWith("change_location_")) {
        const orderId = data.split("_")[2];
        const newLocation = await handleFieldEdit(
          bot,
          chatId,
          messageId,
          orderId,
          "location",
          "Местонахождение"
        );
        await updateAndShowOrder(bot, chatId, messageId, orderId, {
          location: newLocation,
        });
      }

      if (data.startsWith("change_service_")) {
        const orderId = data.split("_")[2];
        await bot.editMessageText(`Выберите услугу для заявки #${orderId}:`, {
          chat_id: chatId,
          message_id: messageId,
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "Укладка плитки",
                  callback_data: `set_service_${orderId}_1`,
                },
                {
                  text: "Рулонный/посевной газон",
                  callback_data: `set_service_${orderId}_2`,
                },
              ],
              [
                {
                  text: "Грунтовая дорога",
                  callback_data: `set_service_${orderId}_3`,
                },
                { text: "Забор", callback_data: `set_service_${orderId}_4` },
              ],
              [
                {
                  text: "Фундамент",
                  callback_data: `set_service_${orderId}_5`,
                },
                {
                  text: "Водоотвод",
                  callback_data: `set_service_${orderId}_6`,
                },
              ],
              [
                {
                  text: "Комплексные работы",
                  callback_data: `set_service_${orderId}_7`,
                },
              ],
              [{ text: "Отмена", callback_data: `change_order_${orderId}` }],
            ],
          },
        });
      }

      if (data.startsWith("set_service_")) {
        const [_, __, orderId, serviceId] = data.split("_");
        await updateAndShowOrder(bot, chatId, messageId, orderId, {
          fkIdService: Number(serviceId),
        });
      }

      if (data.startsWith("change_status_")) {
        const orderId = data.split("_")[2];
        await bot.editMessageText(`Выберите статус для заявки #${orderId}:`, {
          chat_id: chatId,
          message_id: messageId,
          reply_markup: {
            inline_keyboard: [
              [
                { text: "Активно", callback_data: `set_status_${orderId}_1` },
                { text: "Закрыто", callback_data: `set_status_${orderId}_2` },
              ],
              [{ text: "Отмена", callback_data: `change_order_${orderId}` }],
            ],
          },
        });
      }

      if (data.startsWith("set_status_")) {
        const [_, __, orderId, statusId] = data.split("_");
        await updateAndShowOrder(bot, chatId, messageId, orderId, {
          fkIdStatus: Number(statusId),
        });
      }

      if (data.startsWith("change_comment_")) {
        const orderId = data.split("_")[2];
        const newComment = await handleFieldEdit(
          bot,
          chatId,
          messageId,
          orderId,
          "comment",
          "Комментарий"
        );
        await updateAndShowOrder(bot, chatId, messageId, orderId, {
          comment: newComment,
        });
      }

      if (data.startsWith("delete_order_")) {
        const orderId = data.split("_")[2];
        await bot.editMessageText("Подтвердите удаление:", {
          chat_id: chatId,
          message_id: messageId,
          reply_markup: {
            inline_keyboard: [
              [
                { text: "Да", callback_data: `confirm_delete_${orderId}` },
                { text: "Нет", callback_data: `show_order_${orderId}` },
              ],
            ],
          },
        });
      }

      if (data.startsWith("confirm_delete_")) {
        const orderId = data.split("_")[2];
        try {
          await deleteOrder(orderId);
          await bot.editMessageText(`Заявка #${orderId} удалена.`, {
            chat_id: chatId,
            message_id: messageId,
          });
        } catch (error) {
          console.error("Ошибка при удалении заявки:", error);
          await bot.editMessageText(
            "❌ Произошла ошибка при удалении заявки.",
            {
              chat_id: chatId,
              message_id: messageId,
            }
          );
        }
      }
    } catch (error) {
      console.error("Ошибка при обработке callback:", error);
      await bot.sendMessage(chatId, "❌ Произошла ошибка. Попробуйте позже.");
    }
  });
}

module.exports = { setupCallbacks };
