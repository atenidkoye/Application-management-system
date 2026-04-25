const jwt = require("jsonwebtoken");

exports.login = async (req, res) =>{
    const user = await UserActivation.findOne({ email: req.body.email});

    // Validate user
    const token = jwt.sign(
            {
            id: user._id, email: user.email},
            process.env.JWT_SECRET,
            { expiresIn: "1d"}
    );

    // Store cookie
    res.cookie("token", token, { httpOnly: true});

    res.redirect("/dashboard");

}