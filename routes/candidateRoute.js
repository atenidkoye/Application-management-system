const router = require("express").router();
const ctrl = require("../controllers/candidateController");
const auth = require("../middleware/auth");
const validate = require("../middleware/validate");
const { candidateSchema} = require("../validations/candidateValidation");


// View all Candidates
router.get("/view", auth, ctrl.getAllCandidates);

//Add Candidates
router.get("/add", auth, ctrl.addCandidate);

// Create
router.post("/", auth, validate(candidateSchema), ctrl.create);

// Edit
router.get("/edit/:id", auth, ctrl.editCandidate);

// Delete
router.post("/update/:id", auth, ctrl.updateCandidate);

// Get one
router.get("/:id", auth, ctrl.getOneCandidate);

module.exports = router;