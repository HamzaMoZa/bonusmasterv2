const express = require('express');
const mongoose = require('mongoose');
const path = require("path");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const cards = require('./routes/cardsRoutes.js');
const app = express();
dotenv.config();

connectDB();
app.use(express.json());

const PORT = process.env.PORT || 4000;
const host = "0.0.0.0";
const server = app.listen(
  PORT,
  host,
  console.log(`Server running on PORT ${PORT}...`)
);

app.use("/api/cards", cards);
