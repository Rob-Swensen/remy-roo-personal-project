SELECT * FROM customer
JOIN cart on customer.customer_id = cart.customer_id
WHERE customer.email = $1;