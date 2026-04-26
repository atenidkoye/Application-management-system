const dotenv = require("dotenv");
const express = require("express");
const exhbs = require ("express-handlebars");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");


// Middleware
const auth = require("./middleware/auth");
const attachUser = require("./middleware/attachUser");
const errorHandler = require("./middleware/errorHandler");


// Routes
const noteRouter = require("./routes/note");
const applicationRouter = require("./routes/applicationRoute");
const candidateRouter = require("./routes/candidateRoute");
const authRouter = require("./routes/authRoutes");


// Models
const Candidate = require("./models/Candidate");
const Application = require("./models/Application");

// Config
dotenv.config();
const port = process.env.PORT || 5000;

const app = express();

// Middlewares
app.use(cookieParser());
app.use(attachUser);
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"))



// Setting up handlebars
app.engine("handlebars", exhbs.engine({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

//Routes
app.use("/api/applications", applicationRouter);
app.use("/api/applications", noteRouter);
app.use("/candidates", candidateRouter);
app.use("/auth", authRouter);


// Home page
app.get("/", (req, res) => {
    if (res.locals.user) { // User logged in -> dashboard
        res.redirect("/dashboard");
    } else { // User is not logged in -> login page
        res.redirect("/auth/login");
    }
});

//Dashboard
app.get("/dashboard", auth, async(req, res, next) => {
    try{
        const totalCandidates = await Candidate.countDocuments();

        const stats = await Application.aggregate([
            {$group: { _id: "$status", count: {$sum: 1}}}
        ]);

        res.render("dashboard", {
        totalCandidates,
            statusStats: stats,
            isDashboard: true
        });
    } catch (err) {
        next(err);
    }
});

// Error handler
app.use(errorHandler);


// Start server
mongoose.connect(process.env.MONGO_URL).then(()=> {
    console.log("Database successfully connected.");
    console.log("--------------------------------");

    app.listen(port, () => {
        let url = `http://localhost:${port}`;
        console.log(`Server listening on ${url}`);
    })

}).catch(err => console.log("error in connection", err));
