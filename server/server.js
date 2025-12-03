const dotenv = require("dotenv");
const cors = require("cors");

const createApp = require("./src/app/createApp");
const orderRoutes = require("./src/routes/v1/orderRoutes");
const adminRoutes = require("./src/routes/v1/adminRoutes");
const logger = require("./src/middlewares/logger");

dotenv.config();
const app = createApp();

app.use(
  cors({
    origin: [
      process.env.URL_OF_CORS_1,
      process.env.URL_OF_CORS_2,
      process.env.URL_OF_CORS_3,
    ],
    credentials: true,
  })
);

app.use(logger);
app.get("/", (req, res) => {
  res.json({
    message:
      "Добро пожаловать в API заказов! Используйте '/plitka-project/api/v1/order' для работы с заявками. ",
  });
});

app.use("/plitka-project/api/v1", orderRoutes);
app.use("/plitka-project/api/v1/admin", adminRoutes);

const port = process.env.PORT;
const server = app.listen(port, () => {
  const host = server.address().address;
  const actualPort = server.address().port;
  console.log(
    `Сервер запущен по адресу: http://${
      host === "::" ? "localhost" : host
    }:${actualPort}`
  );
});
