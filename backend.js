// server.js

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Helper function to separate numbers and alphabets
const processInputData = (data) => {
  const numbers = [];
  const alphabets = [];
  let highestLowerCaseAlphabet = "";

  data.forEach((item) => {
    if (!isNaN(item)) {
      numbers.push(item);
    } else if (typeof item === "string") {
      alphabets.push(item);
      if (item === item.toLowerCase() && item > highestLowerCaseAlphabet) {
        highestLowerCaseAlphabet = item;
      }
    }
  });

  return {
    numbers,
    alphabets,
    highestLowerCaseAlphabet: highestLowerCaseAlphabet || null,
  };
};

// POST endpoint for processing the request
app.post("/bfhl", (req, res) => {
  const { data, file_b64 } = req.body;

  if (!data) {
    return res.status(400).json({ is_success: false, message: "Invalid Input" });
  }

  const { numbers, alphabets, highestLowerCaseAlphabet } = processInputData(data);

  const response = {
    is_success: true,
    user_id: "john_doe_17091999", // Replace with logic to generate user_id from name and DOB
    email: "john@xyz.com", // Replace with actual email
    roll_number: "ABCD123", // Replace with actual roll number
    numbers,
    alphabets,
    highest_lowercase_alphabet: highestLowerCaseAlphabet ? [highestLowerCaseAlphabet] : [],
    file_valid: file_b64 ? true : false, // Assuming file is always valid for simplicity
    file_mime_type: "image/png", // Hardcoded MIME type; this should depend on the actual file
    file_size_kb: "400", // Hardcoded file size; this should depend on the actual file
  };

  res.status(200).json(response);
});

// GET endpoint for returning a hardcoded operation code
app.get("/bfhl", (req, res) => {
  res.status(200).json({
    operation_code: 1,
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
