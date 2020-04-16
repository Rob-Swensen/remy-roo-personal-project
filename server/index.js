require("dotenv").config();
const express = require("express"),
  massive = require("massive"),
  session = require("express-session"),
  { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;
const ctrl = require("./controller");
const authCtrl = require("./authController");

const app = express();
const PORT = SERVER_PORT;

app.use(express.json());

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false },
}).then((db) => {
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  app.set("db", db);
  console.log("db connected");
});

//Authentication Endpoints

app.post("/api/register", authCtrl.register);
app.post("/api/login", authCtrl.login);
app.get("/api/logout", authCtrl.logout);

//Product Endpoints

app.get('/api/products', ctrl.getProducts);
app.get('/api/product/:product_id', ctrl.getProduct);

//Cart Endpoints

app.post('/api/cart/:cart_id', ctrl.addToCart);
app.get('/api/cart/:cart_id', ctrl.getCart);