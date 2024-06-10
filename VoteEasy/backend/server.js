const express = require("express");
const app = express();
const cors = require("cors");
console.log("Your server started");

app.use(cors());

app.use("/", (req, res) => {
    res.send("This is your Vote-easy server.");
});

app.listen(3030);
