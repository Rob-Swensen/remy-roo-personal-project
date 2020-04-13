CREATE TABLE customer (
    customer_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(200) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    is_admin BOOLEAN
);

CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    image VARCHAR(250) NOT NULL,
    description TEXT,
    price DECIMAL NOT NULL
);

CREATE TABLE cart (
    cart_id SERIAL PRIMARY KEY,
    customer_id INT REFERENCES customer(customer_id)
);

CREATE TABLE cart_products_join (
    cart_id INT REFERENCES cart(cart_id),
    product_id INT REFERENCES products(product_id),
    qty INT
);

CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    customer_id INT REFERENCES customer(customer_id)
);

CREATE TABLE order_products_join (
    order_id INT REFERENCES orders(order_id),
    product_id INT REFERENCES products(product_id),
    qty INT
);

CREATE TABLE review (
    review_id SERIAL PRIMARY KEY,
    product_id INT REFERENCES products(product_id),
    content VARCHAR(500) NOT NULL
);