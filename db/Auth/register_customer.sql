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
);