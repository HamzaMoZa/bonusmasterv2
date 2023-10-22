const { Double } = require("bson");
const mongoose = require("mongoose");

const rewardValuesModel = mongoose.Schema(
  {
    program: { type: String, trim: true },
    value_cents_oct2023: { type: Number },
  }
);

const Values = mongoose.model("rewardValue", rewardValuesModel, "rewardValues");

module.exports = Values;