# 🌿 AgroVision - Smart Agriculture System

AgroVision is an AI-powered agriculture platform developed to assist farmers and users in making better agricultural decisions using Machine Learning and Web Technologies.

This system integrates crop prediction, plant disease detection, and weather analysis into a single platform.

---

## 🚀 Project Overview

AgroVision provides:

- 🌾 Crop Recommendation using Machine Learning
- 🌿 Plant Disease Detection using Deep Learning (CNN)
- 🌦️ Real-time Weather Data Integration

The system is built using a full-stack architecture:

Frontend → Backend → Machine Learning Model

---

## 🧠 System Architecture
Frontend (React - Vercel)
↓
Backend (Node.js - Render)
↓
ML Server (Flask + TensorFlow - Render)


---

## 📸 Project Screenshots

### 🏠 Home Page


---

### 🌾 Crop Prediction Page
👉 ADD IMAGE HERE (Crop Prediction Screenshot)

---

### 🌿 Disease Detection Page
👉 ADD IMAGE HERE (Disease Detection Screenshot)

---

### 🌦️ Weather Page
👉 ADD IMAGE HERE (Weather Page Screenshot)

---

## 🌾 Crop Prediction (Machine Learning)

This module predicts the most suitable crop based on:

- Nitrogen (N)
- Phosphorus (P)
- Potassium (K)
- Temperature
- Humidity
- pH
- Rainfall

Model Used:
- Random Forest Classifier

Output:
- Predicted Crop
- Reason for recommendation

---

## 🌿 Disease Detection (Deep Learning)

This module detects plant diseases using image input.

Steps:
1. User uploads leaf image
2. Image is preprocessed using OpenCV
3. CNN model (TensorFlow) predicts disease
4. Output shows:
   - Disease Name
   - Confidence %

Model Details:
- Input size: 224 × 224
- Framework: TensorFlow / Keras

---

## 🌦️ Weather Module

- Fetches real-time weather data using API
- Provides:
  - Temperature
  - Humidity

Used for improving crop prediction accuracy

---

## 🏗️ Tech Stack

### Frontend
- React.js
- Tailwind CSS

### Backend
- Node.js
- Express.js

### Machine Learning
- Python (Flask)
- TensorFlow
- OpenCV
- Scikit-learn

### Database
- MongoDB

### Deployment
- Frontend → Vercel
- Backend → Render
- ML Models → Render

---

## ⚙️ Installation & Setup (Local)

### 1️⃣ Clone Repository


