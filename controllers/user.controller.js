import { User } from "../models/user.model.js";
import { Posts } from "../models/posts.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// dotenv.config();

export const register = async (req, res) => {
    try {
        console.log('signup call backend');
        

        const {name , email, password } = req.body;
        const fullname = name;
        
        if(!fullname || !email || !password ){
            return res.status(400).json({
                message:"something is missing",
                success:false
            });
        
            
        };
    const user = await User.findOne({email});

    if(user){
        return res.status(400).json({
            message:"user already exists",
            success:false
        });
    };

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
        fullname,
        email,
        password:hashedPassword,
    });

    return res.status(201).json({
        message:"user created successfully",
        success:true
    });
    } catch (error) {
        console.log(error);
    }
};


export const login = async (req, res) =>{
        try{
            console.log("login")
            const {email, password} = req.body;
            
            console.log(email);
            if(!email || !password ){

                return res.status(400).json({
                    message:"something is missing",
                    success:false
                });
            }

            let user = await User.findOne({email});
            if(!user){
                return res.status(400).json({
                    message:"Incorrect email or password",
                    success:false
                })
            }
            const isPasswordMatch = await bcrypt.compare(password, user.password);

            if(!isPasswordMatch){
                
            return res.status(400).json({
                message:"Incorrect email or password",
                success:false
            })
            }

        const tokenData = {
            userid:user._id,
            // role:user.role
        };

        let token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY,{expiresIn:"1d"});

        user  = {
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            profile:user.profile
        };
        
        
        return res.status(200).cookie("token", token, {maxAge:1*24*60*60*1000, httpsOnly :true, sameSite:'strict'}).json({
            message: `Welcome back ${user.fullname}`,
            user,
            success:true,
            
        })
    }
        catch (error) {
            console.log(error);
        }
}

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", {maxAge:0}).json({
            message:"user logged out successfully",
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

export const updateProfile = async (req, res) => {
    // console.log("work")
    try {
        const { fullname, email, phoneNumber } = req.body;

        // if( !fullname || !email || !phoneNumber || !bio || !skills){
        //     return res.status(400).json({
        //         message:"something is missing",
        //         success:false
        //     });
        // };
        

        const userId = req.id;
        
        // console.log(req.id);
        let user = await User.findById(userId);

        if(!user){
            return res.status(400).json({
                message:"user not found",
                success:false
            });
        }

        // console.log('work4')
        //update data
        if(fullname) user.fullname = fullname;
        if(email) user.email = email;
        if(phoneNumber) user.phoneNumber = phoneNumber;

        await user.save();

        user  = {
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            phoneNumber:user.phoneNumber,
            profile:user.profile
        }
        


        return res.status(200).json({
            message:"profile updated successfully",
            user,
            success:true
        })
    }
    catch (error) {
        console.log(error);
    }
}

export const getProfile = async (req, res) => {
    try {
        const userId = req.id;
        console.log(userId);
        let user = await User.findById(userId);
        if(!user){
            return res.status(400).json({
                message:"user not found",
                success:false
            });
        }

        user  = {
            id:user._id,
            fullname:user.fullname,
            email:user.email,
            phoneNumber:user.phoneNumber,
            profile:user.profile
        }
        return res.status(200).json({
            message:"profile fetched successfully",
            user,
            success:true
        })
    }
    catch (error) {
        console.log(error);
    }
        
}

    

// import { Post } from "../models/post.model.js";

export const otherUserswithPost = async (req, res) => {
    try {
        const currentUserId = req.id;
        console.log(currentUserId)
        const users = await User.find({ _id: { $ne: currentUserId } });

        const usersWithPosts = await Promise.all(users.map(async (user) => {
            if(user._id !== currentUserId)
            {
                const postCount = await Posts.countDocuments({ createdByUser: user._id });
            return {
                id: user._id,
                fullname: user.fullname,
                // email: user.email,
                postCount,
                // profile: user.profile
            };
            }
        }));

        return res.status(200).json({
            message: "Fetched users with post counts",
            users: usersWithPosts,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}