-- MySQL Database Setup for Customer Satisfaction Survey
-- Run this in MySQL Workbench

-- Create database
CREATE DATABASE IF NOT EXISTS customer_survey;
USE customer_survey;

-- Create survey_responses table
CREATE TABLE IF NOT EXISTS survey_responses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date VARCHAR(255) NOT NULL,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    licensePlate VARCHAR(50) NOT NULL,
    branch VARCHAR(100) NOT NULL,
    department VARCHAR(255) NOT NULL,
    overallSatisfaction INT,
    maintenance INT,
    bodywork INT,
    appointment INT,
    advisor INT,
    workshopRepair INT,
    carWash INT,
    comments TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Verify table was created
DESCRIBE survey_responses;

-- Create users table for authentication
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'user',
    verification_code VARCHAR(10),
    verified BOOLEAN NOT NULL DEFAULT FALSE,
    verification_expires DATETIME,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert default admin user (already verified for existing admin)
-- Note: In production, use bcrypt or similar for password hashing
INSERT INTO users (username, email, password, role, verified) VALUES 
('contactflowair@gmail.com', 'contactflowair@gmail.com', 'ab', 'admin', TRUE)
ON DUPLICATE KEY UPDATE username=username;

-- Optional: Create index for faster queries
CREATE INDEX idx_branch ON survey_responses(branch);
CREATE INDEX idx_createdAt ON survey_responses(createdAt);
