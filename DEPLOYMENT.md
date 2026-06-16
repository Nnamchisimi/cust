# cPanel Deployment Guide

## Overview
This guide explains how to deploy the Customer Satisfaction Survey application to cPanel hosting.

## Prerequisites
- cPanel hosting account with Node.js support
- MySQL database already created
- Database credentials (host, username, password, database name)

## Deployment Steps

### 1. Frontend Deployment (React App)

The frontend is a static React application that can be deployed to the `public_html` folder.

**Build the React app (already done):**
```bash
npm run build
```

**Deploy files to cPanel:**
1. Upload the contents of the `build` folder to `public_html`
2. The `.htaccess` file handles client-side routing

### 2. Backend Deployment (Node.js API)

**Upload backend files:**
1. Upload the `survey-backend` folder to `/survey-backend` (as configured in cPanel)
2. Install dependencies:
   ```bash
   cd /home/yourusername/survey-backend
   npm install --production
   ```

**Configure environment variables in cPanel:**
Set these in your cPanel "Environment Variables" section or create a `.env` file:
```
PORT=30090
JWT_SECRET=your-secure-secret-key-here
NODE_ENV=production
DB_HOST=localhost
DB_USER=your_db_username
DB_PASS=your_db_password
DB_NAME=your_db_name
DB_PORT=3306
```

**cPanel Application Configuration:**
- **Application Name**: Survey Backend
- **Deployment Domain**: anket.kombosotomotiv.com
- **Base Application URL**: /
- **Application Path**: /survey-backend
- **Deployment Environment**: Production

### 3. Database Setup

**Import the database schema:**
```sql
-- Run this in phpMyAdmin or MySQL Workbench
CREATE DATABASE IF NOT EXISTS customer_survey;
USE customer_survey;

-- Create tables
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

-- Default admin user
INSERT INTO users (username, email, password, role, verified) 
VALUES ('admin', 'admin@yoursite.com', 'yourpassword', 'admin', TRUE);
```

### 4. Configuration

**Frontend API calls:**
The React app uses relative URLs (`/api/...`), so it will work with the backend at `anket.kombosotomotiv.com/api/...`.

### 5. File Structure

```
public_html/                    # Frontend (React build)
├── index.html
├── static/
├── asset-manifest.json
├── manifest.json
└── .htaccess

survey-backend/                # Backend (Node.js) - at /survey-backend
├── server.js
├── package.json
├── node_modules/
└── .env
```

## Important Notes

1. **MySQL Connection**: Ensure your database host is accessible. For cPanel, it's usually `localhost`.

2. **Port Configuration**: The backend runs on port 30090 internally. The frontend accesses it via relative URLs.

3. **SSL Certificate**: cPanel typically provides free SSL. Ensure your site uses HTTPS.

4. **File Permissions**: 
   - `survey-backend/server.js`: 644
   - `survey-backend/node_modules/`: 755

## Troubleshooting

1. **Database Connection Failed**: Verify database credentials and ensure the database user has local access.

2. **API Not Responding**: Check if the Node.js application is running in cPanel and the port is correct.

3. **React App Blank Page**: Check the browser console for errors. Ensure `.htaccess` is properly configured.

4. **Login Issues**: Ensure cookies are enabled and the domain matches between frontend and backend.