import express from "express";
import { login, logout,register, updateProfile , getProfile , otherUserswithPost} from "../controllers/user.controller.js";
import  isAuthenticated  from "../middlewares/isAuthenticated.js";


const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/getprofile").get(isAuthenticated,getProfile);
router.route("/profile/update").post(isAuthenticated,updateProfile);
router.route("/othersWithPosts").get(isAuthenticated,otherUserswithPost);




export default router;
