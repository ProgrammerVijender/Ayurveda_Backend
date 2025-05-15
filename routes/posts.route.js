import express from "express";
import { createPosts } from "../controllers/posts.controller.js";
import  isAuthenticated  from "../middlewares/isAuthenticated.js";
import { likePost ,getAllposts,deletePost} from "../controllers/posts.controller.js";
import { register, login, logout } from "../controllers/user.controller.js";


const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/getallposts").get(isAuthenticated,getAllposts);

router.route("/:postId/like").post(isAuthenticated,likePost);
router.route("/:postId/deletepost").delete(isAuthenticated,deletePost);

router.route("/createposts").post(isAuthenticated,createPosts);
// router.route("/createposts").post(isAuthenticated,createPosts);

export default router;
