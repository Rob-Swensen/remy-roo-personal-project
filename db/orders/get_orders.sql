select * from products
join cart_products_join on cart_products_join.product_id = products.product_id
join cart on cart.cart_id = cart_products_join.cart_id
where cart.customer_id = $1
and paid = true;