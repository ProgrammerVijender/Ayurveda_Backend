import express from "express";
import cors from "cors";
// import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import postsRoute from "./routes/posts.route.js";
// import { Posts } from "./models/posts.model.js";
import allpostsRoute from "./routes/posts.route.js";
// import  likePosts  from "./routes/posts.route.js";
// import jwt from "jsonwebtoken";
// import express from "express";
// import otherUserswithPosts from "./routes/user.route.js";


const app = express();
import fileUpload from 'express-fileupload';
app.use(fileUpload());


dotenv.config({});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 4004; 


app.use("/api/v1/user", userRoute);
// app.use("/api/v1/user", otherUserswithPosts);
app.use("/api/v1/posts", postsRoute,allpostsRoute);
app.use("/api/v1",allpostsRoute);



app.listen(PORT,  () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
