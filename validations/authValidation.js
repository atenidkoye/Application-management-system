const joi = require("joi");


//Register
exports.registerSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    confirmPassword: joi.ref("passwrd")
});

//Login
exports.loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
})