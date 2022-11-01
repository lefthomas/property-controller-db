const { model, Schema } = require("mongoose");

const propertySchema = new Schema({
  objectNumber: String,
  saleNumber: String,
  lot: String,
  artist: String,
  title: String,
});

module.exports = model("Property", propertySchema);
