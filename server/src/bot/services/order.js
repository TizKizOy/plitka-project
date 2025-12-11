const db = require("../../db/dbOrder");

async function getAllOrders({ status, startDate, endDate, searchText } = {}) {
  try {
    const result = await db.readOrder({
      status,
      startDate,
      endDate,
      searchText,
    });
    return result.reverse() || [];
  } catch (error) {
    console.error("Ошибка при получении всех заказов:", error);
    return [];
  }
}

async function getOrderById(pkIdOrder) {
  try {
    const result = await db.getOrderById(pkIdOrder);
    return result;
  } catch (error) {
    console.error("Ошибка при получении заказа:", error);
  }
}

async function getLastOrder() {
  try {
    const orders = await db.readOrder();
    if (!orders || orders.length === 0) {
      return null;
    }
    return orders[0];
  } catch (error) {
    console.error("Ошибка при получении последнего заказа:", error);
    return null;
  }
}

async function updateOrder(orderId, newData) {
  try {
    await db.updateOrder(orderId, newData);
  } catch (error) {
    console.error("Ошибка при редактировании заявки:", error);
  }
}

async function deleteOrder(orderId) {
  try {
    await db.deleteOrder(orderId);
  } catch (error) {
    console.error("Ошибка при удалении заявки:", error);
  }
}

module.exports = {
  getAllOrders,
  getLastOrder,
  updateOrder,
  deleteOrder,
  getOrderById,
};
