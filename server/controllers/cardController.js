const EarnRates = require('../models/earnRatesModel');
const Values = require('../models/rewardValuesModel');


exports.fetchAllCards = async (req, res) => {
    try {
      const earnRates = await EarnRates.find();
      res.json(earnRates);
      // console.log("Cards fetched from the database:", earnRates);
      
    } catch (err) {
      
      res.status(500).json({ message: err.message });
    }
    
  };

  // exports.fetchCardById = async (req, res) => {
  //   try {
  //     const cardId = req.body.cardId;
  //     const card = await Card.findById(cardId);
  //     if (!card) {
  //       return res.status(404).json({ message: 'Card not found' });
  //     }
  //     res.json(card);
  //   } catch (error) {
  //     res.status(500).json({ message: error.message });
  //   }
  // };  

exports.deleteCard = (req, res) => {
    
};

exports.getAllCards = (req, res) => {
    
};


exports.addCard = (req, res) => {
    
};

