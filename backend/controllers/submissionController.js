const Submission = require('../models/Submission');
const Registration = require('../models/Registration');
const Event = require('../models/Event');

exports.submitProject = async (req, res) => {
  try {
    const { title, description, githubLink, demoLink } = req.body;
    const eventId = req.params.eventId;

    // Check if user is registered
    const isRegistered = await Registration.findOne({ event: eventId, user: req.user._id });
    if (!isRegistered) {
      return res.status(403).json({ success: false, message: 'You must be registered for the event to submit a project' });
    }

    // Check if already submitted
    const existingSubmission = await Submission.findOne({ event: eventId, user: req.user._id });
    if (existingSubmission) {
      return res.status(400).json({ success: false, message: 'You have already submitted a project for this event' });
    }

    const submission = await Submission.create({
      event: eventId,
      user: req.user._id,
      title,
      description,
      githubLink,
      demoLink,
    });

    res.status(201).json({ success: true, message: 'Project submitted successfully', data: submission });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.getSubmissions = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ success: false, message: 'Event not found' });

    // Only organizer or admin
    if (event.organizer.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to view submissions' });
    }

    const submissions = await Submission.find({ event: eventId })
      .populate('user', 'name email enrollNo');

    res.status(200).json({ success: true, data: submissions });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
