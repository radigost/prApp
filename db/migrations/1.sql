CREATE TABLE orders
(
    customername TEXT,
    customerphone TEXT,
    customeremail TEXT,
    "needDelivery" BOOLEAN,
    customeradress TEXT,
    delivered BOOLEAN,
    products JSON,
    id INTEGER PRIMARY KEY NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE,
    "updatedAt" TIMESTAMP WITH TIME ZONE,
    test INTEGER
);