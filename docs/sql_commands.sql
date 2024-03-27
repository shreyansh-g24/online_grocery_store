-- CREATE
  CREATE TABLE addresses (
    id UUID NOT NULL,
    customer_id UUID NOT NULL,
    label CHAR(255) NOT NULL,
    full_address TEXT NOT NULL,
    contact CHAR(255),
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    PRIMARY KEY (id)
  );

  CREATE INDEX index_addresses_on_customer_id ON addresses (customer_id);

  CREATE TABLE customers (
    id UUID NOT NULL,
    email CHAR(255) NOT NULL,
    name CHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    encrypted_password CHAR(255) DEFAULT '' NOT NULL,
    jti CHAR(255) NOT NULL,
    PRIMARY KEY (id)
  );

  CREATE UNIQUE INDEX index_customers_on_email on customers (email);
  CREATE UNIQUE INDEX index_customers_on_jti on customers (jti);


  CREATE TABLE groceries (
    id UUID NOT NULL,
    name CHAR(255) NOT NULL,
    price_per_unit INT DEFAULT 0 NOT NULL,
    unit CHAR(255) DEFAULT 'unit',
    is_out_of_stock BOOLEAN DEFAULT false,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    PRIMARY KEY (id)
  );


  CREATE TABLE groceries_orders (
    id UUID NOT NULL,
    quantity INT DEFAULT 0 NOT NULL,
    order_id UUID NOT NULL,
    grocery_id UUID NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    PRIMARY KEY (id)
  );

  CREATE INDEX index_groceries_orders_on_grocery_id ON groceries_orders (grocery_id);
  CREATE INDEX index_groceries_orders_on_order_id ON groceries_orders (order_id);


  CREATE TABLE orders (
    id UUID NOT NULL,
    address_id UUID,
    customer_id UUID NOT NULL,
    status CHAR(255) DEFAULT 'in_cart' NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    PRIMARY KEY (id)
  );

  CREATE INDEX index_orders_on_address_id ON orders (address_id);
  CREATE INDEX index_orders_on_customer_id ON orders (customer_id);

-- SELECT

SELECT * FROM addresses;
SELECT * FROM customers;
SELECT * FROM groceries;
SELECT * FROM groceries_orders;
SELECT * FROM orders;

-- INSERT

INSERT INTO addresses (
  id,
  customer_id,
  label,
  full_address,
  contact,
  created_at,
  updated_at
) VALUES (
  '55e33171-66b4-4e10-8fda-6320e40f0571',
  '55e33171-66b4-4e10-8fda-6320e40f0572',
  'Home',
  '123 Delhi 09',
  '9876543210',
  NOW(),
  NOW()
);

INSERT INTO customers (
  id,
  email,
  name,
  created_at,
  updated_at,
  encrypted_password,
  jti
) VALUES (
  '55e33171-66b4-4e10-8fda-6320e40f0571',
  'sam@example.com',
  'Sam Smith',
  NOW(),
  NOW(),
  '55e33171-66b4-4e10-8fda-6320e40f0574',
  '55e33171-66b4-4e10-8fda-6320e40f0576'
);

INSERT INTO groceries (
  id,
  name,
  price_per_unit,
  unit,
  is_out_of_stock,
  created_at,
  updated_at
) VALUES (
  '55e33171-66b4-4e10-8fda-6320e40f0571',
  'Apples',
  50,
  'kg',
  false,
  NOW(),
  NOW()
);

INSERT INTO groceries_orders (
  id,
  quantity,
  order_id,
  grocery_id,
  created_at,
  updated_at
) VALUES (
  '55e33171-66b4-4e10-8fda-6320e40f0571',
  5,
  '55e33171-66b4-4e10-8fda-6320e40f0576',
  '55e33171-66b4-4e10-8fda-6320e40f0577',
  NOW(),
  NOW()
);

INSERT INTO orders (
  id,
  address_id,
  customer_id,
  status,
  created_at,
  updated_at
) VALUES (
  '55e33171-66b4-4e10-8fda-6320e40f0571',
  '55e33171-66b4-4e10-8fda-6320e40f0572',
  '55e33171-66b4-4e10-8fda-6320e40f0573',
  'in_cart',
  NOW(),
  NOW()
);

-- UPDATE

UPDATE addresses SET updated_at = NOW() WHERE id = '55e33171-66b4-4e10-8fda-6320e40f0571';
UPDATE customers SET updated_at = NOW() WHERE id = '55e33171-66b4-4e10-8fda-6320e40f0571';
UPDATE groceries SET updated_at = NOW() WHERE id = '55e33171-66b4-4e10-8fda-6320e40f0571';
UPDATE groceries_orders SET updated_at = NOW() WHERE id = '55e33171-66b4-4e10-8fda-6320e40f0571';
UPDATE orders SET updated_at = NOW() WHERE id = '55e33171-66b4-4e10-8fda-6320e40f0571';

-- DELETE

DELETE FROM addresses WHERE id = '55e33171-66b4-4e10-8fda-6320e40f0571';
DELETE FROM customers WHERE id = '55e33171-66b4-4e10-8fda-6320e40f0571';
DELETE FROM groceries WHERE id = '55e33171-66b4-4e10-8fda-6320e40f0571';
DELETE FROM groceries_orders WHERE id = '55e33171-66b4-4e10-8fda-6320e40f0571';
DELETE FROM orders WHERE id = '55e33171-66b4-4e10-8fda-6320e40f0571';
