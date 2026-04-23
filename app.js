const dotenv = require("dotenv");
const express = require("express");
const exhbs = require ("express-handlebars");
const cookieParser = require("cookie-parser");
const jwt = ("jsonwebtoken");
const mongoose = require("mongoose");
const noteRouter = require("./routes/note");
const applicationRouter = require("./routes/applicationRoute");

// Config
dotenv.config();
const port = process.env.PORT || 5000;

const app = express();

// Middlewares
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"))


// Setting up handlebars
app.engine("handlebars", exhbs.engine());
app.set("view engine", "handlebars");

//Routes
app.use("/api/application", noteRouter);
app.use("/api/application", applicationRouter);
// app.use("/candidates", require("./routes/candaidateRoutes"));
// app.use("/auth", require("./routes/authRoutes"));


// // Users Available in views
// app.use((req, res, next) =>{
//     const token = req.cookies.token;

//     if (token) {
//         try {
//             const decoded = jwt.verify(token, process.env.JWT_SECRET);
//             res.locals.user = decoded;
//         } catch{
//             res.locals.user = null;
//         }
//     } else {
//         res.locals.user = null;
//     }

//     next();
// });


// // Home page
// app.get("/", (req, res) => {
//     res.redirect("/dashboard");
// });


// //Dashboard
// const auth = require("/middleware/auth");
// const Candidate = require("/models/Candidate");
// const auth = require("/models/Applications");

// app.get("/dashboard", auth, async(req, res, next) => {
//     try{
//         const totalCandidates = await Candidate.countDocuments();

//         const stats = await application.aggregate([
//             {$group: { _id: "$status", count: {$sum: 1}}}
//         ]);

//         res.render("dashboard", {
//             totalCandidates,
//             statusStatus: stats,
//             isDashboard: true
//         });
//     } catch (err) {
//         next(err);
//     }
// });

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
