const User = require("../models/user");

// Add education
async function addEducation(userId, educationData) {
    try {
        const user = await User.findById(userId);

        if (!user) {
            throw new Error("User not found");
        }

        user.education.push(educationData);

        await user.save();

        return { message: "Education added successfully", user: user };
    } catch (error) {
        console.error(error);
        throw new Error("Internal server error");
    }
}

// Update education
async function updateEducation(userId, educationId, educationData) {
    try {
        const user = await User.findById(userId);

        if (!user) {
            throw new Error("User not found");
        }

        const education = user.education.id(educationId);

        if (!education) {
            throw new Error("Education not found");
        }

        education.set(educationData);

        await user.save();

        return { message: "Education updated successfully", user: user };
    } catch (error) {
        console.error(error);
        throw new Error("Internal server error");
    }
}

// Delete education
async function deleteEducation(userId, educationId) {
    try {
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

module.exports = {
    addEducation,
    updateEducation,
    deleteEducation,
};
