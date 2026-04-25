const jwt = require("jsonwebtoken");
const Candidate = require("../models/Candidate");


exports.login = async (req, res, next) =>{
    try{
        const {email} = req.body;

        // Find User
        const user = await Candidate.findOne({email});

        if(!user){
            req.flash("error", "User not found");
            return res.redirect("/auth/login");
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

    res.redirect("/dashboard");
    } catch(err){
        next(err);
    }

}