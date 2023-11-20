const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const UserRecipeSchema = require("../models/userRecipesModel");
const mongoose = require("mongoose");


const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// Login a user
const loginUser = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const user = await User.login(email, password);

    // Create a token 
    const token = createToken(user._id);
    console.log(user, "sauhduashsauhuash")
    console.log(user._id, "USSSSSSSSSSSSSSSSSSER")
    console.log(role)

    res.status(200).json({ email, token, role });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Signup a user
const signUpUser = async (req, res) => {


  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);

    // Create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: error.message });
  }
};
// Upd ate user's profile picture
const updateProfilePicture = async (req, res) => {
  // You already have the user's ID from the middleware
  const userId = req.user[0]._id;

  // Get the new profile picture URL from the request body
  const { profilePictureUrl } = req.body;

  try {
    // Find the user by their ID
    const user = await User.findById(userId);

    if (!user) {
      // Handle the case where the user is not found
      return res.status(404).json({ error: "User not found" });
    }

    // Update the profilePicture field with the new value
    user.profilePicture = profilePictureUrl;

    // Save the updated user document
    const updatedUser = await user.save();

    res.status(200).json({ message: "Profile picture updated successfully", user: updatedUser });
  } catch (error) {
    // Handle any errors that may occur during the database operations
    res.status(500).json({ error: error.message });
  }
};


//Get user profile pic

const getProfilePicture= async (req, res) => {
  // You already have the user's ID from the middleware
  const userId = req.user[0]._id;

  try {
    // Find the user by their ID
    const user = await User.findById(userId);

    if (!user) {
      // Handle the case where the user is not found
      return res.status(404).json({ error: "User not found" });
    }

    // Get the user's profile picture URL
    const profilePictureUrl = user.profilePicture;

    res.status(200).json({ profilePictureUrl });
  } catch (error) {
    // Handle any errors that may occur during the database operations
    res.status(500).json({ error: error.message });
  }
};

const getRole = async (req, res) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  console.log(req, "request")

  try {
    // Decode the token to get the user's ID
    const decoded = jwt.verify(token, process.env.SECRET);

    // Find the user by their ID
    const user = await User.findById(decoded._id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Return the user's role
    res.status(200).json({ role: user.role });
  } catch (error) {
    res.status(500).json({ error: "Failed to get user's role" });
  }
};



module.exports = { signUpUser, loginUser, updateProfilePicture , getProfilePicture, getRole };
