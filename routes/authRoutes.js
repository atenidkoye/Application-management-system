const router = require("express").Router();
const ctrl = require("../controllers/authContoller");


// Show Login
router.get("/login", (req, res) => {
    res.render("login")
});

//Login
router.post("/login", ctrl.login);

// Show Register
router.get("/register", (req, res) => {
    res.render("register")
})

// Register
router.post("/register", ctrl.register);

// Logout
router.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.redirect("/auth/login");
})