from flask import Flask, request, jsonify
import joblib
import pandas as pd
import os

app = Flask(__name__)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

model = joblib.load(os.path.join(BASE_DIR, "model/rf_model.pkl"))
encoder = joblib.load(os.path.join(BASE_DIR, "model/label_encoder.pkl"))

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json

    features = [[
        data["N"], data["P"], data["K"],
        data["temperature"], data["humidity"],
        data["ph"], data["rainfall"]
    ]]

    df = pd.DataFrame(features, columns=[
        "N","P","K","temperature","humidity","ph","rainfall"
    ])

    prediction = model.predict(df)
    crop = encoder.inverse_transform(prediction)

    return jsonify({
        "crop": crop[0],
        "reason": "Prediction based on soil nutrients, rainfall and weather."
    })

if __name__ == "__main__":
    app.run(port=8000)