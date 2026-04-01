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
<img width="1886" height="910" alt="agrovision" src="https://github.com/user-attachments/assets/dea084aa-48a3-46e3-a167-09a85cdb0a22" 


---

### 🌿 Disease Detection Page
<img width="1919" height="971" alt="Screenshot 2026-03-02 030558" src="https://github.com/user-attachments/assets/c08c12c1-0fdc-411f-84d3-92c2fb7e107f" />


---

### 🌦️ Weather Page
<img width="1892" height="966" alt="image" src="https://github.com/user-attachments/assets/80b5fe96-f4cd-47ee-bb71-b13fe14cee31" />


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
git clone https://github.com/yourusername/agrovision.git

cd agrovision


---

### 2️⃣ Backend Setup
cd backend
npm install
npm start


---

### 3️⃣ Frontend Setup
cd frontend
npm install
npm start


---

### 4️⃣ ML Model Setup
cd ml_models
pip install -r requirements.txt
python app.py



---

## 🔗 API Endpoints

### Crop Prediction
POST /api/crop/predict


---

### Disease Detection
POST /api/disease/predict


---

## 🌍 Live Project Links

Frontend:https://agrovision-self.vercel.app/


Backend: https://agrovision-backend-ab1p.onrender.com




---

## 📌 Challenges Faced

- Deployment of ML model on cloud
- Slow response due to free hosting (Render cold start)
- Handling image processing efficiently
- Connecting frontend, backend, and ML server

---

## 🚀 Future Improvements

- Faster predictions using TensorFlow Lite
- Mobile application version
- More crop & disease datasets
- Better UI/UX improvements

---

## 👨‍💻 Author

**Chandrashekhar Patil**  
Computer Science Engineering Student  
Developer of AgroVision Project

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!

---






