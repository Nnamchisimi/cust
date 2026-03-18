// Node.js server with MySQL database
// Run with: node server.js

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 30090;

// JWT Configuration
const JWT_SECRET = process.env.JWT_SECRET || 'serhan-kombos-secret-key-2024';
const JWT_EXPIRES_IN = '24h';

// Email configuration
const emailConfig = {
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: process.env.EMAIL_PORT || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER || 'kombosawb@gmail.com',
    pass: process.env.EMAIL_PASS || 'kyka ypey hfar rjvg'
  }
};

// Create email transporter
const transporter = nodemailer.createTransport(emailConfig);

// Generate verification code
const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Database configuration
const dbConfig = {
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '123456789',
  database: process.env.DB_NAME || 'customer_survey',
  host: process.env.DB_HOST || 'localhost'
};

// Create connection pool
const pool = mysql.createPool({
  ...dbConfig,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Initialize database tables
const initDatabase = async () => {
  // First connect without database to create it
  const initConfig = {
    port: dbConfig.port,
    user: dbConfig.user,
    password: dbConfig.password,
    host: dbConfig.host
  };
  
  const initPool = mysql.createPool(initConfig);
  
  try {
    // Create database if not exists
    await new Promise((resolve, reject) => {
      initPool.query(`CREATE DATABASE IF NOT EXISTS ${dbConfig.database}`, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
    console.log('Database ensured');
    
    // Now use the database
    await new Promise((resolve, reject) => {
      initPool.query(`USE ${dbConfig.database}`, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
    
    // Create survey_responses table
    const createSurveyTable = `
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
      )
    `;
    
    await new Promise((resolve, reject) => {
      initPool.query(createSurveyTable, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
    console.log('survey_responses table ensured');
    
    // Create users table
    const createUsersTable = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL DEFAULT 'user',
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `;
    
    await new Promise((resolve, reject) => {
      initPool.query(createUsersTable, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
    console.log('users table ensured');
    
    // Insert admin user if not exists
    const insertAdmin = `
      INSERT IGNORE INTO users (username, password, role) VALUES 
      ('contactflowair@gmail.com', 'ab', 'admin')
    `;
    
    await new Promise((resolve, reject) => {
      initPool.query(insertAdmin, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
    console.log('Admin user ensured');
    
  } catch (err) {
    console.error('Error initializing database:', err.message);
  } finally {
    await initPool.end();
  }
};

// Initialize on startup
initDatabase().then(() => {
  // Test connection after initialization
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to database:', err.message);
    } else {
      console.log('Connected to MySQL database');
      connection.release();
    }
  });
});

// Middleware
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// API Routes

// Get all responses
app.get('/api/responses', (req, res) => {
  const sql = 'SELECT * FROM survey_responses ORDER BY createdAt DESC';
  pool.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

// Get responses by branch
app.get('/api/responses/:branch', (req, res) => {
  const { branch } = req.params;
  const sql = 'SELECT * FROM survey_responses WHERE branch = ? ORDER BY createdAt DESC';
  pool.query(sql, [branch], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

// Add new response
app.post('/api/responses', (req, res) => {
  const {
    date,
    firstName,
    lastName,
    phone,
    licensePlate,
    branch,
    department,
    overallSatisfaction,
    maintenance,
    bodywork,
    appointment,
    advisor,
    workshopRepair,
    carWash,
    comments
  } = req.body;

  const sql = `
    INSERT INTO survey_responses (
      date, firstName, lastName, phone, licensePlate, branch, department,
      overallSatisfaction, maintenance, bodywork, appointment, advisor,
      workshopRepair, carWash, comments
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const params = [
    date, firstName, lastName, phone, licensePlate, branch, department,
    overallSatisfaction, maintenance, bodywork, appointment, advisor,
    workshopRepair, carWash, comments
  ];

  pool.query(sql, params, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: result.insertId, message: 'Response saved successfully' });
  });
});

// Delete all responses
app.delete('/api/responses', (req, res) => {
  const sql = 'DELETE FROM survey_responses';
  pool.query(sql, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'All responses deleted', affectedRows: result.affectedRows });
  });
});

// Get statistics by branch
app.get('/api/stats', (req, res) => {
  const sql = `
    SELECT 
      branch,
      COUNT(*) as count,
      AVG(overallSatisfaction) as avgSatisfaction
    FROM survey_responses
    GROUP BY branch
  `;
  
  pool.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

// Export all responses as JSON
app.get('/api/export', (req, res) => {
  const sql = 'SELECT * FROM survey_responses ORDER BY createdAt DESC';
  pool.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', 'attachment; filename=survey_responses.json');
    res.json(results);
  });
});

// Login endpoint
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    res.status(400).json({ error: 'Username and password are required' });
    return;
  }
  
  const sql = 'SELECT id, username, email, role, verified FROM users WHERE username = ? AND password = ?';
  pool.query(sql, [username, password], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    if (results.length === 0) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }
    
    const user = results[0];
    
    // Check if user is verified
    if (!user.verified) {
      res.status(401).json({ error: 'Please verify your email before logging in', needsVerification: true });
      return;
    }
    
    if (user.role !== 'admin') {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );
    
    // Set JWT as HTTP-only cookie
    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });
    
    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      token: token // Also return token for clients that need it
    });
  });
});

