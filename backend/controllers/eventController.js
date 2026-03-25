const Event = require('../models/Event');
const Club = require('../models/Club');

exports.createEvent = async (req, res) => {
  try {
    console.log("Event create request body:", req.body);
    const { title, description, date, startDate, venue, clubId, club: clubName, teamSize } = req.body;
    
    const identifier = clubId || clubName;
    const eventDate = date || startDate;

    if (!title || !eventDate || !venue || !identifier) {
      return res.status(400).json({ success: false, message: "Title, date, venue, and club are required" });
    }

    // Verify club exists and user is the organizer of the club
    let club;
    if (identifier && identifier.match(/^[0-9a-fA-F]{24}$/)) {
      club = await Club.findById(identifier);
    } else {
      club = await Club.findOne({ name: identifier, organizer: req.user._id });
    }
    if (!club) return res.status(404).json({ success: false, message: 'Club not found' });
    if (club.organizer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Only the club organizer can create events' });
    }

    const event = await Event.create({
      title,
      description: description || 'No description provided',
      date: eventDate,
      venue,
      club: club._id,
      organizer: req.user._id,
      teamSize: teamSize || 1,
      status: 'pending',
    });

    res.status(201).json({ success: true, message: 'Event created and pending admin approval', data: event });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.getMyEvents = async (req, res) => {
  try {
    const events = await Event.find({ organizer: req.user._id }).populate('club', 'name');
    res.status(200).json({ success: true, data: events });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.getApprovedEvents = async (req, res) => {
  try {
    const events = await Event.find({ status: 'approved' }).populate('club', 'name').populate('organizer', 'name');
    res.status(200).json({ success: true, data: events });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('club', 'name').populate('organizer', 'name');
    if (!event) return res.status(404).json({ success: false, message: 'Event not found' });
    res.status(200).json({ success: true, data: event });
  } catch (err) {
    res.status(400).json({ success: false, message: 'Invalid ID' });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ success: false, message: 'Event not found' });

    if (event.organizer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to edit this event' });
    }

    if (event.status !== 'pending') {
      return res.status(400).json({ success: false, message: 'Cannot edit an event after it has been approved or rejected' });
    }

    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.status(200).json({ success: true, message: 'Event updated successfully', data: updatedEvent });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ success: false, message: 'Event not found' });

    if (event.organizer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this event' });
    }

    await event.deleteOne();
    res.status(200).json({ success: true, message: 'Event deleted successfully' });
  } catch (err) {
    res.status(400).json({ success: false, message: 'Invalid ID' });
  }
};
