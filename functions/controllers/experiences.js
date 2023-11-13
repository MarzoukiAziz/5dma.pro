const User = require("../models/user");

// Add experience
exports.addExperience = async (req, res) => {
    try {
        const userId = req.params.userId;
        const { title, company, location, monthStart, monthEnd, yearStart, yearEnd, role } = req.body;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.experience.push({
            title,
            company,
            location,
            monthStart,
            monthEnd,
            yearStart,
            yearEnd,
            role,
        });

        await user.save();

        res.status(201).json({ message: "Experience added successfully", user: user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Update experience
exports.updateExperience = async (req, res) => {
    try {
        const userId = req.params.userId;
        const experienceId = req.params.experienceId;
        const { title, company, location, monthStart, monthEnd, yearStart, yearEnd, role } = req.body;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const experience = user.experience.id(experienceId);

        if (!experience) {
            return res.status(404).json({ message: "Experience not found" });
        }

        experience.set({
            title,
            company,
            location,
            monthStart,
            monthEnd,
            yearStart,
            yearEnd,
            role,
        });

        await user.save();

        res.status(200).json({ message: "Experience updated successfully", user: user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Delete experience
exports.deleteExperience = async (req, res) => {
    try {
        const userId = req.params.userId;
        const experienceId = req.params.experienceId;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.experience.id(experienceId).remove();

        await user.save();

        res.status(200).json({ message: "Experience deleted successfully", user: user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

