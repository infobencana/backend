const userService = require("../service/user.service");
const logger = require("../logger/api.logger");

module.exports.Signup = async (req, res) => {
  try {
    logger.info("Signup::", req.body);
    const userData = req.body;
    const { token } = await userService.signupUser(userData);
    res.status(201).json({
      status: true,
      message: "User berhasil signup",
      data: { token: token },
    });
  } catch (error) {
    logger.error(error.message);
    if (error.message.includes("Email already registered")) {
      return res
        .status(400)
        .json({ status: false, message: "Email sudah terdaftar." });
    }
    return res
      .status(500)
      .json({ status: false, message: "Internal server error." });
  }
};

module.exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    logger.info("Login as ::", email);
    const token = await userService.loginUser(email, password);
    res.status(201).json({
      status: true,
      message: "User berhasil login",
      data: { token: token },
    });
  } catch (error) {
    logger.error(error.message);
    if (error.message.includes("Incorrect password or email")) {
      return res
        .status(400)
        .json({ status: false, message: "Password atau email salah." });
    }
    return res
      .status(500)
      .json({ status: false, message: "Internal server error." });
  }
};


module.exports.Profile = async (req, res) => {
  try {
    logger.info("Profile::", req.user.full_name);
    const userId = req.user._id;
    const user = await userService.getProfile(userId);

    if (!user) {
      return res.status(404).json({ message: "Pengguna tidak ditemukan" });
    }
    return res.status(200).json({  status: true, data: user });
  } catch (error) {
    logger.error(error.message);
    return res
      .status(500)
      .json({ status: false, message: "Internal server error." });
  }
};

module.exports.UpdateProfile = async (req, res) => {
  try {
    logger.info("UpdateProfile::", req.user.full_name);
    const { _id, email } = req.user;
    const { full_name, gender, phone_number } = req.body;
    const updateFields = { full_name, gender, phone_number, email };
    const updatedUser = await userService.updateProfile(
      _id,
      updateFields,
      req.file,
    );
    return res
      .status(200)
      .json({ status: true, data: updatedUser });
  } catch (error) {
    logger.error(error.message);
    if (error.message.includes("it is undefined")) {
      res.status(400).json({
        status: false,
        message: "There's something wrong with the picture",
      });
    } else {
      return res
        .status(500)
        .json({ status: false, message: "Internal server error." });
    }
  }
};
