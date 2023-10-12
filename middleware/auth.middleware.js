const jwt = require("jsonwebtoken");
const User = require("../model/user.model");
require("dotenv").config();

module.exports.verifyToken = async (req, res, next) => {
  const bearerHeader = req.header("Authorization"); // Mengambil token dari header Authorization
  // const token = req.cookies.token;

  if (!bearerHeader) {
    return res
      .status(401)
      .json({ status: false, message: "Authentication failed." });
  }

  try {
    //split the space at the bearer
    const bearer = bearerHeader.split(" ");
    //Get token from string
    const bearerToken = bearer[1];
    const decoded = jwt.verify(bearerToken, process.env.TOKEN_KEY);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res
        .status(401)
        .json({ status: false, message: "User not found." });
    }

    // // set the token
    // req.token = bearerToken;
    // Attach the user object to the request for later use if needed
    req.user = user;

    next(); // Continue to the next middleware or route handler
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ status: false, message: "Token has expired." });
    } else {
      return res.status(401).json({ status: false, message: "Invalid token." });
    }
  }
};
