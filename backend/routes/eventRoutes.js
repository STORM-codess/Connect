const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');
const { createEvent, getApprovedEvents, getEventById, updateEvent, deleteEvent } = require('../controllers/eventController');

router.post('/create', protect, authorize('organizer'), createEvent);
router.get('/', getApprovedEvents);
router.get('/:id', getEventById);
router.put('/:id', protect, authorize('organizer'), updateEvent);
router.delete('/:id', protect, authorize('organizer'), deleteEvent);

module.exports = router;
