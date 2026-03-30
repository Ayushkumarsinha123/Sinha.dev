import { useState } from "react";
import TextField from "@mui/material/TextField";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

// 🎨 Custom MUI Styles for Dark Theme (Same as Login/Signup!)
const darkInputStyles = {
  input: { color: 'white' },
  label: { color: '#9ca3af' }, // gray-400
  '& .MuiOutlinedInput-root': {
    '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
    '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
    '&.Mui-focused fieldset': { borderColor: '#f97316' }, // orange-500
  },
  '& .MuiInputLabel-root.Mui-focused': { color: '#f97316' },
};

const UploadReelForm = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [description, setDescription] = useState("");
  const [dishId, setDishId] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [previewName, setPreviewName] = useState("");
  const [title, setTitle] = useState("");
  const [dishName, setDishName] = useState("");
  const [price, setPrice] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      setPreviewName(file.name);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!videoFile) {
      alert("Please select a video reel to upload!");
      return;
    }

    setIsUploading(true);

    const formData = new FormData();

    formData.append("description", description);
    // formData.append('dishId', dishId);

    formData.append("title", title);
    formData.append("dishName", dishName);
    formData.append("price", price);
    formData.append("video", videoFile);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:3000/api/reels/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        alert("🎉 Reel uploaded successfully!");
        setVideoFile(null);
        setPreviewName("");
        setDescription("");
        setDishId("");
        setTitle("");
        setDishName("");
        setPrice("");
      } else {
        alert("Upload failed: " + data.message);
      }
    } catch (error) {
      console.error("Error uploading:", error);
      alert("Something went wrong connecting to the server.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleUpload} className="flex flex-col gap-6">
        
        {/* Dark Theme Drag & Drop Zone */}
        <div className="border-2 border-dashed border-white/20 rounded-3xl p-8 text-center hover:bg-white/5 hover:border-orange-500/50 transition-all duration-300 group cursor-pointer relative overflow-hidden">
          <input
            type="file"
            accept="video/mp4,video/x-m4v,video/*"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            id="video-upload"
          />
          <div className="flex flex-col items-center justify-center pointer-events-none">
            <CloudUploadIcon
              className="text-gray-500 group-hover:text-orange-500 transition-colors duration-300 mb-3 drop-shadow-md"
              sx={{ fontSize: 48 }}
            />
            <span className="text-orange-500 font-bold text-lg mb-1">
              Click or drag to upload video
            </span>
            <span className="text-gray-500 text-sm">
              MP4 or WebM (Max 50MB)
            </span>
          </div>
          
          {previewName && (
            <div className="mt-4 text-sm font-bold text-green-400 bg-green-500/10 border border-green-500/20 py-2 px-4 rounded-full inline-block relative z-20 shadow-lg">
              ✓ {previewName}
            </div>
          )}
        </div>

        {/* Form Fields */}
        <TextField
          label="Catchy Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={2}
          fullWidth
          required
          placeholder="e.g., The cheese pull on our new deep dish! 🍕🤤"
          sx={darkInputStyles}
        />

        <TextField
          label="Dish ID (Temporary MVP Field)"
          value={dishId}
          onChange={(e) => setDishId(e.target.value)}
          fullWidth
          required
          placeholder="Paste a valid MongoDB Dish Object ID here"
          sx={darkInputStyles}
        />
        
        <TextField
          label="Reel Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          required
          sx={darkInputStyles}
        />

        <TextField
          label="Dish Name"
          value={dishName}
          onChange={(e) => setDishName(e.target.value)}
          fullWidth
          required
          sx={darkInputStyles}
        />

        <TextField
          label="Price (₹)"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          fullWidth
          required
          sx={darkInputStyles}
        />

        {/* Glowing Gradient Button */}
        <button
          type="submit"
          disabled={isUploading}
          className={`mt-2 w-full text-white py-4 rounded-full font-bold text-lg transition-all flex justify-center items-center gap-3 ${
            isUploading 
              ? "bg-white/10 text-gray-400 cursor-not-allowed border border-white/10" 
              : "bg-gradient-to-r from-orange-500 to-red-500 hover:scale-[1.02] shadow-[0_0_15px_rgba(249,115,22,0.3)] hover:shadow-[0_0_25px_rgba(249,115,22,0.5)] active:scale-95"
          }`}
        >
          {isUploading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Uploading to Cloudinary...
            </>
          ) : "Publish Reel"}
        </button>
      </form>
    </div>
  );
};

export default UploadReelForm;