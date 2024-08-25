import React, { useState } from 'react';
import axios from 'axios';
import './App.css';  // Import the CSS file for styling

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [filter, setFilter] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const parsedInput = JSON.parse(jsonInput);
      if (!parsedInput.data) throw new Error('Invalid JSON format');
      
      const res = await axios.post('https://21bbs0166backend-efgnz0fkq-bharath0616s-projects.vercel.app/bfhl', parsedInput); // Update with your deployed backend URL
      setResponse(res.data);
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilter(
      filter.includes(value) ? filter.filter((item) => item !== value) : [...filter, value]
    );
  };

  const renderResponse = () => {
    if (!response) return null;

    const { numbers, alphabets, highest_lowercase_alphabet } = response;
    const filteredResponse = [];

    if (filter.includes('Numbers') && numbers.length) {
      filteredResponse.push(`Numbers: ${numbers.join(',')}`);
    }
    if (filter.includes('Alphabets') && alphabets.length) {
      filteredResponse.push(`Alphabets: ${alphabets.join(',')}`);
    }
    if (filter.includes('Highest lowercase alphabet') && highest_lowercase_alphabet.length) {
      filteredResponse.push(`Highest lowercase alphabet: ${highest_lowercase_alphabet.join(',')}`);
    }

    return (
      <div className="filtered-response">
        <h3>Filtered Response</h3>
        {filteredResponse.map((line, index) => (
          <div key={index}>{line}</div>
        ))}
      </div>
    );
  };

  return (
    <div className='main'>
    <div className="app-container">
      <h1>{response?.roll_number || 'BFHL Challenge'}</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="json-input">API Input</label>
          <textarea
            id="json-input"
            rows="4"
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-btn">Submit</button>
      </form>
      {error && <p className="error-message">{error}</p>}

      {response && (
        <div className="filter-section">
          <label htmlFor="multi-filter">Multi Filter</label>
          <select id="multi-filter" multiple onChange={handleFilterChange}>
            <option value="Numbers">Numbers</option>
            <option value="Alphabets">Alphabets</option>
            <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
          </select>
        </div>
      )}

      {renderResponse()}
    </div>
    </div>
  );
}

export default App;
