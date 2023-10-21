const express = require('express');
const router = express.Router();
const cardController = require('../controllers/cardController');

router.get('/', cardController.getAllCards);
router.delete('/:id', cardController.deleteCard);
router.post('/id', cardController.addCard);