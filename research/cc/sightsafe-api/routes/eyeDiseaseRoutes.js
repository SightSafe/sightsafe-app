const express = require("express");
const multer = require("multer");
const { bucket, db } = require("../firebase/config");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();

// Multer Config
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 1 * 1024 * 1024 }, // 1MB max
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed!"), false);
    }
    cb(null, true);
  },
});

// Predict Endpoint
router.post("/eye-disease/predict", upload.single("photo"), async (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).json({ message: "File is required" });

  const uniqueFileName = `${uuidv4()}_${file.originalname}`;
  const fileUpload = bucket.file(uniqueFileName);

  try {
    await fileUpload.save(file.buffer);
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${uniqueFileName}`;

    // Simulate model prediction
    const prediction = {
      result: "Vascular lesion",
      confidenceScore: 99.67641830444336,
      isAboveThreshold: true,
      createdAt: new Date().toISOString(),
    };

    const docId = uuidv4();
    await db.collection("predictions").doc(docId).set({
      id: docId,
      ...prediction,
      imageUrl: publicUrl,
    });

    res.status(200).json({
      message: "Model is predicted successfully.",
      data: { id: docId, ...prediction },
    });
  } catch (error) {
    res.status(500).json({ message: "Error uploading file", error });
  }
});

// Recommendation Endpoint
router.post("/eye-disease/recommendation", async (req, res) => {
  try {
    const recommendation = {
      result: "You have to check to the doctor",
    };

    const docId = uuidv4();
    await db.collection("recommendations").doc(docId).set({
      id: docId,
      ...recommendation,
    });

    res.status(200).json({
      message: "Recommendation is provided successfully.",
      data: { id: docId, ...recommendation },
    });
  } catch (error) {
    res.status(500).json({ message: "Error processing recommendation", error });
  }
});

module.exports = router;
