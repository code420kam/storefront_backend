# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index `'/products/' GET`
- Show `'/products/:id GET`
- Create [token required] `'/products/create' POST (with token)`
- ADDED Create a Order `'products/order' POST( with token)`

#### Users
- Index [token required] `'/user/'   GET`
- Show [token required] `'/user/:id' GET`
- Create N[token required] `'/user/create' POST (with token)`
- ADDED Login `'user/login' POST`

#### Orders
- Current Order by user (args: user id)[token required] `'/order/:id GET (with token)`

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category
``
`TABLE: products (product_id INT GENERATED ALWAYS AS IDENTITY, product_name VARCHAR(200) NOT NULL, product_price MONEY NOT NULL, product_category VARCHAR(50) NULL, PRIMARY KEY(product_id)`
``

#### User
- id
- firstName
- lastName
- password
``
` TABLE: users (user_id INT GENERATED ALWAYS AS IDENTITY, firstname VARCHAR(60), lastname VARCHAR(60), passwort VARCHAR(200), PRIMARY KEY(user_id)`
``


#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)
``
`TABLE: orders (order_id INT GENERATED ALWAYS AS IDENTITY, quantity INT, user_id INT, product_id INT, order_status BOOLEAN NOT NULL, PRIMARY KEY(order_id), CONSTRAINT fk_product_id FOREIGN KEY(product_id) REFERENCES products(product_id), CONSTRAINT fk_user_id FOREIGN KEY(user_id) REFERENCES users(user_id)`
``
