import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber:{
    type: Number,
    // required: true,
    // unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Posts",
    },
  ],
  
  // role:{
  //   type: String,
  //   enum:['student','recruiter'],
  //   default: true
  // },
  profile:{
    bio:{type:String},
    occupation:{ type:String },
    // resume:{type:String},
    // resumeOriginalName: {type:String},
    // company: {type:mongoose.Schema.Types.ObjectId, ref:'Company'},
    profilePhoto:{
        type:String,
        default: ""
    }
  },
},
{timestamps:true});

export const User = mongoose.model("User", userSchema);