const express = require("express");

//controller functions

const { loginUser, signUpUser, updateProfilePicture, getProfilePicture, getRole } = require("../contollers/usersController");
const requireAuth = require("../middleware/requireAuth");
const router = express.Router();

//login route

router.post("/login", loginUser);

//sign up route
router.post("/signup", signUpUser);

router.get("/role", getRole)

//Add user profile picture

router.post("/update_picture", requireAuth, updateProfilePicture)

router.get("/profile_picture", requireAuth, getProfilePicture)

module.exports = router;
