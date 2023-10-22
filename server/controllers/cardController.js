const EarnRates = require('../models/earnRatesModel');
const Values = require('../models/rewardValuesModel');

// New function to call the Python script and get the best card
const { spawn } = require('child_process');

exports.fetchAllCards = async (req, res) => {
    try {
      const earnRates = await EarnRates.find();
      res.json(earnRates);
      // console.log("Cards fetched from the database:", earnRates);
      
    } catch (err) {
      
      res.status(500).json({ message: err.message });
    }
    
  };

  exports.getBestCard = async (req, res) => {
    const { selectedCards, webpageURL } = req.body;
    

    // Call the Python script (assuming the script is named 'best_card_selector.py' and resides in the 'pythonscripts' directory)
    const pythonProcess = spawn('python', ['../pythonscript/app.py', JSON.stringify(selectedCards), webpageURL]);
    // console.log(pythonProcess);
      
    let bestCard = null;

    pythonProcess.stdout.on('data', (data) => {
      
      console.log("Python Output:", data.toString());
      try {
          const result = JSON.parse(data);
          bestCard = result.best_card;
          // Handle the result as needed
          console.log(bestCard);
          res.json({ bestCard });
      } catch (error) {
        console.error("Error parsing Python output:", error);
        

      }
    });
    
    pythonProcess.stderr.on('data', (data) => {
        console.error(`Error from Python script: ${data}`);
        console.error("Python Error:", data.toString());
        res.status(500).json({ message: 'Internal Server Error' });
    });

    
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




exports.addCard = (req, res) => {
    
};

