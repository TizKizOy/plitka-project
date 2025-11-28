const pool = require('./dbConfig')
const bcrypt = require("bcrypt");

exports.getAdminByLogin = async (login) => {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM pr_GetAdminByLogin($1);`,
      [login]
    );
    return rows[0] || null;
  } catch (err) {
    console.error("Ошибка при получении админа:", err);
    throw err;
  }
};

exports.createAdmin = async (login, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const { rows } = await pool.query(
      `SELECT * FROM pr_CreateAdmin($1, $2);`,
      [login, hashedPassword]
    );
    return rows[0];
  } catch (err) {
    console.error("Ошибка при создании админа:", err);
    throw err;
  }
};


