const express = require("express");

const {
  createSubmission,
  getSubmissions,
  reviewSubmission,
} = require("../controllers/submissionController");

const protect = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");

const router = express.Router();

router.post("/", protect, authorizeRoles("trainee"), createSubmission);
router.get("/", protect, getSubmissions);
router.put("/:id", protect, authorizeRoles("trainer"), reviewSubmission);

module.exports = router;