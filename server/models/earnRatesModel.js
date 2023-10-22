const mongoose = require("mongoose");

const earnRatesModel = mongoose.Schema(
  {
    CardName: { type: String, trim: true },
    TypeOfPoints: { type: mongoose.Schema.Types.ObjectId },
    EarnRate: {type:Object}
  }
);

const Card = mongoose.model("Card", earnRatesModel);

module.exports = Card;