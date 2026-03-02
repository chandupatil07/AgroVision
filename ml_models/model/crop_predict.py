import sys
import pickle
import numpy as np

# Load model
model = pickle.load(open("rf_model.pkl", "rb"))
label_encoder = pickle.load(open("label_encoder.pkl", "rb"))

# Inputs from Node.js
N = float(sys.argv[1])
P = float(sys.argv[2])
K = float(sys.argv[3])
temperature = float(sys.argv[4])
humidity = float(sys.argv[5])
rainfall = float(sys.argv[6])

data = np.array([[N, P, K, temperature, humidity, rainfall]])

prediction = model.predict(data)
crop = label_encoder.inverse_transform(prediction)

print(crop[0])