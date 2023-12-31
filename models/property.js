const { model, Schema } = require("mongoose");

const propertySchema = new Schema({
  objectNumber: String,
  saleNumber: String,
  lot: String,
  artist: String,
  title: String,
  markHeld: {
    type: Boolean,
    default: false,
  },
  newRequest: {
    type: Boolean,
    default: true,
  },
  keepLoc: String,
});

module.exports = model("Property", propertySchema);
