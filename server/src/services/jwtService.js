const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_SECRET_KEY, {
    algorithm: "HS256",
  });
};

exports.signRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_SECRET_KEY, {
    algorithm: "HS512",
  });
};

exports.verifyAccessToken = (accessToken) => {
  return jwt.verify(accessToken, process.env.ACCESS_SECRET_KEY, {
    algorithm: "HS256",
  });
};

exports.verifyRefreshToken = (refreshToken) => {
  return jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY, {
    algorithm: "HS512",
  });
};
