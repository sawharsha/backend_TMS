const Submission = require('../models/submission');

// Create a new submission
export const createSubmission = async (req, res) => {
    try {
        const { taskId,
                comment,
                fileUrl
         } = req.body;
         const submission = await Submission.create({
            taskId,
            traineeId : req.user._id,
            fileUrl,
            comment
         });
        res.status(201).json(submission);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get submissions for a task
export const getSubmissions= async (req, res) => {
    try {
        let submissions;
        if (req.user.role === 'trainer') {
            submissions = await Submission.find().populate('taskId')
                .populate('traineeId', 'name email');
        } else {
            submissions = await Submission.find({ traineeId: req.user._id });
        }
        res.status(200).json(submissions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Review submission status

export const reviewSubmission = async (req, res) => {
    try {
        const submission = await Submission.findById(req.params.id);
        if (!submission) {
            return res.status(404).json({ message: 'Submission not found' });
        }
        submission.status = req.body.status;
        const updated = await submission.save();
        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
