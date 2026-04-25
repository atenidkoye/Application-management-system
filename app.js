const dotenv = require("dotenv");
const express = require("express");
const exhbs = require ("express-handlebars");
const cookieParser = require("cookie-parser");
const auth = require("./middleware/auth")
const mongoose = require("mongoose");
const noteRouter = require("./routes/note");
const applicationRouter = require("./routes/applicationRoute");
const attachUser = require("./middleware/attachUser");
const errorHandler = require("./middleware/errorHandler");
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
app.use("/api/notes", noteRouter);
app.use("/candidates", require("./routes/candidateRoutes"));
app.use("/auth", require("./routes/authRoutes"));




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
// // Error handler
app.use(errorHandler);


// Start server
mongoose.connect(process.env.MONGO_URL).then(()=> {
    console.log("database connected");

    app.listen(port, () => {
        let url = `http://localhost:${port}`;
        console.log(`Server listening on ${url}`);
    })
}).catch(err => console.log("error in connection", err));
