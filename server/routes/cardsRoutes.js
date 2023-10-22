const express = require('express');
const router = express.Router();
const cardController = require('../controllers/cardController');


router.get('/', cardController.getAllCards);
router.get('/fetchCards', cardController.fetchAllCards);
router.delete('/:id', cardController.deleteCard);
router.post('/addCard', cardController.addCard);



module.exports = router;