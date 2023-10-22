const mongoose = require("mongoose");

const earnRatesModel = mongoose.Schema(
  {
    CardName: { type: String },
    TypeOfPoints: { type: mongoose.Schema.Types.ObjectId },
    EarnRate: {type:Object}
  }
);

const earnRates = mongoose.model("earnRate", earnRatesModel, "earnRates");

module.exports = earnRates;