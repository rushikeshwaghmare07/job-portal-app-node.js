const User = require("../models/user.model.js");

const registerUserController = async (req, res) => {
    try {
      const { name, email, password } = req.body;
      
      if (!name) {
        return res.status(400).json({ success: false, message: "Please provide your name." });
      }
      if (!email) {
        return res.status(400).json({ success: false, message: "Please provide your email." });
      }
      if (!password) {
        return res.status(400).json({ success: false, message: "Please provide your password." });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ success: false, message: "Email is already registered. Please log in instead." });
      }
  
      const newUser = await User.create({ name, email, password });
  
      return res.status(201).json({ success: true, message: "User created successfully, Please log in.", newUser });
    } catch (error) {
      console.error("Error in register controller:", error);
      if (error.name === 'ValidationError' && error.errors['email']) {
        return res.status(400).json({ success: false, message: error.errors['email'].message });
    }
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

module.exports = {
  registerUserController,
};
