const { model, Schema } = require("mongoose");
var Property = require("./property").schema;

const holdSchema = new Schema({
  saleCode: String,
  requestedProperty: [Property],
});

module.exports = model("Hold", holdSchema);
