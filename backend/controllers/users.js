const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.createUser = (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(hash => {
        const user = new User({
            email: req.body.email,
            fname: req.body.fname,
            lname: req.body.lname,
            country: req.body.country,
            phone: req.body.phone,
            gender: req.body.gender,
            password: hash,
            date: new Date(),
            role: 'user'
        });
        user
            .save()
            .then(result => {
                res.status(201).json({
                    message: "User created!",
                    result: result
                });
            })
            .catch(err => {
                res.status(500).json({
                    message: "Invalid authentication credentials!" + err
                });
            });
    });
}

exports.userLogin = (req, res, next) => {
    let fetchedUser;
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: "Auth failed"
                });
            }
            fetchedUser = user;
            return bcrypt.compare(req.body.password, user.password);
        })
        .then(result => {
            if (!result) {
                return res.status(401).json({
                    message: "Auth failed"
                });
            }
            const token = jwt.sign(
                { email: fetchedUser.email, userId: fetchedUser._id },
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.KT5qTf9s8yfbXQcJfE29Z4p50ZQdwvWT9kKcXHC4FhM",
                { expiresIn: "30d" }
            );
            res.status(200).json({
                token: token,
                expiresIn: 3600,
                userId: fetchedUser._id
            });
        })
        .catch(err => {
            return res.status(401).json({
                message: "Invalid authentication credentials!" + err
            });
        });
}


exports.getUsers = (req, res, next) => {
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const userQuery = User.find();
    let fetchedUsers;
    if (pageSize && currentPage) {
        userQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
    }
    userQuery
        .then(documents => {
            fetchedUsers = documents;
            return User.count();
        })
        .then(count => {
            res.status(200).json({
                message: "Users fetched successfully!",
                users: fetchedUsers,
                maxUsers: count
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Fetching Users failed!"
            });
        });
};

exports.getUser = (req, res, next) => {
    User.findById(req.params.id)
        .then(user => {
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: "User not found!" });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "Fetching user failed!"
            });
        });
};



exports.updateUser = (req, res, next) => {

    const user = new User({
        id: req.body._id,
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        country: req.body.country,
        phone: req.body.phone,
        gender: req.body.gender,
        password: req.body.password,
        role: req.body.role,
        date: req.body.date
    });
    User.updateOne({ _id: req.body._id }, user)
        .then(result => {
            res.status(200).json({ message: "Update successful!" });

        })
        .catch(error => {
            res.status(500).json({
                message: "Couldn't udpate post!"
            });
        });
};
exports.updatePassword = async (req, res, next) => {
    const userId = req.params.id; // Assuming the user ID is passed in the URL params
    const oldPassword = req.body.oldPassword; // Assuming the old password is sent in the request body
    const newPassword = req.body.newPassword; // Assuming the new password is sent in the request body

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid old password!" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: "Password updated successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Password update failed!", error: error.message });
    }
};