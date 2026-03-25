const mongoose = require('mongoose');

const RegistrationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
    },
    teamId: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: ['registered', 'cancelled'],
      default: 'registered',
    },
  },
  { timestamps: true }
);

// Prevent duplicate registrations for the same event by the same user
RegistrationSchema.index({ event: 1, user: 1 }, { unique: true });

module.exports = mongoose.model('Registration', RegistrationSchema);
