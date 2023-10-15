-- Create table to store customer information
CREATE TABLE IF NOT EXISTS customer (
    id VARCHAR(255) NOT NULL PRIMARY KEY,
    tenant_id VARCHAR(255) NOT NULL,
    first_name VARCHAR(55),
    last_name VARCHAR(55),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(15),
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    password VARCHAR(50) NOT NULL,
    verified BOOLEAN DEFAULT false,
    username VARCHAR(30),
    confirmation_sent_at DATE,
    profile_image_url VARCHAR(255),
    address VARCHAR(255),
    email_confirmed_at DATE,
    banned_until DATE
);

-- Create table IF NOT EXISTS to store store information
CREATE TABLE IF NOT EXISTS store (
    id VARCHAR(255) NOT NULL PRIMARY KEY,
    tenant_id VARCHAR(255) NOT NULL,
    name VARCHAR(75) NOT NULL,
    address VARCHAR(255),
    image_url VARCHAR(255),
    images_store JSON,
    city VARCHAR(50),
    state VARCHAR(50),
    postal_code VARCHAR(10),
    phone VARCHAR(15)
);

-- Create table IF NOT EXISTS to store product information
CREATE TABLE IF NOT EXISTS product (
    id VARCHAR(255) NOT NULL PRIMARY KEY,
    tenant_id VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    image_url VARCHAR(255),
    images_product JSON,
    price DECIMAL(10, 2) NOT NULL,
    tags JSON,
    stock INT NOT NULL
);

-- Create table to store sales information
CREATE TABLE IF NOT EXISTS sale (
    id VARCHAR(255) NOT NULL PRIMARY KEY,
    tenant_id VARCHAR(255) NOT NULL,
    customer_id VARCHAR(255) NOT NULL,
    store_id VARCHAR(255) NOT NULL,
    sale_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customer(id),
    FOREIGN KEY (store_id) REFERENCES store(id)
);

-- Create table to store sale details
CREATE TABLE IF NOT EXISTS sale_details (
    id VARCHAR(255) PRIMARY KEY,
    tenant_id VARCHAR(255) NOT NULL,
    sale_id VARCHAR(255) NOT NULL,
    product_id VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (sale_id) REFERENCES sale(id),
    FOREIGN KEY (product_id) REFERENCES product(id)
);

CREATE TABLE IF NOT EXISTS customer_roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id VARCHAR(255) NOT NULL,
    customer_id VARCHAR(255) NOT NULL,
    store_id VARCHAR(255) NOT NULL,
    role ENUM('god', 'admin', 'owner', 'customer', 'store-staff') NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customer(id),
    FOREIGN KEY (store_id) REFERENCES store(id)
);