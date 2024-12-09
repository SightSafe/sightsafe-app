const express = require("express");
const cors = require("cors");
const { authenticate } = require("./firebase/middleware");
const eyeDiseaseRoutes = require("./routes/eyeDiseaseRoutes");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", authenticate, eyeDiseaseRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
