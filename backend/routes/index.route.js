const express = require('express');
const router = express.Router();

const experienceRoutes = require('./experience.route');
const bookingRoutes = require('./booking.route');
const promoRoutes = require('./promo.route');

router.use('/experiences', experienceRoutes);
router.use('/bookings', bookingRoutes);
router.use('/promo', promoRoutes);

module.exports = router;