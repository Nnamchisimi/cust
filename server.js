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

// Get responses by branch
app.get('/api/responses/:branch', (req, res) => {
  const { branch } = req.params;
  db.all('SELECT * FROM survey_responses WHERE branch = ? ORDER BY createdAt DESC', [branch], (err, rows) => {
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

// Export all responses as JSON
app.get('/api/export', (req, res) => {
  db.all('SELECT * FROM survey_responses ORDER BY createdAt DESC', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', 'attachment; filename=survey_responses.json');
    res.json(rows);
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
