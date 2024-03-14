// walletTransactionModel.js
const mongoose = require('mongoose');

const walletTransactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  amount: Number,
  type: {
    type: String,
    enum: ['credit', 'debit']
  },
  description: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('WalletTransaction', walletTransactionSchema);
