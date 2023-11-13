const User = require("../models/user");

// Add skill
async function addSkill(userId, skillName) {
    try {
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

// Update skill
async function updateSkill(userId, skillId, skillName) {
    try {
        const user = await User.findById(userId);

        if (!user) {
            throw new Error("User not found");
        }

        const skill = user.skills.id(skillId);

        if (!skill) {
            throw new Error("Skill not found");
        }

        skill.set({ name: skillName });

        await user.save();

        return { message: "Skill updated successfully", user: user };
    } catch (error) {
        console.error(error);
        throw new Error("Internal server error");
    }
}

// Delete skill
async function deleteSkill(userId, skillId) {
    try {
        const user = await User.findById(userId);

        if (!user) {
            throw new Error("User not found");
        }

        user.skills.id(skillId).remove();

        await user.save();

        return { message: "Skill deleted successfully", user: user };
    } catch (error) {
        console.error(error);
        throw new Error("Internal server error");
    }
}

module.exports = {
    addSkill,
    updateSkill,
    deleteSkill,
};
