const mongoose = require("mongoose");

const rewardValuesModel = mongoose.Schema(
  {
    program: { type: String, trim: true },
    value_cents_oct2023: { type: double },
    
  }
);

const Chat = mongoose.model("Values", rewardValuesModel);

module.exports = Values;