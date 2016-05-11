CREATE TABLE blog
(
    title TEXT,
    img TEXT,
    short_text TEXT,
    text TEXT,
    id INTEGER PRIMARY KEY NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE,
    "updatedAt" TIMESTAMP WITH TIME ZONE
);
CREATE UNIQUE INDEX blog_id_uindex ON blog (id);

CREATE TABLE callbacks
(
    id INTEGER PRIMARY KEY NOT NULL,
    message TEXT,
    phone TEXT,
    from_method TEXT,
    "createdAt" TIMESTAMP WITH TIME ZONE,
    "updatedAt" TIMESTAMP WITH TIME ZONE,
    name TEXT
);
CREATE UNIQUE INDEX callback_id_uindex ON callbacks (id);

CREATE TABLE orders
(
    customername TEXT,
    customerphone TEXT,
    customeremail TEXT,
    "needDelivery" BOOLEAN,
    customeradress TEXT,
    delivered BOOLEAN,
    id INTEGER DEFAULT nextval('orders_id_seq'::regclass) NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE PRIMARY KEY,
    "updatedAt" TIMESTAMP WITH TIME ZONE,
    test TEXT,
    products JSON
);

CREATE TABLE products
(
    id INTEGER PRIMARY KEY NOT NULL,
    popular BOOLEAN DEFAULT false,
    description TEXT,
    gros_description TEXT,
    price DOUBLE PRECISION,
    img TEXT,
    title TEXT,
    tags JSON,
    "createdAt" TIMESTAMP WITH TIME ZONE,
    "updatedAt" TIMESTAMP WITH TIME ZONE
);
CREATE UNIQUE INDEX table_name_id_uindex ON products (id);

CREATE TABLE tags
(
    id INTEGER PRIMARY KEY NOT NULL,
    name TEXT,
    normalname TEXT,
    showinmagaz BOOLEAN DEFAULT false NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE,
    "updatedAt" TIMESTAMP WITH TIME ZONE
);
CREATE UNIQUE INDEX tags_id_uindex ON tags (id);
CREATE UNIQUE INDEX tags_name_uindex ON tags (name);

CREATE TABLE users
(
    id INTEGER PRIMARY KEY NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE,
    "updatedAt" TIMESTAMP WITH TIME ZONE,
    name TEXT
);