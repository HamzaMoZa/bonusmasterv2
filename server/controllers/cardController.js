const Card = require('../models/earnRatesModel');
const Values = require('../models/rewardValuesModel');


exports.fetchAllCards = async (req, res) => {
    try {
      const cards = await Card.find();
      res.json(cards);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }


exports.deleteCard = (req, res) => {
    
};


exports.addCard = (req, res) => {
    
};

