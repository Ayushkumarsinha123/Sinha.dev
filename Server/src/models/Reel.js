import mongoose, { Mongoose } from "mongoose";
const reelSchema = new mongoose.Schema(
  {
    title : {
      type: String,
      required : true
    } ,
    videoUrl: {
      type: String,
      required : true
    } ,
    caption : {
      type : String
    } ,
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    } ,
    dishName: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    like: {
      type : Number,
      default : 0
    }
  },
  {timestamps : true}
) 

export default mongoose.model("Reel", reelSchema);