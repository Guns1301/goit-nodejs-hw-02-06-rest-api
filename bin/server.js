const app = require("../app");
const db = require("../model/db");
const { Port } = require("../helpers/constants");
require("dotenv").config();

const PORT = process.env.PORT || Port.default;

db.then(() => {
  // если удалось подключиться к базе - запускаем сервер
  app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
}).catch((error) => {
  // если не удалось подключиться
  console.log(`Error: ${error.message}.`);
});
