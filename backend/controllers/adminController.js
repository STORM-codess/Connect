const Club = require('../models/Club');
const Event = require('../models/Event');
const User = require('../models/User');
const Registration = require('../models/Registration');

exports.verifyClub = async (req, res) => {
  try {
    const club = await Club.findById(req.params.id);
    if (!club) return res.status(404).json({ success: false, message: 'Club not found' });

    club.verified = true;
    await club.save();

    res.status(200).json({ success: true, message: 'Club verified successfully', data: club });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.approveEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ success: false, message: 'Event not found' });

    event.status = 'approved';
    await event.save();

    res.status(200).json({ success: true, message: 'Event approved', data: event });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.rejectEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ success: false, message: 'Event not found' });

    event.status = 'rejected';
    await event.save();

    res.status(200).json({ success: true, message: 'Event rejected', data: event });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.getDashboardAnalytics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalClubs = await Club.countDocuments();
    const totalEvents = await Event.countDocuments();
    const activeEvents = await Event.countDocuments({ status: 'approved' });
    const totalRegistrations = await Registration.countDocuments();

    // Fetch the detailed lists required for the Admin Dashboard UI
    const pendingEvents = await Event.find({ status: 'pending' }).populate('club', 'name').populate('organizer', 'name');
    const pendingClubs = await Club.find({ verified: false }).populate('organizer', 'name');
    const allClubs = await Club.find().populate('organizer', 'name');

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalClubs,
        totalEvents,
        activeEvents,
        totalRegistrations,
        pendingEvents,
        pendingClubs,
        allClubs
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
