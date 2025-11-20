const db = require("../../db/dbOrder");

async function getAllOrders({ status, startDate, endDate, searchText } = {}) {
  try {
    const result = await db.readOrder({
      status,
      startDate,
      endDate,
      searchText,
    });
    return result.orders || [];
  } catch (error) {
    console.error("Ошибка при получении всех заказов:", error);
    return [];
  }
}

async function getLastOrder() {
  try {
    const orders = await db.readOrder();
    if (!orders || !orders.orders || orders.orders.length === 0) {
      return null;
    }
    return orders.orders[orders.orders.length - 1];
  } catch (error) {
    console.error("Ошибка при получении последнего заказа:", error);
    return null;
  }
}

module.exports = { getAllOrders, getLastOrder };
