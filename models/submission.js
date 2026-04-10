const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
    taskId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
    },
    traineeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',    
    },

    fileUrl: {
        type: String,
    },

    comment: {
        type: String,
    },

    status: {
        type: String,
        enum: ['submitted', 'approved', 'rejected'],
        default: 'submitted'
    },
}, { timestamps: true });

const Submission = mongoose.model('Submission', submissionSchema);

module.exports = Submission;