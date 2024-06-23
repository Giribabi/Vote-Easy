const asyncHandler = require("express-async-handler");
const Vote = require("../models/voteModel");
const User = require("../models/userModel");

const castVote = asyncHandler(async (req, res) => {
    const { voterId, votedFor } = req.body;
    if (!voterId || !votedFor) {
        res.status(400).json({
            message: "Invalid vote, submit the details correctly",
        });
    }
    const userExists = await User.findOne({ _id: voterId });
    const voteCasted = await Vote.findOne({ voterId });

    if (!userExists) {
        res.status(400).json({
            message: "No such user, vote unsuccessful",
        });
    }
    if (voteCasted) {
        res.status(400).json({
            message: "Vote casted already",
        });
    }
    const newVote = await Vote.create({
        voterId,
        votedFor,
    });

    if (newVote) {
        res.status(201).json({
            votedFor: newVote.votedFor,
        });
    } else {
        res.status(400).json({
            message: "Vote unsuccessful, contact the admin",
        });
    }
});

const voteCount = asyncHandler(async (req, res) => {
    const results = await Vote.aggregate([
        {
            $group: {
                _id: "$votedFor",
                count: { $sum: 1 },
            },
        },
        {
            $lookup: {
                from: "candidates",
                localField: "_id",
                foreignField: "name",
                as: "candidateDetails",
            },
        },
        {
            $unwind: "$candidateDetails",
        },
        {
            $group: {
                _id: "$candidateDetails.allianceName",
                totalVotes: { $sum: "$count" },
            },
        },
    ]);
    res.send(results);
});

module.exports = { castVote, voteCount };
