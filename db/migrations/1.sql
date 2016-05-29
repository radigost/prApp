CREATE TABLE blog
(
    id INTEGER,
    title TEXT,
    img TEXT,
    short_text TEXT,
    text TEXT,
    "createdAt" DATE,
    "updatedAt" DATE
);
CREATE TABLE callbacks
(
    message TEXT,
    phone TEXT,
    from_method TEXT,
    name TEXT,
    "createdAt" DATE,
    id INTEGER,
    "updatedAt" TIMESTAMP WITH TIME ZONE
);
CREATE TABLE carts
(
    id INTEGER,
    "createdAt" DATE,
    "updatedAt" DATE,
    amount INTEGER,
    session_id TEXT,
    product_id INTEGER
);
CREATE TABLE orders
(
    customername TEXT,
    customerphone TEXT,
    customeremail TEXT,
    "needDelivery" BOOLEAN,
    customeradress TEXT,
    delivered BOOLEAN,
    "createdAt" DATE,
    id INTEGER DEFAULT nextval('orders_id_seq'::regclass) NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE PRIMARY KEY,
    summ INTEGER DEFAULT 0 NOT NULL
);
CREATE TABLE product_rel_tags
(
    id INTEGER PRIMARY KEY NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE,
    "updatedAt" TIMESTAMP WITH TIME ZONE,
    product_id INTEGER,
    tag_id INTEGER
);
CREATE TABLE products
(
    popular BOOLEAN,
    description TEXT,
    gros_description TEXT,
    price INTEGER,
    img TEXT,
    title TEXT,
    id INTEGER PRIMARY KEY NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE,
    "updatedAt" TIMESTAMP WITH TIME ZONE
);
CREATE TABLE products_rel_order
(
    id INTEGER PRIMARY KEY NOT NULL,
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE,
    "updatedAt" TIMESTAMP WITH TIME ZONE,
    amount INTEGER DEFAULT 1 NOT NULL
);
CREATE TABLE sails_session_store
(
    data JSON,
    "createdAt" TIMESTAMP WITH TIME ZONE,
    "updatedAt" TIMESTAMP WITH TIME ZONE,
    sid TEXT PRIMARY KEY NOT NULL
);
CREATE TABLE tags
(
    name TEXT,
    normalname TEXT,
    showinmagaz BOOLEAN,
    id INTEGER PRIMARY KEY NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE,
    "updatedAt" TIMESTAMP WITH TIME ZONE
);
CREATE TABLE users
(
    name TEXT,
    id INTEGER PRIMARY KEY NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE,
    "updatedAt" TIMESTAMP WITH TIME ZONE
);
ALTER TABLE products_rel_order ADD FOREIGN KEY (order_id) REFERENCES ;
ALTER TABLE products_rel_order ADD FOREIGN KEY (product_id) REFERENCES products (id);
CREATE UNIQUE INDEX products_rel_order_id_uindex ON products_rel_order (id);