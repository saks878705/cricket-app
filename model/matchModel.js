const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  team1: String,
  team2: String,
  date: Date
});

module.exports = mongoose.model('Match', matchSchema);