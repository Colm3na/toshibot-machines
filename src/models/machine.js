const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({
  location: {
    lat: Number,
    long: Number
  },
  products: [
    {
      product: mongose.Schema.types.ObjectID,
    amount: Number,
  }
],
  serialNumber: String
  createAdt: {
    type: Date,
    default: Date.now,
  }
})
module.exports = mongoose.model('Machine', MachineSchema)
