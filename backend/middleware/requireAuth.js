const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id, exp } = jwt.verify(token, process.env.SECRET);

    if (!(_id && exp)) {
      return res.status(401).json({ error: "Invalid token payload" });
    }

    if (Date.now() >= exp * 1000) {
      return res.status(401).json({ error: "Token has expired" });
    }

    req.user = await User.find({ _id }).select("_id");
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error.message);

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid token" });
    }

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token has expired" });
    }

    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = requireAuth;
