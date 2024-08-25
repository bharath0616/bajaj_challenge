const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// POST /bfhl
app.post('/bfhl', (req, res) => {
    const { data } = req.body;
    if (!Array.isArray(data)) {
        return res.status(400).json({ is_success: false, error: 'Invalid input' });
    }

    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item));
    const lowercaseAlphabets = alphabets.filter(item => item === item.toLowerCase());

    const highestLowercaseAlphabet = lowercaseAlphabets.length
        ? [lowercaseAlphabets.sort().reverse()[0]]
        : [];

    res.json({
        is_success: true,
        user_id: 'john_doe_17091999',
        email: 'john@xyz.com',
        roll_number: 'ABCD123',
        numbers,
        alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet
    });
});

// GET /bfhl
app.get('/bfhl', (req, res) => {
  res.json({ operation_code: 1 });
});

module.exports = app;
