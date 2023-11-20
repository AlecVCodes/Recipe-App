const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const validator = require("validator");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "Email is not valid",
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isStrongPassword(value) && /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(value),
      message: "Password is not strong enough or does not contain at least 1 special character",
    },
  },
  profilePicture: {
    type:String,
    required: false,
  },
  role : {
    type : String, 
    default: "Admin",
    required: false,
  }

});

// Static user signup method

userSchema.statics.signup = async function (email, password) {
  // Validation
  if (!email || !password) {
    throw new Error("All fields must be filled");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw new Error("Email already in use");
  }

  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters");
  }

 

  // Adds random characters onto the user's password before adding them to the database
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });

  return user;
};

// Static user login method

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw new Error("All fields must be filled");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw new Error("Incorrect email");
  }

  // Check the login password with the hashed password stored in the database
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new Error("Incorrect Password");
  }

  return user;
};



module.exports = mongoose.model("User", userSchema);
