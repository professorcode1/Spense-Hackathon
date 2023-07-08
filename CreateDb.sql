\c postgres;
DROP DATABASE IF EXISTS spensehackdb;
CREATE DATABASE spensehackdb;
\c spensehackdb 

set timezone='Asia/Kolkata';

--code for db
CREATE TABLE usertype(
    id INT NOT NULL UNIQUE ,
    usertype VARCHAR(11)
);
INSERT INTO usertype VALUES 
(0, 'Super Admin'), (1, 'Vendor'), (2, 'Shopper');

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    email VARCHAR(200) NOT NULL UNIQUE,
    first_name VARCHAR(200) NOT NULL,
    last_name VARCHAR(200) NOT NULL,
    password  VARCHAR(5000) NOT NULL,
    user_type INT NOT NULL DEFAULT 2,
    coins INT NOT NULL DEFAULT 0,
    FOREIGN KEY (user_type) REFERENCES  UserType(id)
);
CREATE INDEX "IDX_email_users" ON "users" ("email");

CREATE TABLE user_addresses(
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    address_line_1 VARCHAR(200) NOT NULL,
    address_line_2 VARCHAR(200),
    address_line_3 VARCHAR(200),
    zipcode VARCHAR(32) NOT NULL,
    city VARCHAR(200) NOT NULL,
    country VARCHAR(200) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE brand(
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL UNIQUE
);

CREATE TABLE category(
    id SERIAL PRIMARY KEY,
    category VARCHAR(200) NOT NULL,
    subcategory VARCHAR(200) NOT NULL,
    subsubcategory VARCHAR(200) NOT NULL,
    compulsory_metadata_schema json NOT NULL
);

CREATE TABLE product(
    id SERIAL PRIMARY KEY,
    name VARCHAR(2000) NOT NULL,
    description VARCHAR(5000)[] NOT NULL,
    category_id INT NOT NULL,
    brand_id INT NOT NULL,
    price INT NOT NULL,
    margin INT NOT NULL, 
    vendor_id INT NOT NULL,
    metadata json NOT NULL,
    FOREIGN KEY (category_id) REFERENCES Category(id),
    FOREIGN KEY (brand_id) REFERENCES Brand(id),
    FOREIGN KEY (vendor_id) REFERENCES Users(id)
);


CREATE TABLE product_images(
    product_id INT NOT NULL,
    location_as_url VARCHAR(200) NOT NULL,
    PRIMARY KEY (product_id, location_as_url),
    FOREIGN KEY (product_id) REFERENCES Product(id)
);

CREATE TABLE inventory(
    product_id INT NOT NULL,
    vendor_id INT NOT NULL,
    count INT NOT NULL,
    PRIMARY KEY(product_id, vendor_id),
    FOREIGN KEY (product_id) REFERENCES Product(id),
    FOREIGN KEY (vendor_id) REFERENCES Users(id)
);

CREATE TABLE order_status(
    id INT NOT NULL UNIQUE,
    order_status VARCHAR(11)
);
INSERT INTO order_status VALUES 
(0, 'In Progress'), (1, 'Delivered');

CREATE TABLE orders(
    user_id INT NOT NULL, 
    address_id INT NOT NULL,
    product_id INT NOT NULL,
    order_time timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    count INT NOT NULL, 
    order_status_id INT NOT NULL,
    PRIMARY KEY (user_id, address_id, product_id, order_time),
    FOREIGN KEY (order_status_id) REFERENCES order_status(id)
);

CREATE TABLE discount(
    id SERIAL PRIMARY KEY,
    discount_offer VARCHAR(200),
    discount_value INT NOT NULL
);

CREATE TABLE product_discount_bridge(
    product_id INT NOT NULL,
    discount_id INT NOT NULL,
    PRIMARY KEY (product_id, discount_id),    
    FOREIGN KEY (product_id) REFERENCES Product(id),
    FOREIGN KEY (discount_id) REFERENCES Discount(id)
);

CREATE TABLE review(
    product_id INT NOT NULL,
    vendor_id INT NOT NULL,
    user_id INT NOT NULL,
    rating CHAR(1) NOT NULL,
    title VARCHAR(200) NOT NULL,
    description VARCHAR(5000) NOT NULL,
    FOREIGN KEY (product_id) REFERENCES Product(id),
    FOREIGN KEY (vendor_id) REFERENCES Users(id),
    FOREIGN KEY (user_id) REFERENCES Users(id)
);
CREATE INDEX product_index_on_review ON Review(
    product_id
);
CREATE INDEX vendor_index_on_review ON Review(
    vendor_id
);
CREATE INDEX user_index_on_review ON Review(
    user_id
);

CREATE TABLE cart(
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    count INT NOT NULL,
    PRIMARY KEY (user_id, product_id),
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (product_id) REFERENCES Product(id)
);
--web telemetry tables--


CREATE TABLE product_on_screen(
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    time_in_seconds SMALLINT NOT NULL,
    enter_time timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(user_id, product_id, enter_time),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES product(id)
);

CREATE TABLE product_web_page_open(LIKE product_on_screen);

