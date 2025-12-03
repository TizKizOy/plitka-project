const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.isAuthenticated = (req, res, next) => {
  console.log(`req.headers["authorization"]: ${req.headers["authorization"]}`);
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log(`token: ${token}`)

  if(!token)
    return res.status(401).json({ error: "Токен обязателен!" });

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) =>{
    if(err)
      return res.status(403).json({ error: "Недействительный токен!" });
    req.admin = decoded;
    next()
  });
};
