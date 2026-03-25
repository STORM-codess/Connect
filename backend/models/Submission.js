const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true, // The user or team leader making the submission
    },
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
    },
    githubLink: {
      type: String,
      trim: true,
      default: '',
    },
    demoLink: {
      type: String,
      trim: true,
      default: '',
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Optional: ensure user can only submit once per event
SubmissionSchema.index({ event: 1, user: 1 }, { unique: true });

module.exports = mongoose.model('Submission', SubmissionSchema);
