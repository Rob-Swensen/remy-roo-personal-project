SELECT * FROM products
JOIN cart_products_join ON cart_products_join.product_id = products.product_id
JOIN cart ON cart.cart_id = cart_products_join.cart_id
WHERE cart.customer_id = $1
AND paid = true;