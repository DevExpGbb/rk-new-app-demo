const express = require('express');
const router = express.Router();
const { calculateCanadaDay, validateYear } = require('../utils/date-calculator');

/**
 * GET /api/canada-day/:year
 * Calculate what day of the week Canada Day falls on for a given year
 */
router.get('/api/canada-day/:year', (req, res) => {
  try {
    const validation = validateYear(req.params.year);
    
    if (!validation.isValid) {
      return res.status(400).json({
        status: 'error',
        message: validation.error,
        validRange: '1600-3000'
      });
    }

    const result = calculateCanadaDay(validation.year);
    
    res.json({
      status: 'success',
      data: result,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while calculating Canada Day',
      error: error.message
    });
  }
});

/**
 * POST /api/canada-day
 * Calculate Canada Day for a year provided in request body
 */
router.post('/api/canada-day', (req, res) => {
  try {
    const { year } = req.body;
    
    if (!year) {
      return res.status(400).json({
        status: 'error',
        message: 'Year is required in request body',
        validRange: '1600-3000'
      });
    }

    const validation = validateYear(year);
    
    if (!validation.isValid) {
      return res.status(400).json({
        status: 'error',
        message: validation.error,
        validRange: '1600-3000'
      });
    }

    const result = calculateCanadaDay(validation.year);
    
    res.json({
      status: 'success',
      data: result,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while calculating Canada Day',
      error: error.message
    });
  }
});

/**
 * GET /api/canada-day
 * Get information about the Canada Day calculator
 */
router.get('/api/canada-day', (req, res) => {
  res.json({
    status: 'success',
    message: 'Canada Day Calculator API',
    description: 'Calculate what day of the week Canada Day (July 1st) falls on for any year between 1600 and 3000',
    usage: {
      endpoints: [
        {
          method: 'GET',
          path: '/api/canada-day/:year',
          description: 'Calculate Canada Day for specific year',
          example: '/api/canada-day/2024'
        },
        {
          method: 'POST',
          path: '/api/canada-day',
          description: 'Calculate Canada Day with year in request body',
          example: '{"year": 2024}'
        }
      ],
      validRange: '1600-3000',
      algorithm: 'JavaScript Date Object'
    },
    timestamp: new Date().toISOString()
  });
});

module.exports = router;