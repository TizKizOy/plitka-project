const express = require("express");
const cookieParser = require("cookie-parser");

function createApp() {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  return app;
}

module.exports = createApp;
