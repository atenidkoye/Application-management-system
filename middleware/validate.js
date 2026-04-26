module.exports =(schema) => {
    return (req, res, next) => {
        const {error, value} = schema.validate(req.body, {
            stripUknown: true
        });

        if (error) {
            req.flash("error", error.details[0].message);
            return res.redirect(req.headers.referer|| "/" )
        }
        req.body = value;
        next();
    };
};