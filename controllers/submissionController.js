const Submission = require("../models/submission");

const createSubmission = async (req, res) => {
  try {
    const { taskId, fileUrl, comment } = req.body;

    const existingSubmission = await Submission.findOne({
      taskId,
      traineeId: req.user._id,
    });

    // If already submitted or approved, do not allow another submit
    if (
      existingSubmission &&
      (existingSubmission.status === "submitted" ||
        existingSubmission.status === "approved")
    ) {
      return res.status(400).json({
        message: "You have already submitted this task",
      });
    }

    // If rejected, allow resubmission by updating old record
    if (existingSubmission && existingSubmission.status === "rejected") {
      existingSubmission.fileUrl = fileUrl;
      existingSubmission.comment = comment;
      existingSubmission.status = "submitted";

      const updatedSubmission = await existingSubmission.save();

      return res.status(200).json(updatedSubmission);
    }

    const submission = await Submission.create({
      taskId,
      traineeId: req.user._id,
      fileUrl,
      comment,
      status: "submitted",
    });

    res.status(201).json(submission);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getSubmissions = async (req, res) => {
  try {
    let submissions;

    if (req.user.role === "trainer") {
      submissions = await Submission.find()
        .populate("taskId")
        .populate("traineeId", "name email");
    } else {
      submissions = await Submission.find({ traineeId: req.user._id })
        .populate("taskId");
    }

    res.json(submissions);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const reviewSubmission = async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);

    if (!submission) {
      return res.status(404).json({
        message: "Submission not found",
      });
    }

    submission.status = req.body.status;

    const updatedSubmission = await submission.save();

    res.json(updatedSubmission);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createSubmission,
  getSubmissions,
  reviewSubmission,
};