const { formatOrderMessage } = require("../services/formatOrderMessage");
const { validateOrderData } = require("../services/validation");
const { updateOrder, getOrderById } = require("../services/order");

async function handleFieldEdit(
  bot,
  chatId,
  messageId,
  orderId,
  fieldName,
  fieldLabel,
  orderNumber
) {
  await bot.editMessageText(
    `Введите новое значение для поля "${fieldLabel}" заявки #${orderId}:`,
    {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Отмена",
              callback_data: `change_order_${orderId}_${orderNumber}`,
            },
          ],
        ],
      },
    }
  );

  return new Promise((resolve) => {
    bot.once("message", async (msg) => {
      if (msg.chat.id !== chatId) return;

      const inputValue = msg.text;
      const validationData = { [fieldName]: inputValue };
      const validationResult = validateOrderData(validationData);

      if (!validationResult.isValid) {
        const errorMessage = Object.values(validationResult.errors).join("\n");
        await bot.sendMessage(chatId, `❌ ${errorMessage}`);

        const callbackQuery = {
          id: Date.now().toString(),
          from: { id: chatId, is_bot: false, first_name: "" },
          message: { chat: { id: chatId }, message_id: messageId },
          data: `change_order_${orderId}_${orderNumber}`,
        };
        bot.emit("callback_query", callbackQuery);
        return;
      }

      resolve(inputValue);
    });
  });
}

async function updateAndShowOrder(
  bot,
  chatId,
  messageId,
  orderId,
  updateData,
  orderNumber
) {
  try {
    const order = await getOrderById(orderId);
    if (!order) {
      await bot.sendMessage(chatId, "Заявка не найдена.");
      return;
    }

    const validationResult = validateOrderData(updateData);
    if (!validationResult.isValid) {
      const errorMessage = Object.values(validationResult.errors).join("\n");
      await bot.sendMessage(chatId, `❌ ${errorMessage}`);

      const callbackQuery = {
        id: Date.now().toString(),
        from: { id: chatId, is_bot: false, first_name: "" },
        message: { chat: { id: chatId }, message_id: messageId },
        data: `change_order_${orderId}_${orderNumber}`,
      };
      bot.emit("callback_query", callbackQuery);
      return;
    }

    await updateOrder(orderId, updateData);
    const updatedOrder = await getOrderById(orderId);
    const message = formatOrderMessage(updatedOrder, parseInt(orderNumber) + 1);

    try {
      await bot.editMessageText(message, {
        chat_id: chatId,
        message_id: messageId,
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: `Редактировать #${updatedOrder.pkIdOrder}`,
                callback_data: `change_order_${updatedOrder.pkIdOrder}_${orderNumber}`,
              },
              {
                text: `Удалить #${updatedOrder.pkIdOrder}`,
                callback_data: `delete_order_${updatedOrder.pkIdOrder}_${orderNumber}`,
              },
            ],
          ],
        },
      });
    } catch (error) {
      console.error(`Ошибка при редактировании сообщения:`, error);
      await bot.sendMessage(chatId, message, {
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: `Редактировать #${updatedOrder.pkIdOrder}`,
                callback_data: `change_order_${updatedOrder.pkIdOrder}_${orderNumber}`,
              },
              {
                text: `Удалить #${updatedOrder.pkIdOrder}`,
                callback_data: `delete_order_${updatedOrder.pkIdOrder}_${orderNumber}`,
              },
            ],
          ],
        },
      });
    }
  } catch (error) {
    console.error(`Ошибка при изменении ${Object.keys(updateData)}:`, error);
    await bot.sendMessage(
      chatId,
      `❌ Произошла ошибка при изменении ${Object.keys(updateData)}.`
    );
  }
}

module.exports = {
  handleFieldEdit,
  updateAndShowOrder,
};
