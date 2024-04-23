const User = require("../models/user.model.js");

const registerUserController = async (req, res, next) => {
    try {
      const { name, email, password } = req.body;
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ success: false, message: "Email is already registered. Please log in instead." });
      }
  
      const newUser = await User.create({ name, email, password });
  
      return res.status(201).json({ success: true, message: "User created successfully, Please log in.", newUser });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errorMessage = Object.values(error.errors)[0].message;
            return res.status(400).json({ success: false, message: errorMessage });
        }
        next(error);
    }
};

module.exports = {
  registerUserController,
};
