const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Event title is required'],
      trim: true,
      maxlength: [150, 'Title cannot exceed 150 characters'],
    },
    description: {
      type: String,
      required: [true, 'Event description is required'],
    },
    date: {
      type: Date,
      required: [true, 'Event date is required'],
    },
    venue: {
      type: String,
      required: [true, 'Event venue is required'],
    },
    club: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Club',
      required: true,
    },
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    teamSize: {
      type: Number,
      default: 1,
      min: [1, 'Team size must be at least 1'],
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Registration',
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Event', EventSchema);
