const mongoose = require('mongoose');

const SlotSchema = new mongoose.Schema({
  experienceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Experience',
    required: [true, 'Experience ID is required'],
  },
  date: {
    type: Date,
    required: [true, 'Slot date is required'],
  },
  startTime: {
    type: String,
    required: [true, 'Start time is required'],
  },
  endTime: {
    type: String,
    required: [true, 'End time is required'],
  },
  capacity: {
    type: Number,
    required: [true, 'Capacity is required'],
    min: 1,
  },
  bookedCount: {
    type: Number,
    default: 0,
    min: 0,
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

// Virtual for available spots
SlotSchema.virtual('availableSpots').get(function() {
  return this.capacity - this.bookedCount;
});

// Check if slot is sold out
SlotSchema.virtual('isSoldOut').get(function() {
  return this.bookedCount >= this.capacity;
});

// Ensure virtual fields are serialized
SlotSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Slot', SlotSchema);