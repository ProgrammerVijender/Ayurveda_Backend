import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    
    createdAt: {
    type: Date,
    default: Date.now,
  },
  PostCreaterName: {
    type: String,
    required: true,
  },

  createdByUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  textData: {
    type: String,
    required: true,
  },
  likes: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" 
  }],
  image: {
    type: String,
    default: "",
  },
  },
{timestamps:true});

export const Posts = mongoose.model("Posts", postSchema);