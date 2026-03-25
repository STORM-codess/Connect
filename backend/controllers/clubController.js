const Club = require('../models/Club');
const User = require('../models/User');

exports.createClub = async (req, res) => {
  try {
    const { name, description, category } = req.body;
    const club = await Club.create({
      name,
      description,
      category,
      organizer: req.user._id,
      verified: false,
    });
    res.status(201).json({ success: true, message: 'Club created. Waiting for admin approval.', data: club });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.getAllClubs = async (req, res) => {
  try {
    const clubs = await Club.find({ verified: true }).populate('organizer', 'name email');
    res.status(200).json({ success: true, data: clubs });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.getClubById = async (req, res) => {
  try {
    const club = await Club.findById(req.params.id)
      .populate('organizer', 'name email')
      .populate('followers', 'name');
    if (!club) return res.status(404).json({ success: false, message: 'Club not found' });
    res.status(200).json({ success: true, data: club });
  } catch (err) {
    res.status(400).json({ success: false, message: 'Invalid ID' });
  }
};

exports.followClub = async (req, res) => {
  try {
    const club = await Club.findById(req.params.id);
    if (!club) return res.status(404).json({ success: false, message: 'Club not found' });
    
    // Check if already following
    if (club.followers.includes(req.user._id)) {
      return res.status(400).json({ success: false, message: 'Already following this club' });
    }

    club.followers.push(req.user._id);
    await club.save();

    res.status(200).json({ success: true, message: 'Successfully followed the club', data: club });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
