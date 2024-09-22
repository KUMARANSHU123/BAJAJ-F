// App.js

import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [isValidJson, setIsValidJson] = useState(true);

  const options = ["Alphabets", "Numbers", "Highest Lowercase Alphabet"];

  // Validate JSON input
  const validateJson = (input) => {
    try {
      JSON.parse(input);
      setIsValidJson(true);
      return true;
    } catch (e) {
      setIsValidJson(false);
      setError("Invalid JSON format");
      return false;
    }
  };

  const handleSubmit = async () => {
    if (!validateJson(jsonInput)) {
      return;
    }

    try {
      const parsedInput = JSON.parse(jsonInput);
      const response = await axios.post("https://your-backend-api.com/bfhl", parsedInput);
      setResponseData(response.data);
      setError("");
    } catch (error) {
      setError("Error fetching data from backend");
    }
  };

  const handleSelectChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedFilters([...selectedFilters, value]);
    } else {
      setSelectedFilters(selectedFilters.filter((filter) => filter !== value));
    }
  };

  const renderFilteredResponse = () => {
    if (!responseData) return null;

    let filteredData = {};

    if (selectedFilters.includes("Alphabets")) {
      filteredData.alphabets = responseData.alphabets;
    }
    if (selectedFilters.includes("Numbers")) {
      filteredData.numbers = responseData.numbers;
    }
    if (selectedFilters.includes("Highest Lowercase Alphabet")) {
      filteredData.highest_lowercase_alphabet = responseData.highest_lowercase_alphabet;
    }

    return (
      <div>
        <h3>Filtered Response:</h3>
        <pre>{JSON.stringify(filteredData, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div>
      <h1>Your Roll Number</h1> {/* Replace with actual roll number */}
      <div>
        <h2>Input JSON:</h2>
        <textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder="Enter JSON here"
        />
        {!isValidJson && <p style={{ color: "red" }}>{error}</p>}
        <button onClick={handleSubmit}>Submit</button>
      </div>

      {responseData && (
        <div>
          <h2>Filter Options:</h2>
          {options.map((option) => (
            <div key={option}>
              <input
                type="checkbox"
                value={option}
                onChange={handleSelectChange}
              />
              <label>{option}</label>
            </div>
          ))}
        </div>
      )}

      {renderFilteredResponse()}
    </div>
  );
};

export default App;
