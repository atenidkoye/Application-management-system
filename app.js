const dotenv = require("dotenv");
const express = require("express");
const hbs = require ("hbs");
const cookieParser = require("cookie parser");
const jwt = ("jsonwebtoken");
const mongoose = require("mongoose");
const noteRouter = require("./routes/note");


// Config
dotenv.config();
const port = process.env.PORT || 5000;

const app = express();

// Middlewares
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"))


// View Engine
app.set("view engine", "hbs");

//Routes
app.use("/api/application", noteRouter);
app.use("/candidates", require("./routes/candaidateRoutes"));
app.use("/applications", require("./routes/applicationRoutes"));
app.use("/auth", require("./routes/authRoutes"));


// Users Available in views
app.use((req, res, next) =>{
    const token = req.cookies.token;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            res.locals.user = decoded;
        } catch{
            res.locals.user = null;
        }
    } else {
        res.locals.user = null;
    }

    next();
})











// Start server
app.listen(port, () => {
    let url = `http://localhost:${port}`;
    console.log(`Server listening on ${url}`);
})