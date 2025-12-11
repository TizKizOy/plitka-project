const pool = require("./dbConfig");

exports.readOrder = async ({ status, startDate, endDate, searchText } = {}) => {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM pr_FilterOrders($1, $2, $3, $4);`,
      [status || null, startDate || null, endDate || null, searchText || null]
    );
    return rows;
  } catch (err) {
    console.error("Ошибка при чтении заказов:", err);
    throw err;
  }
};

exports.addOrder = async (order) => {
  try {
    await pool.query(
      `SELECT pr_InsertOrder($1, $2, $3, $4, $5, $6);`,
      [
        order.pkIdOrder,
        order.firstName,
        order.phone,
        order.location,
        order.fkIdService || 7,
        order.fkIdStatus || 1,
      ]
    );
    const { rows } = await pool.query(`SELECT * FROM pr_GetOrderById($1);`, [
      order.pkIdOrder,
    ]);
    return rows[0];
  } catch (err) {
    console.error("Ошибка при добавлении заказа:", err);
    throw err;
  }
};

exports.getOrderById = async (pkIdOrder) => {
  try {
    const { rows } = await pool.query(`SELECT * FROM pr_GetOrderById($1);`, [
      pkIdOrder,
    ]);
    return rows[0] || null;
  } catch (err) {
    console.error("Ошибка при чтении заказа:", err);
    throw err;
  }
};

exports.updateOrder = async (pkIdOrder, newData) => {
  try {
    await pool.query(`SELECT pr_UpdateOrder($1, $2, $3, $4, $5, $6, $7);`, [
      pkIdOrder,
      newData.firstName || null,
      newData.phone || null,
      newData.location || null,
      newData.comment || null,
      newData.fkIdService || null,
      newData.fkIdStatus || null,
    ]);
    const { rows } = await pool.query(`SELECT * FROM pr_GetOrderById($1);`, [
      pkIdOrder,
    ]);
    return rows[0];
  } catch (err) {
    console.error("Ошибка при обновлении заказа:", err);
    throw err;
  }
};

exports.deleteOrder = async (pkIdOrder) => {
  try {
    await pool.query(`SELECT pr_DeleteOrder($1);`, [pkIdOrder]);
  } catch (err) {
    console.error("Ошибка при удалении заказа:", err);
    throw err;
  }
};

