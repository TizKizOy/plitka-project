function formatOrderMessage(order, orderNumber = null) {
  const formattedDate = order.dateOfCreation
    ? new Date(order.dateOfCreation).toLocaleString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "N/A";
  return `
${orderNumber || ""} 📄 <b>Заявка #${order.pkIdOrder || "N/A"}</b>
👤 <b>Имя:</b> ${order.firstName || "N/A"}
📞 <b>Телефон:</b> <a href="tel:${order.phone}">${order.phone || "N/A"}</a>
📍 <b>Местонахождение:</b> ${order.location || "N/A"}
📅 <b>Дата создания:</b> ${formattedDate}
🔧 <b>Услуга:</b> ${order.serviceName || "N/A"}
📌 <b>Статус:</b> ${order.status || "N/A"}
💬 <b>Комментарий:</b> ${order.comment || "Нет комментариев"}
  `;
}

module.exports = { formatOrderMessage };
