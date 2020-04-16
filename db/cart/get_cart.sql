SELECT * FROM products
JOIN cart_products_join ON products.product_id = cart_products_join.product_id
WHERE cart_id = $1;