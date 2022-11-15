const { model, Schema } = require("mongoose");

const transferSchema = new Schema({
  shipper: String,
  coordinator: String,
  additionsDate: Date,
  departureDate: Date,
  complete: Boolean,
  requestedProperty: Array,
  originLocation: String,
});

module.exports = model("Transfer", transferSchema);
