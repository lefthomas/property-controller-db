const { model, Schema } = require("mongoose");
var Property = require("./Property").schema;

const holdSchema = new Schema({
  saleCode: String,
  requestedProperty: [Property],
});

module.exports = model("Hold", holdSchema);
