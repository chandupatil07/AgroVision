from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import cv2
import tensorflow as tf
import os
from utils import is_blurry, is_plant_image

app = Flask(__name__)
CORS(app)   # ✅ Enable CORS for frontend

# -------------------------------
# Load trained model safely
# -------------------------------
MODEL_PATH = os.path.join(os.path.dirname(__file__), "model.h5")

model = tf.keras.models.load_model(MODEL_PATH)

CLASS_NAMES = ["Healthy", "Leaf Blight", "Powdery Mildew", "Rust"]

# -------------------------------
# Disease Prediction Route
# -------------------------------
@app.route("/disease/predict", methods=["POST"])
def predict():
    if "image" not in request.files:
        return jsonify({"error": "No image file provided"}), 400

    file = request.files["image"]

    img_path = os.path.join(os.path.dirname(__file__), "temp.jpg")
    file.save(img_path)

    # Validate plant image
    if not is_plant_image(img_path):
        return jsonify({"message": "Please upload a valid plant leaf image"}), 400

    # Check blur
    if is_blurry(img_path):
        return jsonify({"message": "Please upload a clear image"}), 400

    # -------------------------------
    # Preprocess image
    # -------------------------------
    img = cv2.imread(img_path)
    img = cv2.resize(img, (224, 224))
    img = img / 255.0
    img = np.reshape(img, (1, 224, 224, 3))

    # -------------------------------
    # Predict
    # -------------------------------
    preds = model.predict(img)
    class_index = np.argmax(preds[0])
    confidence = float(np.max(preds[0]) * 100)

    return jsonify({
        "disease": CLASS_NAMES[class_index],
        "confidence": f"{confidence:.2f}%"
    })


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=6000)