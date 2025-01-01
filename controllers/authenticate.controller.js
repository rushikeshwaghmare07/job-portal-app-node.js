const User = require("../models/user.model.js");

const registerUserController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "Email is already registered. Please log in instead." });
    }

    const newUser = await User.create({ name, email, password });

    // token
    const token = await newUser.createJWT();

    return res
      .status(201)
      .json({
        success: true,
        message: "User created successfully, Please log in.",
        newUser,
        token,
      });
  } catch (error) {
    if (error.name === "ValidationError") {
      const errorMessage = Object.values(error.errors)[0].message;
      return res.status(400).json({ success: false, message: errorMessage });
    }
    next(error);
  }
};

const loginUserController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Username or Password" });
    }

    //compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Username or Password" });
    }

    user.password = undefined;
    const token = user.createJWT();
    return res
      .status(200)
      .json({ success: true, message: "Login Successfully", user, token });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUserController,
  loginUserController,
};
