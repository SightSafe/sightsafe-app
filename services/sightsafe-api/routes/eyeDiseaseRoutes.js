const express = require("express");
const multer = require("multer");
const { predictEyeDisease } = require("../models/predictModel");
const { db, bucket } = require("../firebase/config");
const { authenticate } = require("../firebase/middleware");

const { database: predictionDB } = require("../db");

const router = express.Router();

// Multer Configuration
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 1 * 1024 * 1024 }, // 1MB limit
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg"];
    cb(null, allowedMimeTypes.includes(file.mimetype));
  },
});

// POST /eye-disease/predict
router.post(
  "/predict",
  authenticate,
  upload.single("photo"),
  async (req, res) => {
    if (!req.file) {
      return res
        .status(400)
        .json({ message: "No file uploaded or invalid file type." });
    }

    try {
      // Upload image to Firebase Storage
      const blob = bucket.file(
        `uploads/${Date.now()}-${req.file.originalname}`
      );
      const blobStream = blob.createWriteStream({
        metadata: { contentType: req.file.mimetype },
      });
      blobStream.end(req.file.buffer);

      // Predict Eye Disease
      const prediction = await predictEyeDisease(req.file.buffer);

      // Save prediction to Firestore
      await db.collection("predictions").doc(prediction.id).set(prediction);

      const entry = predictionDB.find(
        (x) => x.label === prediction.predicted_class
      );

      res.status(200).json({
        message: "Model is predicted successfully.",
        data: {
          id: prediction.id,
          result: entry.name,
          confidenceScore: prediction.confidence,
          isAboveThreshold: prediction.confidence > entry.threshold,
          recommendation: entry.recommendation.join("\n"),
          createdAt: new Date().toISOString(),
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Prediction failed.", error });
    }
  }
);

module.exports = router;
