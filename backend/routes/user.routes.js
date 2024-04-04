import express from "express";
import {getUserProfileAndRepos} from "../controller/user.controller.js"

const  router = express.Router();

router.get("/profile/:username", getUserProfileAndRepos)

export default router