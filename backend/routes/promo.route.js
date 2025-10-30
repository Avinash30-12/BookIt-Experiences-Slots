const express = require('express');
const router = express.Router();
const {
  validatePromo
} = require('../controllers/promo');

router.route('/validate')
  .post(validatePromo);

module.exports = router;