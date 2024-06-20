const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const currentUser = await User.findOne({ email });
    if (currentUser && (await currentUser.matchPassword(password))) {
        res.json({
            _id: currentUser._id,
            email: currentUser.email,
            token: generateToken(currentUser._id),
        });
    } else {
        res.status(401);
        throw new Error("Check your login credentials");
    }
});

const registerUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("Enter all the fields");
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("User exists");
    }
    const newUser = await User.create({
        email,
        password,
    });
    if (newUser) {
        res.status(201).json({
            _id: newUser._id,
            email: newUser.email,
            token: generateToken(newUser._id),
        });
    } else {
        res.status(400);
        throw new Error("Failed to create user");
    }
});

module.exports = { registerUser, authUser };
