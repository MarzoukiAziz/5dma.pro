const User = require("../models/user");

// Add skill
exports.addSkill = async (req, res) => {
    try {
        const skillName = req.params.skillName;
        const userId = req.params.userId;

        const user = await User.findById(userId);

        if (!user) {
            throw new Error("User not found");
        }

        user.skills.push({ name: skillName });

        await user.save();

        return { message: "Skill added successfully", user: user };
    } catch (error) {
        console.error(error);
        throw new Error("Internal server error");
    }
}

// Delete skill
exports.deleteSkill = async (req, res) => {
    try {
        const skillName = req.params.skillName;
        const userId = req.params.userId;

        const user = await User.findById(userId);

        if (!user) {
            throw new Error("User not found");
        }

        user.skills.remove(skillName);

        await user.save();

        return { message: "Skill deleted successfully", user: user };
    } catch (error) {
        console.error(error);
        throw new Error("Internal server error");
    }
}

