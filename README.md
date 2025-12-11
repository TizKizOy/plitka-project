# 🧩 TileHaus

Веб‑приложение для оказания услуг по благоустройству частных участков.  
Проект создан как пет‑проект для практики веб‑разработки.

---

## 🚀 Демо

| Платформа       | Ссылка                                       |
| --------------- | -------------------------------------------- |
| Render (Client) | [Открыть](https://tilehaus.onrender.com)     |
| Render (Server) | [Открыть](https://tilehaus-api.onrender.com) |

> ⚠️ Важно: сервер работает на бесплатном тарифе Render.  
> При первом запросе после простоя он «просыпается», поэтому ответ может занять до **30 секунд**.

---

## ✨ Функционал

### 🖥 Client (страница для клиента)

- Отображение информации о компании и услугах благоустройства
- Форма для отправки заявки на сервер
- Адаптивный дизайн
- Навигация через React Router
- Сжатие ресурсов через `vite-plugin-compression` в `gzip`.

### 🔑 Auth (авторизация)

- Авторизация через `access` и `refresh` токены (JWT)
- Хранение `accessToken` в `localStorage`, `refreshToken` в `httpOnly` cookie
- Обновление `accessToken` через `/refresh` эндпоинт
- Защита приватных маршрутов через middleware

### 🛠 Admin (админ‑панель)

- Просмотр списка всех заявок
- Редактирование заявки по любому полю
- Удаление заявок
- Защищённый доступ через авторизацию
- Связь с сервером осуществляется через REST API (/v1/order, /v1/admin) с проверкой `accessToken`
- Все действия админ‑панели реализованы через асинхронные запросы (axios) и обрабатываются на сервере через Express‑контроллеры

### ⚙️ Server (бэкенд)

- Обработка всех запросов от клиента и админ‑панели через REST API
- Авторизация и аутентификация пользователей с использованием JWT (`access` и `refresh` токены)
- Хэширование паролей через **bcrypt** и генерация уникальных идентификаторов через **uuid**
- Управление сессиями через **Redis**
- Работа с базой данных **PostgreSQL**: хранение заявок, пользователей и логов
- Разделение логики по слоям: `controllers`, `services`, `middlewares`, `routes`
- Валидация входных данных и обработка ошибок
- Интеграция с Telegram‑ботом для уведомлений и управления заявками

### 🤖 Bot (серверный помощник) 🏗🌿

- Серверный Telegram-бот
- Получение новых заявок в реальном времени
- Команды для редактирования и удаления заявок
- Интеграция с Express через сервисный слой

---

## 🛠️ Технологии

- **Frontend:** React, Vite, MUI, React Router
- **Backend:** Node.js, Express, JWT, Bcrypt, Uuid, PostgreSQL, Redis
- **Bot:** Telegram Bot API
- **Deployment:** Render

---

## 📂 Структура проекта

```text
plitka-project/
├── client/ # фронтенд (React + Vite)
│ ├── public/ # статические файлы
│ ├── src/
│ │ ├── features/ # фичи
│ │ │ ├── client/ # клиентская страница
│ │ │ ├── auth/ # авторизация
│ │ │ ├── admin/ # админ‑панель
│ │ ├── shared/ # общее
│ │ │ ├── components/ # переиспользуемые компоненты
│ │ │ ├── hooks/ # кастомные хуки
│ │ │ ├── pages/ # страницы
│ │ │ ├── data/ # статические данные
│ │ | ├── route/ # маршруты
│ │ ├── App.jsx
│ │ ├── main.jsx
│ ├── index.html
│ ├── vite.config.js
│ ├── .env
│ └── ...
├── server/ # бэкенд (Express + PostgreSQL + Redis)
│ ├── src/
│ │ ├── app/ # инициализация express
│ │ ├── bot/ # логика Telegram-бота
│ │ ├── controllers/ # обработчики маршрутов
│ │ ├── db/ # подключение к базе данных
│ │ ├── middlewares/ # middleware-функции
│ │ ├── routes/ # маршруты express
│ │ ├── services/ # бизнес-логика
│ │ ├── utils/ # утилиты
│ ├── server.js
│ ├── .env
│ └── ...
├── README.md
└── ...
```

---

## 📖 API(основные эндпоинты)

- `GET /v1/order` — получение всех заявок
- `GET /v1/order/:id` — получение заявки по ID
- `POST /v1/order` — создать заявку
- `PUT /v1/order/:id` — редактировать заявку
- `DELETE /v1/order/:id` — удалить заявку

- `GET /v1/admin/protected` — проверка авторизации
- `POST /v1/admin/login` — авторизация
- `POST /v1/admin/logout` — выход с аккаунта

---

## ⚙️ Конфигурация

### Client `.env`

```env
VITE_API_URL=https://tilehaus-api...
```

### Server `.env`

```env
PORT=5000
URL_OF_CORS_1=https://tilehaus-api...

TOKEN_BOT=your-telegram-bot-token

ACCESS_SECRET_KEY=your-access-secret
REFRESH_SECRET_KEY=your-refresh-secret

DB_HOST=your-db-host
DB_NAME=your-db-name

REDIS_HOST=your-redis-host
```

---

## 📦 Installation and start

```bash
git clone https://github.com/TizKizOy/plitka-project.git
# client
cd plitka-project/client
npm install
npm dev

# server
cd plitka-project/server
npm install
create .env file
npm start
```
