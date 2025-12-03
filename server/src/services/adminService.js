const dbAdmin = require("../db/dbAdmin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

exports.login = async (login, password) => {
  const admin = await dbAdmin.getAdminByLogin(login);
  if (!admin) throw new Error("Админ не найден");

  const isPasswordValid = await bcrypt.compare(password, admin.passwordHash);
  if (!isPasswordValid) throw new Error("Неверный пароль");

  const payload = {
    userId: admin.pkIdAdmin,
    login: admin.login,
  };

  const token = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });

  return { admin, token };
};
