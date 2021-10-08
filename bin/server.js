const app = require("../app");
const db = require("../model/db");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

db.then(() => {
  // если удалось подключиться к базе - запускаем сервер
  app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
}).catch((error) => {
  // если не удалось подключиться
  console.log(`Error: ${error.message}.`);
});
