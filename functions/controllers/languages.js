const User = require("../models/user");

// Add language
async function addLanguage(userId, languageData) {
    try {
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

// Update language
async function updateLanguage(userId, languageId, languageData) {
    try {
        const user = await User.findById(userId);

        if (!user) {
            throw new Error("User not found");
        }

        const language = user.languages.id(languageId);

        if (!language) {
            throw new Error("Language not found");
        }

        language.set(languageData);

        await user.save();

        return { message: "Language updated successfully", user: user };
    } catch (error) {
        console.error(error);
        throw new Error("Internal server error");
    }
}

// Delete language
async function deleteLanguage(userId, languageId) {
    try {
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

module.exports = {
    addLanguage,
    updateLanguage,
    deleteLanguage,
};
