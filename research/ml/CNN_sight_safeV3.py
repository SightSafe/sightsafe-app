import os
import io
import numpy as np
import tensorflow as tf
from PIL import Image
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse

# Initialize FastAPI app
app = FastAPI()

# Load the trained model
MODEL_PATH = "Sight SafeV2-Eye Disease-98.02.h5"  # Update this path with your actual model location
if not os.path.exists(MODEL_PATH):
    raise FileNotFoundError(f"Model file not found at {MODEL_PATH}")

model = tf.keras.models.load_model(MODEL_PATH)

# Define class names based on your dataset
CLASS_NAMES = [
    "Bitot_Spot_of_Vitamin_A_Deficiency",
    "Cataracts",
    "Cellulitis_eye",
    "Conjunctivitis",
    "Corneal_Ulcer",
    "Ectropion",
    "Normal_Eye"
]

# Image preprocessing function
def preprocess_image(image_bytes):
    """
    Preprocess the uploaded image for prediction.
    Args:
        image_bytes: Byte content of the uploaded image.
    Returns:
        Preprocessed image ready for model prediction.
    """
    try:
        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        image = image.resize((224, 224))  # Resize to model input size
        image_array = np.array(image) / 255.0  # Normalize pixel values
        return np.expand_dims(image_array, axis=0)  # Add batch dimension
    except Exception as e:
        raise ValueError(f"Error processing image: {e}")

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    """
    Predict the class of an uploaded image.
    Args:
        file: Uploaded image file.
    Returns:
        JSON response with predicted class and confidence.
    """
    try:
        # Read uploaded file
        image_bytes = await file.read()
        
        # Preprocess image
        preprocessed_image = preprocess_image(image_bytes)

        # Make prediction
        predictions = model.predict(preprocessed_image)
        predicted_class_index = np.argmax(predictions[0])
        confidence = np.max(predictions[0])

        return JSONResponse({
            "filename": file.filename,
            "predicted_class": CLASS_NAMES[predicted_class_index],
            "confidence": float(confidence)
        })
    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=500)

@app.get("/")
def root():
    """
    Root endpoint to check API status.
    Returns:
        Welcome message.
    """
    return {"message": "Welcome to the Eye Disease Prediction API!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
