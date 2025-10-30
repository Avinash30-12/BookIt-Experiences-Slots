const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Experience title is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Experience description is required'],
  },
  shortDescription: {
    type: String,
    required: [true, 'Short description is required'],
    maxlength: 200,
  },
  images: [{
    type: String,
    required: [true, 'At least one image is required'],
  }],
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: 0,
  },
  originalPrice: {
    type: Number,
    min: 0,
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  reviewCount: {
    type: Number,
    default: 0,
  },
  duration: {
    type: String,
    required: [true, 'Duration is required'],
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
  },
  included: [{
    type: String,
  }],
  requirements: [{
    type: String,
  }],
  host: {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    rating: {
      type: Number,
      default: 0,
    },
  },
  maxParticipants: {
    type: Number,
    required: [true, 'Max participants is required'],
    min: 1,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Experience', ExperienceSchema);