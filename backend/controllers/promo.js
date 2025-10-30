const Promo = require('../models/promo');

//Validate promo code
const validatePromo = async (req, res) => {
  try {
    const { code, amount = 0 } = req.body;

    if (!code) {
      return res.status(400).json({
        success: false,
        message: 'Promo code is required'
      });
    }

    const promo = await Promo.findOne({ code: code.toUpperCase() });

    if (!promo) {
      return res.json({
        success: false,
        message: 'Invalid promo code',
        isValid: false
      });
    }

    if (!promo.isValid()) {
      return res.json({
        success: false,
        message: 'Promo code is expired or inactive',
        isValid: false
      });
    }

    if (amount < promo.minAmount) {
      return res.json({
        success: false,
        message: `Minimum amount of $${promo.minAmount} required`,
        isValid: false
      });
    }

    const discountAmount = promo.calculateDiscount(amount);

    res.json({
      success: true,
      isValid: true,
      data: {
        code: promo.code,
        description: promo.description,
        discountType: promo.discountType,
        discountValue: promo.discountValue,
        discountAmount,
        finalAmount: amount - discountAmount
      }
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
  validatePromo
};