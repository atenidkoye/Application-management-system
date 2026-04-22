const express = require("express");
const Application = require("../models/Application")
const applicationRouter = express.Router();

const statusList = ["applied", "interview", "evaluation", "accepted", "rejected"];

applicationRouter.get("/", async (req, res) => {
    try {
        const result = await Application.find();
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(404).json({ msg: "Applications not found"});
    }
});

applicationRouter.get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const application = await Application.findById(id);
        if (application) {
            res.status(200).json(application);
        } else {
            res.status(404).json({ msg: "Application not found"});
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Invalid Id or server error"});
    }
});

applicationRouter.post("/", async (req, res) => {
    if (req.body.name && req.body.position && req.body.status && req.body.source && req.body.applied_at) {
        if (statusList.includes(req.body.status)) {
            const application = new Application({
                name: req.body.name,
                position: req.body.position,
                status: req.body.status,
                source: req.body.source,
                applied_at: req.body.applied_at
            });
            try {
                const result = await application.save();
                res.status(200).json(result);
                console.log(result)
            } catch (err) {
                res.status(500).json({msg: "Server error"});
                console.log(err);
            }
            } else {
                res.status(500).json({msg: "Invalid status"});
            }
        } else {
            res.status(500).json({msg: "Invalid data format"});
        }
    }
);

module.exports = applicationRouter;