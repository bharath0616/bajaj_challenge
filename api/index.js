const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
app.use(cors());  // Consider restricting this to specific origins in production
app.use(bodyParser.json());
app.use(helmet());  // Adds security headers to the response

app.get('/', (req, res) => {
    res.send('Welcome to the BFHL API');
});

app.get('/bfhl', (req, res) => {
    res.json({ operation_code: 1 });
});

app.post('/bfhl', (req, res) => {
    const { data } = req.body;

    // Validate input
    if (!Array.isArray(data)) {
        return res.status(400).json({
            is_success: false,
            message: "Invalid input: 'data' must be an array."
        });
    }

    const user_id = "21BBS0166";
    const email = "mudduluru.bharath2021@vitstudent.ac.in";
    const roll_number = "21BBS0166";
  
    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item) && typeof item === 'string');
    const lowercaseAlphabets = alphabets.filter(item => item >= 'a' && item <= 'z');
    const highest_lowercase_alphabet = lowercaseAlphabets.length > 0 ? [lowercaseAlphabets.sort().pop()] : [];
  
    res.json({
      is_success: true,
      user_id,
      email,
      roll_number,
      numbers,
      alphabets,
      highest_lowercase_alphabet
    });
});

module.exports = app;
