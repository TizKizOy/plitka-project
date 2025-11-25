const { getAdminByLogin } = require("../../db/dbAdmin");
const bcrypt = require("bcrypt");
const sessions = {};
const authSessions = new Set();

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

function getAuthorizedChatIds() {
  return Object.keys(sessions).filter((chatId) => sessions[chatId].isAuth);
}

function addAuthSession(chatId) {
  authSessions.add(chatId);
}

function removeAuthSession(chatId) {
  authSessions.delete(chatId);
}

function isWaitingForAuth(chatId) {
  return authSessions.has(chatId);
}

module.exports = {
  findUser,
  checkPassword,
  setSession,
  clearSession,
  isAuth,
  getAuthorizedChatIds,
  addAuthSession,
  removeAuthSession,
  isWaitingForAuth,
};
