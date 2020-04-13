require("dotenv").config();
const express = require("express"),
  massive = require("massive"),
  session = require("express-session"),
  { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;
const ctrl = require("./controller");

const app = express();
const PORT = SERVER_PORT;

app.use(express.json());

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false }
}).then(db => {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
    app.set('db', db);
    console.log('db connected')
});