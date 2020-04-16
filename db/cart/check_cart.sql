SELECT * FROM cart_products_join
WHERE cart_id = $1 AND product_id = $2;