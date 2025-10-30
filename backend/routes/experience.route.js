const express = require('express');
const router = express.Router();
const {
  getExperiences,
  getExperienceById
} = require('../controllers/experience');

router.route('/')
  .get(getExperiences);

router.route('/:id')
  .get(getExperienceById);

module.exports = router;