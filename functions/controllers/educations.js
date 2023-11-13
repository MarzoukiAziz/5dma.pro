const User = require("../models/user");

// Add education
exports.addEducation = async (req, res) => {
    try {
        const userId = req.params.userId;
        const data = req.body;

        const user = await User.findById(userId);

        if (!user) {
            throw new Error("User not found");
        }

        user.education.push(data);

        await user.save();

        return { message: "Education added successfully", user: user };
    } catch (error) {
        console.error(error);
        throw new Error("Internal server error");
    }
}

// Update education
exports.putEducation = async (req, res) => {
    try {

        const userId = req.params.userId;
        const educationId = req.params.educationId;
        const data = req.body;

        const user = await User.findById(userId);

        if (!user) {
            throw new Error("User not found");
        }

        const education = user.education.id(educationId);

        if (!education) {
            throw new Error("Education not found");
        }

        education.set(data);

        await user.save();

        return { message: "Education updated successfully", user: user };
    } catch (error) {
        console.error(error);
        throw new Error("Internal server error");
    }
}

// Delete education
exports.deleteEducation = async (req, res) => {
    try {
        const userId = req.params.userId;
        const educationId = req.params.educationId;

        const user = await User.findById(userId);

        if (!user) {
            throw new Error("User not found");
        }

        user.education.id(educationId).remove();

        await user.save();

        return { message: "Education deleted successfully", user: user };
    } catch (error) {
        console.error(error);
        throw new Error("Internal server error");
    }
}

