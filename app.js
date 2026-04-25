const dotenv = require("dotenv");
const express = require("express");
const exhbs = require ("express-handlebars");
const cookieParser = require("cookie-parser");
const jwt = ("jsonwebtoken");
const mongoose = require("mongoose");
const noteRouter = require("./routes/note");
const applicationRouter = require("./routes/applicationRoute");
const attachUser = require("./middleware/attachUser");

// Config
dotenv.config();
const port = process.env.PORT || 5000;

const app = express();

// Middlewares
app.use(cookieParser())
app.use(attachUser)
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"))
app.use(errorHandler)



// Setting up handlebars
app.engine("handlebars", exhbs.engine({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

//Routes
app.use("/api/application", noteRouter);
app.use("/api/application", applicationRouter);
app.use("/candidates", require("./routes/candidateRoutes"));
app.use("/auth", require("./routes/authRoutes"));
app.use("/candidates", require("./routes/candaidateRoutes"));
app.use("/auth", require("./routes/authRoutes"));


// Check if user is already logged in
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
});


// Home page
app.get("/", (req, res) => {
    if (res.locals.user) { // User logged in -> dashboard
        res.redirect("/dashboard");
    } else { // User is not logged in -> login page
        res.redirect("/auth/login");
    }
});

//Dashboard
// const auth = require("./middleware/auth");
// const Candidate = require("./models/Candidate");

app.get("/dashboard", async(req, res, next) => {
    res.render("dashboard", {
        style: "dashboard"
    });
    // try{
    //     const totalCandidates = await Candidate.countDocuments();

    //     const stats = await application.aggregate([
    //         {$group: { _id: "$status", count: {$sum: 1}}}
    //     ]);

    //     res.render("dashboard", {
    //         totalCandidates,
    //         statusStatus: stats,
    //         isDashboard: true
    //     });
    // } catch (err) {
    //     next(err);
    // }
});

app.get("/auth/:action", async(req, res, next) => {
    const action = req.params.action;
    if (action == "login" || action == "register") {
        res.render(action, {
            style: "auth"
        });
    } else {
        res.status(404).json({msg: "The auth action was not found"})
    }
})

// // Error handler
// app.use(require("./middleware/errorHandler"));


// Start server
mongoose.connect(process.env.MONGO_URL).then(()=> {
    console.log("database connected");

    app.listen(port, () => {
        let url = `http://localhost:${port}`;
        console.log(`Server listening on ${url}`);
    })
}).catch(err => console.log("error in connection", err));
