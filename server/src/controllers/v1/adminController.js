const adminService = require('../../services/adminService');

exports.login = async (req, res) => {
  try {
    const { login, password } = req.body;
    if (!login || !password) {
      return res.status(400).json({ error: "Логин и пароль обязательны!" });
    }
    const { admin, token } = await adminService.login(login, password);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none", //lax
      maxAge: 1000 * 60 * 60,
    });

    res.status(200).json({ message: "Авторизация успешна!", token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

exports.logout = (req, res) => {
  res.json({ message: 'Выход выполнен!' });
};

exports.protected = (req, res) => {
  res.json({ message: "Доступ разрешён!", admin: true });
};