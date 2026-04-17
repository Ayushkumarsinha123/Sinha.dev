import Reel from "../models/Reel.js";
import User from "../models/User.js";
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

// get own restro reels

export const getRestaurantReels = async (req, res) => {
  try {
    // only fetch reel that belong to logged-in restro
    const myReels = await Reel.find({restaurant:req.user.id})
      .sort({createdAt : -1}) // recent reel first
      res.status(200).json(myReels);
  } catch(error) {
    console.error("get my error", error);
    res.status(500).json({message : "failed to fetch reels ", error: error.message})
  }
};

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
// delete reel controller 
export const deleteReel = async (req, res) => {
  try {
    const reel = await Reel.findById(req.params.id);
    if(!reel) return res.status(404).json({ message: "reel not found"});

    //security check
    if(reel.restaurant.toString() != req.user.id) {
      return res.status(200).json({message : "user not authorized to delete this reel"})
    }
    await reel.deleteOne();
    res.status(200).json({message:"reel is deleted"});
  } catch(error) {
    console.error("delete error", error);
    res.status(500).json({message:"failed to delete reel", error:error.message});
  }
};

// edit/update reel controller
export const updateReel = async (req, res) => {
  try {
    const reel = await Reel.findById(req.params.id);
    if(!reel) return res.status(404).json({ message: "reel not found"});

    //security check
    if(reel.restaurant.toString() != req.user.id) {
      return res.status(200).json({message : "user not authorized to delete this reel"})
    }

    const updatedReel = await Reel.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title || reel.title,
        price: req.body.price || reel.price,
      } , 
      {new : true} // this return the updated document
    );
    res.status(200).json(updatedReel);
  } catch(error) {
    console.error("UPDATE REEL ERROR:", error);
    res.status(500).json({ message: "Failed to update reel", error: error.message });
  }
};

//seach reel by dish name or title
export const searchReels = async (req, res) =>{
  try {
    const { query } = req.query; // Grabs the word from /api/reels/search?query=pizza
    if (!query) {
      return res.status(200).json([]);
    }

    // Search MongoDB using regex for case-insensitive partial matches
    const searchResults = await Reel.find({
      $or: [
        { dishName: { $regex: query, $options: "i" } }, // 'i' means ignore upper/lowercase
        { title: { $regex: query, $options: "i" } }
      ]
    })
    .populate({
      path: "restaurant",
      select: "name picture",
      model: User 
    })
    .sort({ createdAt: -1 });

    res.status(200).json(searchResults);
  } catch (error) {
    console.error("SEARCH ERROR:", error);
    res.status(500).json({ message: "Search failed", error: error.message });
  }
}