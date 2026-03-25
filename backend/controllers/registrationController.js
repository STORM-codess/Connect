const Registration = require('../models/Registration');
const Event = require('../models/Event');

exports.registerForEvent = async (req, res) => {
  try {
    const { teamId } = req.body;
    const eventId = req.params.id;

    const event = await Event.findById(eventId);
    if (!event || event.status !== 'approved') {
      return res.status(404).json({ success: false, message: 'Approved event not found' });
    }

    // Checking duplicate is handled by Mongoose unique index, but we can do a manual check for cleaner errors
    const existing = await Registration.findOne({ event: eventId, user: req.user._id });
    if (existing) {
      return res.status(400).json({ success: false, message: 'You are already registered for this event' });
    }

    const registration = await Registration.create({
      event: eventId,
      user: req.user._id,
      teamId: teamId || null,
      status: 'registered'
    });

    // Add regression to Event's participants array
    event.participants.push(registration._id);
    await event.save();

    res.status(201).json({ success: true, message: 'Successfully registered', data: registration });
  } catch (err) {
    if (err.code === 11000) {
       return res.status(400).json({ success: false, message: 'You are already registered for this event' });
    }
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.getParticipants = async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ success: false, message: 'Event not found' });

    // Only event organizer or admin can see participants
    if (event.organizer.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to view participants' });
    }

    const registrations = await Registration.find({ event: eventId })
      .populate('user', 'name email enrollNo branch year');
      
    res.status(200).json({ success: true, data: registrations });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
