import { useState } from "react";
import api from "../services/api";
import diseaseBg from "../assets/disease_pred_page.jpg";

function DiseaseDetection() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult("");
  };

  const handleSubmit = async () => {
    if (!image) {
      alert("Please upload a leaf image");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      setLoading(true);

      const response = await api.post(
        "/disease/predict",
        formData
      );

      setResult(response.data.message || response.data.disease);

    } catch (error) {
      if (error.response) {
        setResult(error.response.data.message);
      } else {
        setResult("Server not responding");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{ backgroundImage: `url(${diseaseBg})` }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative z-10 w-full max-w-4xl text-center">
        <h1 className="text-4xl font-bold text-white mb-8 drop-shadow-lg">
          🌿 Leaf Disease Detection
        </h1>

        {/* Main Card */}
        <div className="bg-white bg-opacity-95 backdrop-blur-md rounded-2xl shadow-2xl p-8 max-w-2xl mx-auto">

          <p className="text-gray-600 mb-6 text-lg">
            Upload a clear plant leaf image to detect possible diseases using AI analysis.
          </p>

          <div className="flex flex-col items-center gap-6">

            {/* File Input */}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="border p-2 rounded-lg w-full cursor-pointer"
            />

            {/* Image Preview */}
            {preview && (
              <div className="shadow-lg rounded-xl overflow-hidden">
                <img
                  src={preview}
                  alt="preview"
                  className="w-64 h-64 object-cover"
                />
              </div>
            )}

            {/* Detect Button */}
            <button
              onClick={handleSubmit}
              className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition duration-300 text-lg font-semibold shadow-lg w-full"
            >
              {loading ? "Detecting..." : "🔍 Detect Disease"}
            </button>

            {/* Result Section */}
            {result && (
              <div className="mt-6 bg-green-100 border-l-4 border-green-600 p-5 rounded-lg shadow text-center">
                <h3 className="text-xl font-bold text-green-700 mb-2">
                  🧪 Detection Result
                </h3>
                <p className="text-lg text-gray-800 font-semibold">
                  {result}
                </p>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

export default DiseaseDetection;