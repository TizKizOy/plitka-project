require("dotenv").config();
const jwtService = require("../services/jwtService")

exports.isAuthenticated = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if(!token)
    return res.status(401).json({ error: "Нет access токена" });

  try {
    const decoded = jwtService.verifyAccessToken(token);
    if(!decoded)
      res.status(401).json({ error: "Нет access токена" });
    req.admin = decoded;
    next();
  } catch {
    res.status(403).json({ error: "Недействительный access токен" });
  }
};
