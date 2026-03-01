import { useState } from "react";
import api from "../services/api";

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
    formData.append("image", image); // ✅ must be "image"

    try {
      setLoading(true);

      const response = await api.post(
        "/disease/predict",   // ✅ correct backend route
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
    <div className="min-h-screen bg-green-50 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-3xl">

        <h2 className="text-3xl font-bold text-green-700 mb-4 text-center">
          🌿 Leaf Disease Detection
        </h2>

        <p className="text-gray-600 text-center mb-6">
          Upload a clear plant leaf image.
        </p>

        <div className="flex flex-col items-center gap-4">

          <input type="file" accept="image/*" onChange={handleImageChange} />

          {preview && (
            <img
              src={preview}
              alt="preview"
              className="w-64 h-64 object-cover rounded border"
            />
          )}

          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-6 py-2 rounded"
          >
            {loading ? "Detecting..." : "Detect Disease"}
          </button>

          {result && (
            <div className="mt-4 text-lg font-semibold text-center text-green-800">
              {result}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default DiseaseDetection;