const Slot = require('../models/slots');
const Experience = require('../models/experience');

//Get available slots for an experience
const getSlotsByExperience = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    
    if (!experience) {
      return res.status(404).json({
        success: false,
        message: 'Experience not found'
      });
    }

    const currentDate = new Date();
    const slots = await Slot.find({
      experienceId: req.params.id,
      isActive: true,
      date: { $gte: currentDate },
    }).sort({ date: 1, startTime: 1 });


    res.json({
      success: true,
      data: slots
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
  getSlotsByExperience
};