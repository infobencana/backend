const bcrypt = require("bcryptjs");
const { createSecretToken } = require("../util/token.util");
const userRepository = require("../repository/user.repository");
const { uploadImageProfile } = require("../util/gcs.util.js");

async function signupUser(userData) {
  const {
    email,
    password,
    full_name,
    role,
    phone_number,
    photo_profile,
    created_at,
  } = userData;

  const existingUser = await userRepository.findUserByEmail(email);

  if (existingUser) {
    throw new Error("Email already registered");
  }

  const user = await userRepository.createUser({
    email,
    password,
    full_name,
    role,
    phone_number,
    photo_profile,
    created_at,
  });

  const token = createSecretToken(user._id);
  return { token, user };
}

async function loginUser(email, password) {
  const user = await userRepository.findUserByEmail(email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Incorrect password or email");
  }

  const token = createSecretToken(user._id);
  return token;
}

async function getProfile(userId) {
  return await userRepository.getUserProfile(userId);
}

async function updateProfile(userId, updateFields, file) {
  if (file) {
    const { email } = updateFields;
    const sanitizedEmail = email.replace(/[@.]/g, "_");
    const imageUrl = await uploadImageProfile(file, sanitizedEmail);
    updateFields.photo_profile = imageUrl;
  }

  return userRepository.updateUser(userId, updateFields);
}

module.exports = {
  getProfile,
  signupUser,
  loginUser,
  updateProfile,
};