// Signup endpoint - Send verification code to email
app.post('/api/signup', (req, res) => {
  const { username, email, password } = req.body;
  
  if (!username || !email || !password) {
    res.status(400).json({ error: 'Username, email and password are required' });
    return;
  }
  
  // Check if username or email already exists
  const checkSql = 'SELECT id FROM users WHERE username = ? OR email = ?';
  pool.query(checkSql, [username, email], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    if (results.length > 0) {
      res.status(400).json({ error: 'Username or email already exists' });
      return;
    }
    
    // Generate verification code
    const verificationCode = generateVerificationCode();
    const verificationExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
    
    // Insert user with verification code (not verified yet)
    const insertSql = 'INSERT INTO users (username, email, password, role, verification_code, verification_expires, verified) VALUES (?, ?, ?, ?, ?, ?, FALSE)';
    pool.query(insertSql, [username, email, password, 'admin', verificationCode, verificationExpires], (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      
      // Send verification email
      const mailOptions = {
        from: emailConfig.auth.user,
        to: email,
        subject: 'Email Verification Code',
        text: `Your verification code is: ${verificationCode}\n\nThis code will expire in 15 minutes.`
      };
      
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Email error:', error);
          // Still return success but with warning
          res.json({ 
            message: 'Verification code sent. Please check your email.',
            requiresVerification: true,
            userId: result.insertId
          });
        } else {
          res.json({ 
            message: 'Verification code sent to your email',
            requiresVerification: true,
            userId: result.insertId
          });
        }
      });
    });
  });
});

// Verify email endpoint
app.post('/api/verify-email', (req, res) => {
  const { userId, code } = req.body;
  
  if (!userId || !code) {
    res.status(400).json({ error: 'User ID and verification code are required' });
    return;
  }
  
  const sql = 'SELECT * FROM users WHERE id = ? AND verification_code = ?';
  pool.query(sql, [userId, code], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    if (results.length === 0) {
      res.status(400).json({ error: 'Invalid verification code' });
      return;
    }
    
    const user = results[0];
    
    // Check if code has expired
    if (new Date() > new Date(user.verification_expires)) {
      res.status(400).json({ error: 'Verification code has expired' });
      return;
    }
    
    // Update user to verified
    const updateSql = 'UPDATE users SET verified = TRUE, verification_code = NULL WHERE id = ?';
    pool.query(updateSql, [userId], (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      
      res.json({ 
        message: 'Email verified successfully',
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role
        }
      });
    });
  });
});

// Resend verification code endpoint
app.post('/api/resend-code', (req, res) => {
  const { email } = req.body;
  
  if (!email) {
    res.status(400).json({ error: 'Email is required' });
    return;
  }
  
  const sql = 'SELECT id, email FROM users WHERE email = ? AND verified = FALSE';
  pool.query(sql, [email], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    if (results.length === 0) {
      res.status(400).json({ error: 'No unverified user found with this email' });
      return;
    }
    
    const user = results[0];
    const verificationCode = generateVerificationCode();
    const verificationExpires = new Date(Date.now() + 15 * 60 * 1000);
    
    const updateSql = 'UPDATE users SET verification_code = ?, verification_expires = ? WHERE id = ?';
    pool.query(updateSql, [verificationCode, verificationExpires, user.id], (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      
      const mailOptions = {
        from: emailConfig.auth.user,
        to: email,
        subject: 'Email Verification Code',
        text: `Your verification code is: ${verificationCode}\n\nThis code will expire in 15 minutes.`
      };
      
      transporter.sendMail(mailOptions, (error) => {
        if (error) {
          console.log('Email error:', error);
          res.status(500).json({ error: 'Failed to send verification email' });
        } else {
          res.json({ message: 'Verification code sent to your email' });
        }
      });
    });
  });
});

// Verify token endpoint
app.get('/api/verify', (req, res) => {
  // Check for token in cookie first, then in authorization header
  const token = req.cookies.auth_token || req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    res.status(401).json({ error: 'No token provided', authenticated: false });
    return;
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Verify user still exists and is admin
    const sql = 'SELECT id, username, email, role FROM users WHERE id = ? AND role = ?';
    pool.query(sql, [decoded.id, 'admin'], (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      
      if (results.length === 0) {
        res.status(401).json({ error: 'User not found or unauthorized', authenticated: false });
        return;
      }
      
      const user = results[0];
      res.json({
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        authenticated: true
      });
    });
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired token', authenticated: false });
  }
});

// Logout endpoint
app.post('/api/logout', (req, res) => {
  res.clearCookie('auth_token');
  res.json({ message: 'Logged out successfully' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
