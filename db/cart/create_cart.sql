INSERT INTO cart (
    customer_id
) VALUES (
    $1
)RETURNING cart_id;