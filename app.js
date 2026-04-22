const dotenv = require("dotenv");
const express = require("express");
const noteRouter = require("./routes/note");
const mongoose = require("mongoose");
const applicationRouter = require("./routes/applicationRoute");

// Config
dotenv.config();
const port = process.env.PORT || 5000;
const uri = process.env.URI;

// connecting to db
mongoose.connect(uri)
.then((result) => console.log('connected to db'))
.catch((err) => console.log(err));

const app = express();
app.use(express.json());
app.use(express.urlencoded());


// Setup Routes
app.use("/api/application", noteRouter);
app.use("/api/application", applicationRouter);


// Start server
app.listen(port, () => {
    let url = `http://localhost:${port}`;
    console.log(`Server listening on ${url}`);
})