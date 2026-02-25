CREATE DATABASE carebridge_db;
USE carebridge_db;


SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

-- --------------------------------------------------------

--
-- Table structure for table `companies`
--

CREATE TABLE companies (
    uuid CHAR(36) PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    logo VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


-- Sample Companies/Services
INSERT INTO companies (uuid, name, description, logo, created_at, updated_at) VALUES (
('5b33420e-e6c8-4edc-9234-d37b8267ec37', 'NMB', 'The number one banking system in the country. Tap in to file a complaint/suggestion if you use this system', 'uploads/services/c6f85b66-0958-47e9-a961-675ddb81a86c.jpg', '2026-02-25 12:59:52', '2026-02-25 12:59:52'),
('c4b0ed1f-3ded-4fbb-9587-1a1adb9a2db1', 'Airtel', 'One of the best internet service providers in the country. Tap in to file your complaint/suggestion if you use this service', 'uploads/services/e8b44b47-0fad-4bc1-a12d-bbb3a920e880.png', '2026-02-25 10:07:46', '2026-02-25 10:07:46')
)

-- ----------------------------------------------------------------------------------


-- Table structure for table `complaints`

CREATE TABLE complaints (
    uuid CHAR(36) PRIMARY KEY,
    category ENUM('complaint', 'suggestion') NOT NULL,
    company_uuid CHAR(36) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(150) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    status ENUM('in_progress', 'solved') DEFAULT 'in_progress',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_company
        FOREIGN KEY (company_uuid)
        REFERENCES companies(uuid)
        ON DELETE CASCADE
);

-- -------------------------------------------------------------------------

-- Sample Complaints
INSERT INTO complaints (uuid, category, company_uuid, phone, email, title, description, status, created_at, updated_at) VALUES 
('a356f30a-67a1-4d51-acaa-da7408925832', 'complaint', 'c4b0ed1f-3ded-4fbb-9587-1a1adb9a2db1', '0758678762', 'given@gmail.com', 'Low Internet Speed', 'I have been experiencing a huge drop of your internet speed over the last few days', 'in_progress', '2026-02-25 14:53:26', '2026-02-25 14:53:26')
('78c73985-8f7e-43cb-a563-aeb869171bfc', 'complaint', '5b33420e-e6c8-4edc-9234-d37b8267ec37', '0758678762', 'givengabriel2003@gmail.com', 'Delayed Feedback', 'Everytime I make a transaction the feedback messages delay up to 24hrs sometimes', 'in_progress', '2026-02-25 14:10:05', '2026-02-25 14:10:05')



-- Table structure for table `users`

CREATE TABLE users (
    uuid CHAR(36) PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'super_admin') DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


