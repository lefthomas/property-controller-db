const { model, Schema } = require("mongoose");
var Property = require("./property").schema;

const transferSchema = new Schema({
  shipper: String,
  coordinator: String,
  additionsDate: Date,
  departureDate: Date,
  complete: Boolean,
  originLocation: String,
  requestedProperty: [Property],
});

module.exports = model("Transfer", transferSchema);
