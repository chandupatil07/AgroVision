from flask import Flask, request, jsonify
import numpy as np
import cv2
import tensorflow as tf
from utils import is_blurry, is_plant_image

app = Flask(__name__)

# Load trained model
model = tf.keras.models.load_model("model.h5")

CLASS_NAMES = ["Healthy", "Leaf Blight", "Powdery Mildew", "Rust"]

@app.route("/predict", methods=["POST"])
def predict():
    if "image" not in request.files:
        return jsonify({"error": "No image file provided"}), 400

    file = request.files["image"]
    img_path = "temp.jpg"
    file.save(img_path)

    # Validate image
    if not is_plant_image(img_path):
        return jsonify({"message": "Please upload a valid plant leaf image"}), 400

    if is_blurry(img_path):
        return jsonify({"message": "Please upload a clear image"}), 400

    # Preprocess image
    img = cv2.imread(img_path)
    img = cv2.resize(img, (224, 224))
    img = img / 255.0
    img = np.reshape(img, (1, 224, 224, 3))

    # Prediction
    preds = model.predict(img)
    class_index = np.argmax(preds[0])
    confidence = float(np.max(preds[0]) * 100)

    return jsonify({
        "disease": CLASS_NAMES[class_index],
        "confidence": f"{confidence:.2f}%"
    })


if __name__ == "__main__":
    app.run(port=6000)