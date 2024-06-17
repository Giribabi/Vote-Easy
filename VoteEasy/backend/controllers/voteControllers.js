const asyncHandler = require("express-async-handler");
const Vote = require("../models/voteModel");
const User = require("../models/userModel");

const castVote = asyncHandler(async (req, res) => {
    const { voterId, votedFor } = req.body;
    if (!voterId || !votedFor) {
        res.status(400);
        throw new Error("Invalid vote, submit the details correctly");
    }
    const userExists = await User.findOne({ _id: voterId });
    const voteCasted = await Vote.findOne({ voterId });
    if (!userExists) {
        res.status(400);
        throw new Error("No such user, vote unsuccessful");
    }
    if (voteCasted) {
        res.status(400);
        throw new Error("Vote casted already");
    }
    const newVote = await Vote.create({
        voterId,
        votedFor,
    });
    console.log(newVote);
    if (newVote) {
        res.status(201).json({
            votedFor: newVote.votedFor,
            voterId: newVote.voterId,
        });
        // .json("Vote casted successfully🎊");
    } else {
        res.status(400);
        throw new Error("Vote unsuccessful, contact the admin");
    }
});

module.exports = { castVote };
