const { model, Schema } = require("mongoose");

const transferSchema = new Schema({
  shipper: String,
  coordinator: String,
  collectionDate: Date,
  deliveryDate: Date,
  complete: Boolean,
  requestedProperty: Array,
});

module.exports = model("Transfer", transferSchema);
