const Candidate = require("../models/Candidate");
const sendEmail = require("../utils/nodemailer");


// Get All Candidates
exports.getAllCandidates = async(req, res, next) => {
    try {
        const candidates = await Candidate.find();
        res.render("candidates", { candidates });
    } catch (err) {
        next(err);
    }
};

// Get One Candidate
exports.getOneCandidate = async (req, res, next) => {
    try {
        const candidate = await Candidate.findById(req.params.id);

        if (!candidate) {
            req.flash("error", "Candidate not found");
            return res.redirect("/views/candidates")
        }

        res.render("candidateDetails", { candidate });
    }catch (err){
        next(err);
    }
};

// Add Form
exports.addCandidate = (req, res) => {
    res.render("addCandidate");
};

//Create Add Form
exports.create = async (req, res, next) => {
    try {
        req.body.skills = req.body.skills
        ? req.body.skills.split(",").map(s => s.trim())
        : [];

        const itExists = await Candidate.findOne({email: req.body.email});
        if (itExists) {
            req.flash("error", "Invalid request");
            return res.redirect("/candidates/add");
        }

        const candidate = await Candidate.create(req.body);

        // Email Notification
        sendEmail(
            candidate.email,
            "Welcome",
            `Hello ${candidate.name}, your profile has been created successfuly.`
        ).catch(err => console.log("Email error", err.message));

        req.flash("success", "Candidate created successfully");
        res.redirect("/views/candidates");
    } catch (err) {
        next(err);
    }
};

// Edit Form
exports.editCandidate = async (req, res, next) => {
    try {
        const candidate = await Candidate.findById(req.params.id);

        if (!candidate) {
            req.flash("error", "Candidate not found");
            return res.redirect("/views/candidates");
        }

        res.render("editCandidate", { candidate });
    }catch (err){
        next(err);
    }
};

//Update Form
exports.updateCandidate = async (req, res, next) => {
    try {
        req.body.skills = req.body.skills
        ? req.body.skills.split(",").map(s => s.trim())
        : [];

        const exists = await Candidate.findOne({
            email: req.body.email,
            _id: { $ne: req.params.id}
        });

        if (exists) {
            req.flash("error", "Invalid Request");
            return res.redirect(`/views/edit/${req.params.id}`);
        }

        const Updated = await Candidate.findByIdUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!this.updateForm) {
            req.flash("error", "Candidate not found");
            return res.redirect("/views/candidates")
        }

        req.flash("success", "Candidate updated");
        res.redirect("/views/candidates")
    } catch(err) {
        next(err);
    }
};

// Delete Form
exports.deleteForm = async (req, res, next) => {
    try{
        const deleted = await Candidate.findByAndDelete(req.params.id);

        if (!deleted) {
            req.flash("error", "Candidate not found");
            return res.redirect("/views/candidates");
        }

        req.flash("success", "Candidate deleted successfully");
        res.redirect("/views/candidates");
    } catch (err) {
        next(err);
    }
};