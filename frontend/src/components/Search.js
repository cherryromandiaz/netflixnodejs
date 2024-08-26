import React, { useState } from 'react';
import axios from 'axios';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [filters, setFilters] = useState({ genre: '', actor: '', director: '' });

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/search', {
        params: { query, ...filters },
      });
      setResults(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <select
        value={filters.genre}
        onChange={(e) => setFilters({ ...filters, genre: e.target.value })}
      >
        <option value="">All Genres</option>
        <option value="Action">Action</option>
        <option value="Comedy">Comedy</option>
        {/* Add more genres as needed */}
      </select>
      <input
        type="text"
        value={filters.actor}
        onChange={(e) => setFilters({ ...filters, actor: e.target.value })}
        placeholder="Actor"
      />
      <input
        type="text"
        value={filters.director}
        onChange={(e) => setFilters({ ...filters, director: e.target.value })}
        placeholder="Director"
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {results.map((result, index) => (
          <li key={index}>{result.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
