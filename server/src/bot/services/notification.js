const bot = require("../index").bot;
const { getAuthorizedChatIds } = require("../services/session");

async function sendNotification(order) {
  let serviceName = "";
  switch (order.fkIdService) {
    case "1":
      serviceName = "Укладка плитки";
      break;
    case "2":
      serviceName = "Рулонный/посевной газон";
      break;
    case "3":
      serviceName = "Грунтовая дорога";
      break;
    case "4":
      serviceName = "Забор";
      break;
    case "5":
      serviceName = "Фундамент";
      break;
    case "6":
      serviceName = "Водоотвод";
      break;
    case "7":
      serviceName = "Комплексные работы";
      break;
    default:
      serviceName = "Неизвестная услуга";
  }

  const chatIds = getAuthorizedChatIds();

  if (chatIds.length === 0) {
    console.log("Нет авторизованных пользователей для отправки уведомлений.");
    return;
  }

  const message = `
📄 <b>Новая заявка:</b>
📅 <b>Дата создания:</b>  ${new Date().toLocaleString()}
📌 <b>Данные:</b>
👤 <b>Имя:</b> ${order.firstName}
🔧 <b>Услуга:</b> ${serviceName}
📞 <b>Телефон:</b> <a href="tel:${order.phone}">${order.phone}</a>
📍 <b>Местонахождение:</b> ${order.location}
  `;

  try {
    for (const chatId of chatIds) {
      try {
        await bot.sendMessage(chatId, message, { parse_mode: "HTML" });
      } catch (error) {
        console.error(
          `Ошибка отправки уведомления пользователю ${chatId}:`,
          error
        );
      }
    }
  } catch (error) {
    console.error("Ошибка отправки уведомлений:", error);
  }
}

module.exports = { sendNotification };
