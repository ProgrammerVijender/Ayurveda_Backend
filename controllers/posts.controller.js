import { Posts } from "../models/posts.model.js";
import { User } from "../models/user.model.js";
import express from "express";
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";
import path from "path";
import os from "os";

const app = express();

// Configure file upload middleware
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(os.tmpdir(), "uploads"), // Use OS temp directory with a subfolder
    createParentPath: true, // Create the directory if it doesn't exist
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  })
);

// Configure Cloudinary
cloudinary.config({
  cloud_name: "",
  api_key: "",
  api_secret: "",
});

// // export const createPosts = async (req, res) => {
// //     try {
// //         console.log("creattt possttt")
// //         const createdByUser = req.id;
// //         const user = await User.findById(createdByUser);
// //         // console.log(user)

// //         // console.log("createdBy  "+createdByUser + " username : "+ user.fullname );
// //         // const textData = req.body.textData;
// //         const textData = "time paas checkingg data ";
// //         // console.log(textData)
// //         // const image = req.body.image;
// //         // const OwnerName = req.user.fullname;

// //         if(!createdByUser || !textData  ){
// //           // console.log(createdByUser + "        _____          "+ textData);
// //             return res.status(400).json({
// //                 message:"something is missing",
// //                 success:false
// //             });
// //         };

// //         // cloudinayr
// //         if (!req.files || !req.files.image) {
// //           return res.status(400).json({
// //             message: "No image file uploaded",
// //             success: false,
// //           });
// //         }
// //         const file = req.files.image;
// //         let imageUrl = "";
// //         try {
// //           const result = await cloudinary.uploader.upload(file.tempFilePath);
// //           console.log('result is:', result);
// //           imageUrl = result.secure_url;
// //         } catch (err) {
// //           console.log(err);
// //           return res.status(500).json({
// //             message: "Image upload failed",
// //             success: false,
// //           });
// //         }

        
// //         // console.log(User);
// //         // console.log(req.fullname )

// //         await Posts.create({
// //             createdByUser,
// //             textData,
// //             PostCreaterName: user.fullname,
// //             image: imageUrl,
// //             // OwnerName
// //             });
        
// //             return res.status(201).json({
// //                 message:"Post created successfully",
// //                 success:true
// //             });


// //     } catch (error) {
// //         console.log(error)
// //     }
        
        
    
// // }


// export const createPosts = async (req, res) => {
//   try {
//       console.log("Request body:", req.body);
//       console.log("Request files:", req.files);
//       console.log("User ID from req.id:", req.id);

//       const createdByUser = req.id;
//       const user = await User.findById(createdByUser);
//       console.log("Found user:", user);

//       if (!user) {
//           return res.status(404).json({
//               message: "User not found",
//               success: false
//           });
//       }

//       const textData = req.body.textData || "Default post text"; // Fallback if textData is missing
//       console.log("textData:", textData);

//       if (!createdByUser || !textData) {
//           return res.status(400).json({
//               message: "User ID or text data missing",
//               success: false
//           });
//       }

//       if (!req.files || !req.files.image) {
//           return res.status(400).json({
//               message: "No image file uploaded",
//               success: false
//           });
//       }

//       const file = req.files.image;
//       console.log("File details:", file);

//       let imageUrl = "";
//       try {
//           const result = await cloudinary.uploader.upload(file.tempFilePath, {
//               folder: "posts" // Optional: organize uploads in a folder
//           });
//           console.log("Cloudinary result:", result);
//           imageUrl = result.secure_url;
//       } catch (err) {
//           console.error("Cloudinary upload error:", err);
//           return res.status(500).json({
//               message: "Image upload failed",
//               success: false,
//               error: err.message
//           });
//       }

//       const post = await Posts.create({
//           createdByUser,
//           textData,
//           PostCreaterName: user.fullname,
//           image: imageUrl
//       });
//       console.log("Created post:", post);

//       return res.status(201).json({
//           message: "Post created successfully",
//           success: true,
//           post
//       });
//   } catch (error) {
//       console.error("Error in createPosts:", error);
//       return res.status(500).json({
//           message: "Internal server error",
//           success: false,
//           error: error.message
//       });
//   }
// };

export const getAllposts = async (req, res) => {
    try {
        const posts = await Posts.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, posts });
      } catch (error) {
        console.error('Error fetching all posts:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch posts' });
      }
};


// export const likePost = async (req, res) => {
//     try {
//         // console.log('liked backed posts workkk')
        
//         console.log('fetch by req : '+req.id);
//         const postId = req.body.params.postid;
//         const post = await Posts.findById(postId);
        
