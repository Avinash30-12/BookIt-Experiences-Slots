const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  slotId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Slot',
    required: [true, 'Slot ID is required'],
  },
  experienceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Experience',
    required: [true, 'Experience ID is required'],
  },
  userName: {
    type: String,
    required: [true, 'User name is required'],
    trim: true,
  },
  userEmail: {
    type: String,
    required: [true, 'User email is required'],
    trim: true,
    lowercase: true,
  },
  userPhone: {
    type: String,
    trim: true,
  },
  participants: {
    type: Number,
    required: [true, 'Number of participants is required'],
    min: 1,
  },
  promoCode: {
    type: String,
    trim: true,
    uppercase: true,
  },
  originalPrice: {
    type: Number,
    required: [true, 'Original price is required'],
    min: 0,
  },
  discountAmount: {
    type: Number,
    default: 0,
    min: 0,
  },
  finalPrice: {
    type: Number,
    required: [true, 'Final price is required'],
    min: 0,
  },
  bookingDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['confirmed', 'cancelled', 'pending'],
    default: 'confirmed',
  },
  bookingReference: {
    type: String,
    unique: true,
  },
}, {
  timestamps: true,
});

// Generate booking reference before saving
BookingSchema.pre('save', async function(next) {
  if (!this.bookingReference) {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    this.bookingReference = `BK-${timestamp}-${random}`.toUpperCase();
  }
  next();
});

// Update slot bookedCount after booking
BookingSchema.post('save', async function() {
  if (this.status === 'confirmed') {
    const Slot = mongoose.model('Slot');
    await Slot.findByIdAndUpdate(
      this.slotId,
      { $inc: { bookedCount: this.participants } }
    );
  }
});

module.exports = mongoose.model('Booking', BookingSchema);