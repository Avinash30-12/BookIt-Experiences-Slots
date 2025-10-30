const Experience = require('../models/experience');
const Slot = require('../models/slots');

//Get all experiences
const getExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find({ isActive: true })
      .select('title shortDescription images price location rating reviewCount duration category')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: experiences.length,
      data: experiences
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

//Get single experience with available slots
const getExperienceById = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    
    if (!experience || !experience.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Experience not found'
      });
    }

    // Get available slots (not sold out and in future)
    const currentDate = new Date();
    const slots = await Slot.find({
      experienceId: req.params.id,
      isActive: true,
      date: { $gte: currentDate },
      
    }).sort({ date: 1, startTime: 1 });

    res.json({
      success: true,
      data: {
        experience,
        slots
      }
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'Experience not found'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

module.exports = {
  getExperiences,
  getExperienceById
};