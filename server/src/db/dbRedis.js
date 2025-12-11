const redis = require("redis");
require("dotenv").config();

const redisClient = redis.createClient({
  username: process.env.REDIS_USER,
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});

redisClient.on("error", (err) => {
  console.error("dbRedis ERROR:", err.message);
});

(async () => {
  try {
    await redisClient.connect();
    console.log("dbRedis OK");
  } catch (err) {
    console.error("dbRedis ERROR:", err.message);
  }
})();

module.exports = redisClient;
