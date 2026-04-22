const jwt = ("jsonwebtoken");

exports.login = async (req, res) =>{
    const user = await UserActivation.findOne({ emaail: req.body.email});

    // Validate user
    const token = jwt.substring(
        {
            id: user._id, email: user.email},
            process.env.JWT_SECRET,
            { expiresIn: "1d"}
    );

    // Store cookie
    res.cookie("token", token, { httpOnly: true});

    res.redirect("/dashbaord");

}