//         // let isLiked = false;

//         if(post)
//         {
//             const index = post.likes.indexOf(user._id);
//             if(index === -1)
//             {
//                 post.likes.push(user._id);
//             res.status(200).json({ success: true, message: 'Post liked' });

//                 // isLiked = true;
//             }
//             else
//             {
//                 post.likes.splice(index, 1);
//             res.status(200).json({ success: true, message: 'Post unliked' });

//             }
//             await post.save();
//         }
//       } catch (error) {
//         console.error('Error fetching all posts:', error);
//         res.status(500).json({ success: false, message: 'Failed to fetch posts' });
//       }
// };
export const likePost = async (req, res) => {
    try {
        // console.log("Full req.params:", req.params);
        // console.log("Full req.url:", req.url);
      const userId = req.id; // Assumes user is attached by authentication middleware
      const postId = req.params.postId; // Get from URL params like /:postId/like
        console.log(req.params.postId)
      const post = await Posts.findById(postId);
      if (!post) {
        return res.status(404).json({ success: false, message: 'Post not found' });
      }
  
      const index = post.likes.indexOf(userId);
  
      if (index === -1) {
        post.likes.push(userId);
        await post.save();
        return res.status(200).json({ success: true, message: 'Post liked', likes: post.likes.length });
      } else {
        post.likes.pull(userId);
        await post.save();
        return res.status(200).json({ success: true, message: 'Post unliked', likes: post.likes.length });
      }
  
    } catch (error) {
      console.error('Error in likePost:', error);
      res.status(500).json({ success: false, message: 'Something went wrong' });
    }
  };

export const deletePost = async (req, res) => {
    try {
        const userId =  req.id;
        const postId = req.params.postId;
        const post = await Posts.findById(postId);
        
        if (!post) {
          return res.status(404).json({
            message: "Post not found",
            success: false,
          });
        }

        if(post.createdByUser.toString() !== userId) {
          return res.status(401).json({
            message: "You can't delete another user post",
            success: false,
          });
        }

        await Posts.findByIdAndDelete(postId);
        res.status(200).json({
          message: "Post deleted successfully",
          success: true,
        });
    } catch (error) {
        console.error("Error in deletePost:", error);
        res.status(500).json({
          message: "Internal server error",
          success: false,
          error: error.message,
        });
    }
};




export const createPosts = async (req, res) => {
  try {
    // console.log("Request body:", req.body);
    // console.log("Request files:", req.files);
    // console.log("User ID from req.id:", req.id);

    const createdByUser = req.id;
    const user = await User.findById(createdByUser);
    console.log("Found user:", user);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    const textData = req.body.textData ;
    // console.log("textData:", textData);

    if (!createdByUser || !textData) {
      return res.status(400).json({
        message: "User ID or text data missing",
        success: false,
      });
    }

    if (!req.files || !req.files.image) {
      return res.status(400).json({
        message: "No image file uploaded",
        success: false,
      });
    }

    const file = req.files.image;
    console.log("File details:", file);

    let imageUrl = "";
    try {
      let uploadPath = file.tempFilePath;

      // If tempFilePath is empty, manually save the file buffer to a temp file
      if (!uploadPath) {
        const tempDir = path.join(os.tmpdir(), "uploads");
        await fs.mkdir(tempDir, { recursive: true }); // Ensure directory exists
        uploadPath = path.join(tempDir, `${Date.now()}-${file.name}`);
        await fs.writeFile(uploadPath, file.data);
        console.log("Manually saved file to:", uploadPath);
      }

      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(uploadPath, {
        folder: "posts",
        resource_type: "image",
      });
      console.log("Cloudinary result:", result);
      imageUrl = result.secure_url;

      // Clean up temporary file if created manually
      if (!file.tempFilePath) {
        await fs.unlink(uploadPath).catch((err) => console.error("Failed to delete temp file:", err));
      }
    } catch (err) {
      console.error("Cloudinary upload error:", err);
      // Clean up temporary file if it exists
      if (!file.tempFilePath && uploadPath) {
        await fs.unlink(uploadPath).catch((err) => console.error("Failed to delete temp file:", err));
      }
      return res.status(500).json({
        message: "Image upload failed",
        success: false,
        error: err.message,
      });
    }

    const post = await Posts.create({
      createdByUser,
      textData,
      PostCreaterName: user.fullname,
      image: imageUrl,
    });
    console.log("Created post:", post);

    return res.status(201).json({
      message: "Post created successfully",
      success: true,
      post,
    });
  } catch (error) {
    console.error("Error in createPosts:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

// Catch unhandled promise rejections to prevent crashes
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});