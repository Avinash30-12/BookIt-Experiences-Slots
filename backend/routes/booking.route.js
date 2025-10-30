const express = require('express');
const router = express.Router();
const {
  createBooking,
  getBookingByReference
} = require('../controllers/booking');

router.route('/')
  .post(createBooking);

router.route('/:reference')
  .get(getBookingByReference);

module.exports = router;