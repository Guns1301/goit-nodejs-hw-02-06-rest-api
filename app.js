const express = require("express");
// импортируем express - это иструмент для создания web сервера и его натроек
const logger = require("morgan");
const cors = require("cors");

const contactsRouter = require("./routes/api/contacts");

const app = express(); // чтобы создать сервер нужно вызвать express как функцию

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json()); //востановить из строки в объект

app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  // метод use создает middleware - промежуточные обработчики
  res.status(500).json({ message: err.message });
  //next - функция которая передает обработку дальше
});

module.exports = app;
