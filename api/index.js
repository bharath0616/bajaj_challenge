
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.options('*', cors({
    origin: 'https://21bbs0166frontend-iwa1rexaw-bharath0616s-projects.vercel.app',
    methods: 'GET,POST',
    credentials: true
}));

app.get('/', (req, res) => {
    res.send('Welcome to the BFHL API');
});
app.get('/bfhl', (req, res) => {
    res.json({ operation_code: 1 });
  });
// POST /bfhl
app.post('/bfhl', (req, res) => {
    const { data } = req.body;
    const user_id = "21BBS0166";
    const email = "mudduluru.bharath2021@vitstudent.ac.in";
    const roll_number = "21BBS0166";
  
    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item));
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


