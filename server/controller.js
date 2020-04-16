module.exports = {
    getProducts: (req, res) => {
        const db = req.app.get('db');

        db.products.get_products()
        .then(products => res.status(200).send(products))
        .catch(err => res.status(500).send(err));
    },
    getProduct: (req, res) => {
        const db = req.app.get('db');
        const {product_id} = req.params;

        db.products.get_product(product_id)
        .then(product => res.status(200).send(product))
        .catch(err => res.status(500).send(err))
    },
    addToCart: async (req, res) => {
        const db = req.app.get('db');
        const {cart_id} = req.params;
        const {product_id} = req.body;

        let cartItem = await db.cart.check_cart(cart_id, product_id)
        if(cartItem[0]){
            return res.status(406).send('Item already in cart')
        }

        db.cart.add_to_cart(cart_id, product_id)
        .then(cart => res.status(200).send(cart))
        .catch(err => res.status(500).send(err))
    },
    getCart: (req, res) => {
        const db = req.app.get('db');
        const {cart_id} = req.params;

        db.cart.get_cart(cart_id)
        .then(cart => res.status(200).send(cart))
        .catch(err => res.status(500).send(err))
    },
    deleteCartItem: (req, res) => {
        const db = req.app.get('db');
        const {cart_id, product_id} = req.params;
        console.log(req.params)

        db.cart.delete_cart_item(cart_id, product_id)
        .then(cart => res.status(200).send(cart))
        .catch(err => res.status(500).send(err))
    }
}