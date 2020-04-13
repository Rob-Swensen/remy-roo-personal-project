INSERT INTO customer (
    email,
    password,
    first_name,
    last_name,
    is_admin
) VALUES (
    ${email},
    ${password},
    ${first_name},
    ${last_name},
    ${is_admin}
)
RETURNING customer_id, email, first_name, last_name;