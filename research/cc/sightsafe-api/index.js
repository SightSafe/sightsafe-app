const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const eyeDiseaseRoutes = require('./routes/eyeDiseaseRoutes');

// Load environment variables
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/eye-disease', eyeDiseaseRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
