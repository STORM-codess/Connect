const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');
const { submitProject, getSubmissions } = require('../controllers/submissionController');

router.post('/:eventId', protect, authorize('student'), submitProject);
router.get('/:eventId', protect, authorize('organizer', 'admin'), getSubmissions);

module.exports = router;
