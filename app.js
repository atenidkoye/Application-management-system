const dotenv = require("dotenv");
const express = require("express");
const noteRouter = require("./routes/note");


// Config
dotenv.config();
const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded());


// Setup Routes
app.use("/api/application", noteRouter);


// Start server
app.listen(port, () => {
    let url = `http://localhost:${port}`;
    console.log(`Server listening on ${url}`);
})