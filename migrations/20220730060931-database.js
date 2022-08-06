'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.runSql(`
  
  CREATE TABLE users(
    user_id INT GENERATED ALWAYS AS IDENTITY,
    firstname VARCHAR(60),
    lastname VARCHAR(60),
    password VARCHAR(200),
    PRIMARY KEY(user_id)
  );
  CREATE TABLE products(
    product_id INT GENERATED ALWAYS AS IDENTITY,
    product_name VARCHAR(200) NOT NULL,
    product_price MONEY NOT NULL,
    product_category VARCHAR(50) NULL,
    PRIMARY KEY(product_id)
     
  );
  CREATE TABLE orders(
    order_id INT GENERATED ALWAYS AS IDENTITY NOT NULL,
    order_status BOOLEAN NOT NULL,
    user_id INT NOT NULL,
    PRIMARY KEY(order_id),

    CONSTRAINT fk_user_id
    FOREIGN KEY(user_id)
    REFERENCES users(user_id)
  );

  CREATE TABLE order_products(
    id INT GENERATED ALWAYS AS IDENTITY NOT NULL,
    order_id INT,
    product_id INT,
    quantity INT,
    

    CONSTRAINT fk_product_id
    FOREIGN KEY(product_id)
    REFERENCES products(product_id),
    CONSTRAINT fk_order_id
    FOREIGN KEY(order_id)
    REFERENCES orders(order_id)
  );

  INSERT INTO users(firstname, lastname, password) VALUES('Admin', 'Admin', '$2b$10$h7kEXLpiTB6kwsQb.ZfjNO4TAdFhqwdTNzfrN5RvleuTCApYGJRyq'), ('Kamil','Durhan','$2b$10$h7kEXLpiTB6kwsQb.ZfjNO4TAdFhqwdTNzfrN5RvleuTCApYGJRyq') ;
  INSERT INTO products(product_name, product_price, product_category) VALUES('Belstaff', '9,99', 'T-shirt') , ('Glasses Ray-Ben','149,99', 'Sunglasses'), ('Laptop', '500,00', 'Computer'),
  ('High-Quality Chair', '500,00', 'Furniture'), ('Asus Monitor', '129,99', 'Computer'), ('Mouse-Pad', '2,99', 'Computer'), ('Mac-Book Pro', '1799,99', '');
  INSERT INTO products(product_name, product_price) VALUES('Mac-Book', '1000');
  INSERT INTO orders(user_id, order_status) VALUES ('2', FALSE), ('2', FALSE);
  INSERT INTO order_products(order_id, product_id, quantity) VALUES (1,3, 40), (1,2,50);
  `);
};

exports.down = function(db) {
  return db.runSql(`
  DROP TABLE IF EXISTS order_products;
  DROP TABLE IF EXISTS orders;
  DROP TABLE IF EXISTS users;
  DROP TABLE IF EXISTS products;
  `);
};

exports._meta = {
  "version": 1
};
