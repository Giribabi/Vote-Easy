const mongoose = require("mongoose");

const voteModel = mongoose.Schema(
    {
        voter: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        votedFor: { type: mongoose.Schema.Types.ObjectId, ref: "Candidate" },
    },
    { timestamps: true }
);

const Vote = mongoose.model("Vote", voteModel);

module.exports = Vote;
