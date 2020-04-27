UPDATE cart
SET paid = true,
date = $2
WHERE cart_id = $1;