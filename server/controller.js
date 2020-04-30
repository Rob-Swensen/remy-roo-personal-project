const { SECRET_KEY, EMAIL, PASSWORD } = process.env,
  stripe = require("stripe")(SECRET_KEY),
  nodemailer = require("nodemailer");

module.exports = {
  getProducts: (req, res) => {
    const db = req.app.get("db");

    db.products
      .get_products()
      .then((products) => res.status(200).send(products))
      .catch((err) => res.status(500).send(err));
  },
  getProduct: (req, res) => {
    const db = req.app.get("db");
    const { product_id } = req.params;

    db.products
      .get_product(product_id)
      .then((product) => res.status(200).send(product))
      .catch((err) => res.status(500).send(err));
  },
  addToCart: async (req, res) => {
    const db = req.app.get("db");
    const { cart_id } = req.params;
    const { product_id } = req.body;

    let cartItem = await db.cart.check_cart(cart_id, product_id);
    if (cartItem[0]) {
      return res.status(406).send("Item already in cart");
    }

    db.cart
      .add_to_cart(cart_id, product_id)
      .then((cart) => res.status(200).send(cart))
      .catch((err) => res.status(500).send(err));
  },
  getCart: (req, res) => {
    const db = req.app.get("db");
    const { cart_id } = req.params;

    db.cart
      .get_cart(cart_id)
      .then((cart) => res.status(200).send(cart))
      .catch((err) => res.status(500).send(err));
  },
  deleteCartItem: (req, res) => {
    const db = req.app.get("db");
    const { cart_id, product_id } = req.params;

    db.cart
      .delete_cart_item(cart_id, product_id)
      .then((cart) => res.status(200).send(cart))
      .catch((err) => res.status(500).send(err));
  },
  getSubtotal: (req, res) => {
    const db = req.app.get("db");
    const { cart_id } = req.params;

    db.cart
      .cart_total(cart_id)
      .then((price) => res.status(200).send(price))
      .catch((err) => res.status(500).send(err));
  },
  addProduct: (req, res) => {
    const db = req.app.get("db");
    const { name, image, description, price, image_2, image_3 } = req.body;

    db.products
      .create_product(name, image, description, price, image_2, image_3)
      .then(res.sendStatus(200))
      .catch((err) => res.status(500).send(err));
  },
  getCartCount: (req, res) => {
    const db = req.app.get("db");
    const { cart_id } = req.params;

    db.cart
      .cart_count(cart_id)
      .then((count) => res.status(200).send(count))
      .catch((err) => res.status(500).send(err));
  },
  deleteProduct: (req, res) => {
    const db = req.app.get("db");
    const { product_id } = req.params;
    console.log(req.params);

    db.products
      .delete_product(product_id)
      .then(res.sendStatus(200))
      .catch((err) => res.status(500).send(err));
  },
  updateQty: (req, res) => {
    const db = req.app.get("db");
    const { cart_id, product_id } = req.params;
    const { quantity } = req.body;

    db.cart
      .update_qty(quantity, cart_id, product_id)
      .then(res.sendStatus(200))
      .catch((err) => res.status(500).send(err));
  },
  completePayment: (req, res) => {
    const { token, amount } = req.body;
    console.log(req.body);

    const charge = stripe.charges.create(
      {
        amount,
        currency: "usd",
        source: token.id,
        description: "Test Charge",
      },
      function (err, charge) {
        if (err) {
          return res.sendStatus(500);
        }
        res.sendStatus(200);
      }
    );
  },
  changePaidStatus: (req, res) => {
    const db = req.app.get("db");
    const { cart_id } = req.params;
    const { date } = req.body;
    console.log(req.body);

    db.cart
      .change_paid_status(cart_id, date)
      .then(res.sendStatus(200))
      .catch((err) => res.status(500).send(err));
  },
  getNewCart: (req, res) => {
    const db = req.app.get("db");
    const { customer_id } = req.params;

    db.cart
      .create_cart(customer_id)
      .then((cart_id) => res.status(200).send(cart_id))
      .catch((err) => res.status(500).send(err));
  },
  getOrders: (req, res) => {
    const db = req.app.get("db");
    const { customer_id } = req.params;
    console.log(req.params);

    db.orders
      .get_orders(customer_id)
      .then((orders) => res.status(200).send(orders))
      .catch((err) => res.status(500).send(err));
  },
  email: async (req, res) => {
    const { email } = req.body;
    console.log(req.body)
    try {
      let transporter = nodemailer.createTransport({
        host: "smtp.mail.yahoo.com",
        port: 465,
        service: "yahoo",
        secure: false,
        auth: {
          user: EMAIL,
          pass: PASSWORD,
        },
      });
      let info = await transporter.sendMail(
        {
          from: `Remy + Roo <${EMAIL}>`,
          to: email,
          subject: "Welcome to Remy + Roo",
          text:
            "Thank you for joining Remy + Roo. Please watch your email for new products and deals",
          html: `<h2>Thank you for joining Remy + Roo. </h2> </br> <p>Please watch your email for new products and deals.</p>`,
          attachments: [],
        },
        (err, res) => {
          if (err) {
            console.log(err);
          } else {
            res.status(200).send(info);
          }
        }
      );
    } catch (err) {
      res.status(500).send(err);
    }
  },
};
