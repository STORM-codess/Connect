const mongoose = require('mongoose');

const ClubSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Club name is required'],
      trim: true,
      unique: true,
      maxlength: [100, 'Club name cannot exceed 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Club description is required'],
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    category: {
      type: String,
      enum: ['technical', 'cultural', 'sports'],
      required: [true, 'Club category is required (technical, cultural, or sports)'],
    },
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Club', ClubSchema);
