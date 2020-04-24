UPDATE cart_products_join
SET qty = $1
WHERE cart_id = $2
AND product_id = $3;