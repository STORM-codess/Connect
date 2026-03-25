const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');
const { registerForEvent, getParticipants } = require('../controllers/registrationController');

router.post('/:id/register', protect, authorize('student'), registerForEvent);
router.get('/:id/participants', protect, authorize('organizer', 'admin'), getParticipants);

module.exports = router;
