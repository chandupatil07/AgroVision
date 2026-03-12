import os
os.environ["CUDA_VISIBLE_DEVICES"] = "-1"

from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import cv2
import tensorflow as tf
import joblib
import pandas as pd
import os
from utils import is_blurry, is_plant_image

app = Flask(__name__)
disease_model = tf.keras.models.load_model("model.h5")
print("Model loaded successfully")
CORS(app)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# =========================
# Load Crop Prediction Model
# =========================
crop_model = joblib.load(os.path.join(BASE_DIR, "model/rf_model.pkl"))
encoder = joblib.load(os.path.join(BASE_DIR, "model/label_encoder.pkl"))

# =========================
# Load Disease Detection Model
# =========================
MODEL_PATH = os.path.join(BASE_DIR, "model.h5")
disease_model = tf.keras.models.load_model(MODEL_PATH)

CLASS_NAMES = ["Healthy", "Leaf Blight", "Powdery Mildew", "Rust"]
@app.route("/")
def home():
    return "AgroVision ML Server Running"

# =========================
# Crop Prediction API
# =========================
@app.route("/crop/predict", methods=["POST"])
def crop_predict():

    data = request.json

    features = [[
        data["N"], data["P"], data["K"],
        data["temperature"], data["humidity"],
        data["ph"], data["rainfall"]
    ]]

    df = pd.DataFrame(features, columns=[
        "N","P","K","temperature","humidity","ph","rainfall"
    ])

    prediction = crop_model.predict(df)
    crop = encoder.inverse_transform(prediction)

    return jsonify({
        "crop": crop[0],
        "reason": "Prediction based on soil nutrients and weather conditions."
    })

# =========================
# Disease Detection API
# =========================
@app.route("/disease/predict", methods=["POST"])
def disease_predict():

    if "image" not in request.files:
        return jsonify({"error": "No image file provided"}), 400

    file = request.files["image"]

    img_path = os.path.join(BASE_DIR, "temp.jpg")
    file.save(img_path)

    if not is_plant_image(img_path):
        return jsonify({"message": "Upload valid plant leaf image"}), 400

    if is_blurry(img_path):
        return jsonify({"message": "Upload clear image"}), 400

    # img = cv2.imread(img_path)
    # img = cv2.resize(img, (224,224))
    # img = img / 255.0
    # img = np.reshape(img, (1,224,224,3)) # old code

    img = cv2.imread(img_path)

    # Resize immediately (reduces memory usage)
    img = cv2.resize(img, (224,224))

    img = img.astype("float32") / 255.0
    img = np.expand_dims(img, axis=0)

    # preds = disease_model.predict(img) //old code
    preds = disease_model.predict(img, verbose=0)
    os.remove(img_path)

    class_index = np.argmax(preds[0])
    confidence = float(np.max(preds[0]) * 100)

    return jsonify({
        "disease": CLASS_NAMES[class_index],
        "confidence": f"{confidence:.2f}%"
    })

# =========================
# Run Server
# =========================
# if __name__ == "__main__":
#     app.run(host="0.0.0.0", port=10000)


# =========================
# Run Server
# =========================
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port)







# import os
# os.environ["CUDA_VISIBLE_DEVICES"] = "-1"

# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import numpy as np
# import cv2
# import tensorflow as tf
# import joblib
# import pandas as pd
# from utils import is_blurry, is_plant_image

# app = Flask(__name__)
# CORS(app)

# BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# # =========================
# # Load Crop Prediction Model
# # =========================
# crop_model = joblib.load(os.path.join(BASE_DIR, "model/rf_model.pkl"))
# encoder = joblib.load(os.path.join(BASE_DIR, "model/label_encoder.pkl"))

# # =========================
# # Load Disease Detection Model
# # =========================
# MODEL_PATH = os.path.join(BASE_DIR, "model.h5")
# disease_model = tf.keras.models.load_model(MODEL_PATH)
# print("Disease model loaded successfully")

# CLASS_NAMES = ["Healthy", "Leaf Blight", "Powdery Mildew", "Rust"]


# @app.route("/")
# def home():
#     return "AgroVision ML Server Running"


# # =========================
# # Crop Prediction API
# # =========================
# @app.route("/crop/predict", methods=["POST"])
# def crop_predict():

#     data = request.json

#     features = [[
#         data["N"], data["P"], data["K"],
#         data["temperature"], data["humidity"],
#         data["ph"], data["rainfall"]
#     ]]

#     df = pd.DataFrame(features, columns=[
#         "N", "P", "K", "temperature", "humidity", "ph", "rainfall"
#     ])

#     prediction = crop_model.predict(df)
#     crop = encoder.inverse_transform(prediction)

#     return jsonify({
#         "crop": crop[0],
#         "reason": "Prediction based on soil nutrients and weather conditions."
#     })


# # =========================
# # Disease Detection API
# # =========================
# @app.route("/disease/predict", methods=["POST"])
# def disease_predict():

#     if "image" not in request.files:
#         return jsonify({"error": "No image file provided"}), 400

#     file = request.files["image"]

#     img_path = os.path.join(BASE_DIR, "temp.jpg")
#     file.save(img_path)

#     if not is_plant_image(img_path):
#         os.remove(img_path)
#         return jsonify({"message": "Upload valid plant leaf image"}), 400

#     if is_blurry(img_path):
#         os.remove(img_path)
#         return jsonify({"message": "Upload clear image"}), 400

#     img = cv2.imread(img_path)

#     # Resize image for model input
#     img = cv2.resize(img, (224, 224))

#     img = img.astype("float32") / 255.0
#     img = np.expand_dims(img, axis=0)

#     preds = disease_model.predict(img, verbose=0)

#     os.remove(img_path)

#     class_index = np.argmax(preds[0])
#     confidence = float(np.max(preds[0]) * 100)

#     return jsonify({
#         "disease": CLASS_NAMES[class_index],
#         "confidence": f"{confidence:.2f}%"
#     })


# # =========================
# # Run Server
# # =========================
# if __name__ == "__main__":
#     port = int(os.environ.get("PORT", 10000))
#     app.run(host="0.0.0.0", port=port)