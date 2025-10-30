const Booking = require('../models/booking');
const Slot = require('../models/slots');
const Promo = require('../models/promo');
const Experience = require('../models/experience');

//Create a new booking
const createBooking = async (req, res) => {
  const session = await Booking.startSession();
  session.startTransaction();

  try {
    const {
      slotId,
      userName,
      userEmail,
      userPhone,
      participants,
      promoCode
    } = req.body;

    // Validate required fields
    if (!slotId || !userName || !userEmail || !participants) {
      return res.status(400).json({
        success: false,
        message: 'Please provide slotId, userName, userEmail, and participants'
      });
    }

    // Check if slot exists and has capacity
    const slot = await Slot.findById(slotId).session(session);
    if (!slot) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({
        success: false,
        message: 'Slot not found'
      });
    }

    if (slot.bookedCount + participants > slot.capacity) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        success: false,
        message: 'Not enough available spots'
      });
    }

    // Get experience details
    const experience = await Experience.findById(slot.experienceId);
    if (!experience) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({
        success: false,
        message: 'Experience not found'
      });
    }

    // Calculate price
    let originalPrice = slot.price * participants;
    let discountAmount = 0;
    let finalPrice = originalPrice;

    // Validate and apply promo code if provided
    if (promoCode) {
      const promo = await Promo.findOne({ code: promoCode.toUpperCase() });
      if (promo && promo.isValid()) {
        discountAmount = promo.calculateDiscount(originalPrice);
        finalPrice = originalPrice - discountAmount;
        
        // Update promo usage
        promo.usedCount += 1;
        await promo.save({ session });
      }
    }

    // Create booking
    const booking = new Booking({
      slotId,
      experienceId: slot.experienceId,
      userName,
      userEmail,
      userPhone,
      participants,
      promoCode: promoCode ? promoCode.toUpperCase() : undefined,
      originalPrice,
      discountAmount,
      finalPrice
    });

    const savedBooking = await booking.save({ session });

    // Commit transaction
    await session.commitTransaction();
    session.endSession();

    // Populate booking details for response
    const populatedBooking = await Booking.findById(savedBooking._id)
      .populate('slotId')
      .populate('experienceId');

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: populatedBooking
    });

  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: messages
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

//Get booking by reference

const getBookingByReference = async (req, res) => {
  try {
    const booking = await Booking.findOne({ 
      bookingReference: req.params.reference 
    })
    .populate('slotId')
    .populate('experienceId');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.json({
      success: true,
      data: booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

module.exports = {
  createBooking,
  getBookingByReference
};