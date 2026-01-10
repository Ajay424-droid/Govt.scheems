-- Enable UUID extension if needed (optional, using SERIAL/INTEGER for simplicity matching original MySQL)

-- 1. ADKINS TABLE
CREATE TABLE IF NOT EXISTS admins (
    admins_id SERIAL PRIMARY KEY,
    admins_email VARCHAR(255) UNIQUE NOT NULL,
    admins_password_hash VARCHAR(255) NOT NULL,
    admins_name VARCHAR(100) NOT NULL,
    failed_attempts INTEGER DEFAULT 0,
    lock_until TIMESTAMP
);

-- 2. USERS TABLE
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. CATEGORIES TABLE
-- In the code, category_id is provided manually. Assuming it's a string (e.g., 'education', 'health').
CREATE TABLE IF NOT EXISTS categories (
    category_id VARCHAR(50) PRIMARY KEY, 
    category_name VARCHAR(100) NOT NULL
);

-- 4. SCHEMES TABLE
CREATE TABLE IF NOT EXISTS schemes (
    scheme_id SERIAL PRIMARY KEY,
    scheme_name VARCHAR(255) NOT NULL,
    category_id VARCHAR(50) REFERENCES categories(category_id) ON DELETE SET NULL,
    launched_by VARCHAR(255),
    launched_date DATE,
    benefits TEXT,
    how_to_apply TEXT,
    documents_required TEXT,
    application_start_date DATE,
    application_end_date DATE,
    application_portal VARCHAR(255),
    status VARCHAR(50) DEFAULT 'Active',
    contact_info TEXT
);

-- 5. ELIGIBILITY TABLE
CREATE TABLE IF NOT EXISTS eligibility (
    eligibility_id SERIAL PRIMARY KEY,
    scheme_id INTEGER REFERENCES schemes(scheme_id) ON DELETE CASCADE,
    age_min INTEGER,
    age_max INTEGER,
    gender VARCHAR(50),
    income_limit DECIMAL(15, 2), -- Changed to DECIMAL for currency
    caste_category VARCHAR(100),
    profession VARCHAR(100),
    education_qualification VARCHAR(255),
    residence_requirement VARCHAR(255)
);
