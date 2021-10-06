const mongoose = require("mongoose");
require("dotenv").config();
// dotenv отвечает за содержимое файла .env превращаеться в еще одно переменное окружение
const MONGO_CONNECTION = process.env.MONGO_CONNECTION;

const db = mongoose.connect(MONGO_CONNECTION, {
  // подключение к базе данных
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  poolSize: 5,
});

mongoose.connection.on("connected", () => {
  console.log("Mongoose: Database connection successful.");
});

mongoose.connection.on("error", (error) => {
  console.log(`Mongoose: Error Database connection: ${error.message}.`);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose: Database connection terminated.");
});

process.on("SIGINT", async () => {
  mongoose.connection.close(() => {
    console.log("Database connection terminated.");
    process.exit(1);
  });
});

module.exports = db;
