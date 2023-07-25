// server.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const userRoutes = require('./Routes/userRoutes.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("api" , userRoutes);

const port = 3000;

const db = require('./Model/user.js');

async function syncDatabase() {
  try {
    await db.sequelize.sync();
    console.log('Database synchronized successfully.');
  } catch (err) {
    console.error('Unable to synchronize the database:', err);
  }
}

syncDatabase();

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
