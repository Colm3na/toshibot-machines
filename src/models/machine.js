const mongoose = require('mongoose');

const MachineSchema = mongoose.Schema({
  location: {
    lat: Number,
    long: Number,
  },
  products: [
    {
      _id: false,
      product: mongoose.Schema.Types.ObjectId,
      amount: Number,
    },
  ],
  serialNumber: {
    type: String,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Machine', MachineSchema);
