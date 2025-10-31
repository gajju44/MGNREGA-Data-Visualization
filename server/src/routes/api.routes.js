const express = require('express');
const apiController = require('../controllers/api.controller');
const router = express.Router();

// Get all states
router.get('/states', apiController.getStates);

// Get data for a specific state
router.get('/states/:state', apiController.getStateData);

module.exports = router;