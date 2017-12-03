const mongoose = require('mongoose')

const MachineSchema = mongoose.Schema({
  location: {
    lat: Number,
    long: Number
  },
  products: [
    {
      product: mongoose.Schema.Types.ObjectID,
      amount: Number
    },
  ],
  serialNumber: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Machine', MachineSchema)
