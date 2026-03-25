const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');
const { verifyClub, approveEvent, rejectEvent, getDashboardAnalytics } = require('../controllers/adminController');

// All routes here are restricted to admin only
router.use(protect, authorize('admin'));
router.post('/create', roleMiddleware('admin'), createEvent);

router.put('/verify-club/:id', verifyClub);
router.put('/approve-event/:id', approveEvent);
router.put('/reject-event/:id', rejectEvent);
router.get('/dashboard', getDashboardAnalytics);

module.exports = router;
