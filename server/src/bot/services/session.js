const { getAdminByLogin } = require("../../db/dbAdmin");
const bcrypt = require("bcrypt");
const sessions = {};

async function findUser(login) {
  return await getAdminByLogin(login);
}

async function checkPassword(user, password) {
  if (!user || !user.passwordHash) return false;
  return await bcrypt.compare(password, user.passwordHash);
}

function setSession(chatId, login) {
  sessions[chatId] = { isAuth: true, user: login };
}

function clearSession(chatId) {
  delete sessions[chatId];
}

function isAuth(chatId) {
  return sessions[chatId] && sessions[chatId].isAuth;
}

module.exports = {
  findUser,
  checkPassword,
  setSession,
  clearSession,
  isAuth,
};
