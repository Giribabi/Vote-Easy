const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

const dotenv = require("dotenv");
dotenv.config();

//intercepting the request to json format is very important, or else the req.body will be undefined.
app.use(express.json());

const mongoose = require("mongoose");

const userRoutes = require("./routes/userRoutes");
const candidateRoutes = require("./routes/candidateRoutes");
const voteRoutes = require("./routes/votesRoutes");

console.log("Your server started");

// const { MongoClient, ServerApiVersion } = require("mongodb");
// const uri = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.dhfzlml.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// const client = new MongoClient(uri, {
//     serverApi: {
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true,
//     },
// });

// async function run() {
//     try {
//         await client.connect();
//         await client.db("admin").command({ ping: 1 });
//         app.use("/api/user", userRoutes);
//         console.log("You successfully connected to MongoDB!");
//     } catch (error) {
//         console.log(error);
//     }
// }
// run().catch(console.dir);
async function connectDB() {
    try {
        const connection = await mongoose.connect(
            `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.dhfzlml.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
        );
    } catch (err) {
        console.log(`Error: ${err.message}`);
    } finally {
        console.log("Successfully connected to MongoDB");
    }
}
connectDB();

app.use("/api/user", userRoutes);
app.use("/api/candidate", candidateRoutes);
app.use("/api/vote", voteRoutes);

app.listen(3030);
