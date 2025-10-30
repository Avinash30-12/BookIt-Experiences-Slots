const mongoose = require('mongoose');

const PromoSchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true, 'Promo code is required'],
    unique: true,
    uppercase: true,
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Promo description is required'],
  },
  discountType: {
    type: String,
    enum: ['percentage', 'fixed'],
    required: [true, 'Discount type is required'],
  },
  discountValue: {
    type: Number,
    required: [true, 'Discount value is required'],
    min: 0,
  },
  minAmount: {
    type: Number,
    default: 0,
  },
  maxDiscount: {
    type: Number,
  },
  validFrom: {
    type: Date,
    required: true,
  },
  validUntil: {
    type: Date,
    required: true,
  },
  usageLimit: {
    type: Number,
  },
  usedCount: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

// Check if promo is valid
PromoSchema.methods.isValid = function() {
  const now = new Date();
  return (
    this.isActive &&
    now >= this.validFrom &&
    now <= this.validUntil &&
    (this.usageLimit === undefined || this.usedCount < this.usageLimit)
  );
};

// Calculate discount amount
PromoSchema.methods.calculateDiscount = function(originalAmount) {
  if (!this.isValid() || originalAmount < this.minAmount) {
    return 0;
  }

  let discount = 0;
  
  if (this.discountType === 'percentage') {
    discount = (originalAmount * this.discountValue) / 100;
    if (this.maxDiscount && discount > this.maxDiscount) {
      discount = this.maxDiscount;
    }
  } else if (this.discountType === 'fixed') {
    discount = this.discountValue;
  }

  return Math.min(discount, originalAmount);
};

module.exports = mongoose.model('Promo', PromoSchema);