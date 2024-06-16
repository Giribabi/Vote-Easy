const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

const dotenv = require("dotenv");
dotenv.config();

console.log("Your server started");

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.dhfzlml.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

async function run() {
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("You successfully connected to MongoDB!");
    } catch (error) {
        console.log(error);
    }
}
run().catch(console.dir);

app.use("/", (req, res) => {
    res.send("This is your Vote-easy server.");
});

app.listen(3030);
