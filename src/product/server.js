// All required modules
const express = require("express");
const cors = require('cors');
require("dotenv").config();

// All initializations
const app = express();
app.use(express.json());
app.use(cors());

// Initialize the routes
app.use(require('../routes'));

// Setup the port and start server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));