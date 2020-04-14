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
        console.log(req.params)

        db.products.get_product(product_id)
        .then(product => res.status(200).send(product))
        .catch(err => res.status(500).send(err))
    }
}