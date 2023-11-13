const User = require("../models/user");

// Add language
exports.addLanguage = async (req, res) => {
    try {
        const userId = req.params.userId;
        const languageData = req.body;

        const user = await User.findById(userId);

        if (!user) {
            throw new Error("User not found");
        }

        user.languages.push(languageData);

        await user.save();

        return { message: "Language added successfully", user: user };
    } catch (error) {
        console.error(error);
        throw new Error("Internal server error");
    }
}

// Delete language
exports.deleteLanguage = async (req, res) => {
    try {
        const userId = req.params.userId;
        const languageId = req.params.languageId;
        const user = await User.findById(userId);

        if (!user) {
            throw new Error("User not found");
        }

        user.languages.id(languageId).remove();

        await user.save();

        return { message: "Language deleted successfully", user: user };
    } catch (error) {
        console.error(error);
        throw new Error("Internal server error");
    }
}