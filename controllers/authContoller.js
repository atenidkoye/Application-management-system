const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const attachUser = require("../middleware/attachUser");

exports.login = async (req, res, next) => {

    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({email});

    if (!user) {
        res.redirect("/auth/login");
        return;
    }

    if (user.password != password) {
        res.redirect("/auth/login");
        return;
    }

    // Jwt Token
    const token = jwt.sign(
        { id: user._id, email: user.email},
        process.env.JWT_SECRET,
        { expiresIn: "2d"}
    );

    // Store cookie
    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "strict"
    });

    await attachUser(req, res, next);


    res.redirect("/")
}

exports.register = async (req, res, next) => {
    res.redirect("/dashboard")
}