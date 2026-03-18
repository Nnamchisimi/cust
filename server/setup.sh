#!/bin/bash

# Database Setup Script for Customer Satisfaction Survey
# This script sets up the SQLite database for the survey application

echo "Setting up database for Customer Satisfaction Survey..."

# Create server directory if it doesn't exist
mkdir -p server

# Create package.json for server
cat > server/package.json << 'EOF'
{
  "name": "survey-server",
  "version": "1.0.0",
  "description": "Backend server for customer satisfaction survey",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "node server.js"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^4.18.2",
    "sqlite3": "^5.1.6"
  }
}
EOF

# Create server.js
cat > server/server.js << 'EOF'
// Simple Node.js server with SQLite database
// Run with: node server.js

const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize SQLite database
const db = new sqlite3.Database('./survey.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database');
    createTables();
  }
});

// Create tables
function createTables() {
  db.run(`
    CREATE TABLE IF NOT EXISTS survey_responses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      firstName TEXT NOT NULL,
      lastName TEXT NOT NULL,
      phone TEXT,
      licensePlate TEXT NOT NULL,
      branch TEXT NOT NULL,
      department TEXT NOT NULL,
      overallSatisfaction INTEGER,
      maintenance INTEGER,
      bodywork INTEGER,
      appointment INTEGER,
      advisor INTEGER,
      workshopRepair INTEGER,
      carWash INTEGER,
      comments TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) {
      console.error('Error creating table:', err.message);
    } else {
      console.log('Survey responses table created');
    }
  });
}

// API Routes

// Get all responses
app.get('/api/responses', (req, res) => {
  db.all('SELECT * FROM survey_responses ORDER BY createdAt DESC', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
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

  db.run(sql, params, function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID, message: 'Response saved successfully' });
  });
});

// Delete all responses
app.delete('/api/responses', (req, res) => {
  db.run('DELETE FROM survey_responses', function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'All responses deleted', changes: this.changes });
  });
});

// Get statistics
app.get('/api/stats', (req, res) => {
  const sql = `
    SELECT 
      branch,
      COUNT(*) as count,
      AVG(overallSatisfaction) as avgSatisfaction
    FROM survey_responses
    GROUP BY branch
  `;
  
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
EOF

echo "Server files created successfully!"
echo ""
echo "To run the server:"
echo "1. cd server"
echo "2. npm install"
echo "3. npm start"
echo ""
echo "The database (survey.db) will be created automatically when the server starts."
