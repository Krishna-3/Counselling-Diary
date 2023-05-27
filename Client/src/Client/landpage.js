import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { FaSearch } from "react-icons/fa";
import './landpage.css';

function DataDisplay() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchVisible, setSearchVisible] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://jsonplaceholder.typicode.com/users'); // Replace with your API endpoint
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
    setSearchTerm('');
  };

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="data-display">
      <div className="search-container">
        <div className={`search-icon ${searchVisible ? 'active' : ''}`} onClick={toggleSearch}>
          <i className="fas fa-search"></i>
        </div>
        <input
          type="text"
          className={`search-input ${searchVisible ? 'active' : ''}`}
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="data-columns">
        {filteredData.map((item) => (
          <div className="data-item" key={item.id}>
            <h3>Name: {item.name}</h3>
            <p>Roll Number: {item.id}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DataDisplay;
