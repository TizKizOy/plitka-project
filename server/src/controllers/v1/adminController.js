require("dotenv").config();
const jwtService = require("../../services/jwtService");
const adminService = require("../../services/adminService");
const isProduction = process.env.NODE_ENV == "production";

exports.login = async (req, res) => {
  try {
    const { login, password } = req.body;
    if (!login || !password) {
      return res.status(400).json({ error: "Логин и пароль обязательны!" });
    }
    const { accessToken, refreshToken } = await adminService.login(
      login,
      password
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: "Авторизация успешна!", accessToken });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

exports.refresh = (req, res) => {
  const refreshToken = req.cookies?.refreshToken;
  if (!refreshToken)
    return res.status(401).json({ error: "Нет refresh токена" });
  try {
    const decoded = jwtService.verifyRefreshToken(refreshToken);
    const accessToken = jwtService.signAccessToken({
      userId: decoded.pkIdAdmin,
      login: decoded.login,
      role: decoded.login,
    });
    res.json({ message: "Успешное обновление accessToken!", accessToken });
  } catch {
    res.status(403).json({ error: "Недействительный refresh токен" });
  }
};

exports.logout = (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
  });
  res.json({ message: "Выход выполнен!" });
};

exports.protected = (req, res) => {
  res.json({ message: "Доступ разрешён!", admin: true });
};
