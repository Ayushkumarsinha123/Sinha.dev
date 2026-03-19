import Reel from "../models/Reel.js";
import User from "../models/user.js";
import fs from 'fs'
import cloudinary from  '../config/cloudinary.js';


// get all reels for customer
export const getAllReels = async(req, res) => {
  try {
    const reels = await Reel.find()
    .populate({
        path: "restaurant",
        select: "name picture",
        model: User 
      })
    .sort({createdAt: -1});
    res.status(200).json(reels);
  } catch(error){
    console.error(" GET REELS ERROR:", error); 
    
    res.status(500).json({ message: "failed to fetch reels", error: error.message });
  }
}

// upload a reel for restro dashboard

export const uploadReel = async (req, res) => {
  try{
    if(!req.file) {
      return res.status(400).json({ message : "no video file provider"});
    } 
    const localFilePath = req.file.path;
    const cloudinaryResponse = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "video",
      folder: "cravecart_reels", 
    });
    // Delete the temporary file from your local server
    fs.unlinkSync(localFilePath);

    // Save the new Reel to MongoDB
    const newReel = await Reel.create({
      
      title: req.body.title,
      dishName: req.body.dishName,
      price: req.body.price,
      caption: req.body.description,
      restaurant: req.user.id, 
      videoUrl: cloudinaryResponse.secure_url,
    });

    res.status(201).json({
      message: "Reel uploaded successfully!",
      reel: newReel,
    });

  } catch (error) {
    console.error("Upload error:", error);
    if (req.file) fs.unlinkSync(req.file.path); 
    res.status(500).json({ message: "Failed to upload reel", error: error.message });
  }
}