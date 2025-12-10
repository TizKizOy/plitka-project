const { getAdminByLogin } = require("../../db/dbAdmin");
const bcrypt = require("bcrypt");
const redisClient = require("../../db/dbRedis");

async function findUser(login) {
  return await getAdminByLogin(login);
}

async function checkPassword(user, password) {
  if (!user || !user.passwordHash) return false;
  return await bcrypt.compare(password, user.passwordHash);
}

async function setSession(chatId, login) {
  const sessionData = { isAuth: true, user: login };
  await redisClient.set(`session:${chatId}`, JSON.stringify(sessionData), {
    EX: 3600,
  });
}

async function clearSession(chatId) {
  await redisClient.del(`session:${chatId}`);
}

async function isAuth(chatId) {
  const data = await redisClient.get(`session:${chatId}`);
  if(!data) return false

  const session = JSON.parse(data)
  return session.isAuth;
}

async function getAuthorizedChatIds() {
  const ids = await redisClient.sMembers("authorizedChats");
  return ids;
}

async function addAuthSession(chatId) {
  await redisClient.sAdd("authSessions", String(chatId));
}

async function removeAuthSession(chatId) {
  await redisClient.sRem("authSessions", String(chatId));
}

async function isWaitingForAuth(chatId) {
  return await redisClient.sIsMember("authSessions", String(chatId));
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
