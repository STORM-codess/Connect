const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');
const { createClub, getAllClubs, getClubById, followClub } = require('../controllers/clubController');

router.post('/create', protect, authorize('organizer'), createClub);
router.get('/', getAllClubs);
router.get('/:id', getClubById);
router.post('/follow/:id', protect, authorize('student'), followClub);

module.exports = router;
