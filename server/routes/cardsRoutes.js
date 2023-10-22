const express = require('express');
const router = express.Router();
const cardController = require('../controllers/cardController');


// router.get('/', cardController.getAllCards);
router.get('/fetchCards', cardController.fetchAllCards);
// router.post('/fetchCards', cardController.fetchCardById);
router.post('/getBestCard', cardController.getBestCard); 


module.exports = router;