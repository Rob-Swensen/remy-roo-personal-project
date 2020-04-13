const bcrypt = require("bcryptjs");

module.exports = {
  register: async (req, res) => {
    const { email, password, first_name, last_name } = req.body;
    console.log(req.body)
    const db = req.app.get("db");

    let user = await db.auth.check_email(email);
    if (user[0]) {
      return res.status(400).send("Email already in use");
    }

    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);

    let newUser = await db.auth.register_customer({
        email,
        password: hash,
        first_name, 
        last_name,
        is_admin: false
    });
    req.session.user = newUser[0];
    res.status(200).send(req.session.user);
  },
  login: async (req, res) => {
      const { email, password } = req.body;
      const db = req.app.get('db');

      let user = await db.auth.check_email(email)
      if(!user[0]){
          return res.status(400).send('E-mail does not exist')
      }

      const authenticated = bcrypt.compareSync(password, user[0].password);
      if(!authenticated){
          return res.status(401).send('Password Incorrect')
      }

      delete user[0].password;
      req.session.user = user[0];
      res.status(202).send(req.session.user);
  }
};
