const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

// MySQL Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dictionary_db'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database.');
});

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

// API route to fetch word meaning
app.get('/dictionary', (req, res) => {
    const word = req.query.word;
    const query = 'SELECT meaning FROM words WHERE word = ?';

    db.query(query, [word], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.json({ meaning: result[0].meaning });
        } else {
            res.json({ error: 'Word not found' });
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
