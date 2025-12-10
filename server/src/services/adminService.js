const bcrypt = require("bcrypt");
const dbAdmin = require("../db/dbAdmin");
const jwtService = require("./jwtService");

exports.login = async (login, password) => {
  const admin = await dbAdmin.getAdminByLogin(login);
  if (!admin) throw new Error("Админ не найден");

  const isPasswordValid = await bcrypt.compare(password, admin.passwordHash);
  if (!isPasswordValid) throw new Error("Неверный пароль");

  const payload = {
    userId: admin.pkIdAdmin,
    login: admin.login,
    role: admin.login,
  };

  const accessToken = jwtService.signAccessToken(payload);
  const refreshToken = jwtService.signRefreshToken(payload);

  return { accessToken, refreshToken };
};
