const User = require("../models/user.model");

const updateUserController = async (req, res, next) => {
    try {
        const { name, email, lastName, location } = req.body;
        if (!name || !email || !lastName || !location) {
            return res.status(400).json({ success: false, message: "Please provide all fields" });
        }

        const user = await User.findOne({ _id: req.user.userId });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        user.name = name;
        user.lastName = lastName;
        user.email = email;
        user.location = location;

        await user.save();

        const token = user.createJWT();

        res.status(200).json({ success: true, user, token });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    updateUserController
}