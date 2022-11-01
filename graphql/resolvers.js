const Property = require("../models/Property");

module.exports = {
  Query: {
    async property(_, { ID }) {
      return await Property.findById(ID);
    },
    async getProperty(_, { amount }) {
      return await Property.find().sort({ createdAt: -1 }).limit(amount);
    },
  },
  Mutation: {
    async createProperty(
      _,
      { propertyInput: { objectNumber, saleNumber, lot, artist, title } }
    ) {
      const createdProperty = new Property({
        objectNumber: objectNumber,
        saleNumber: saleNumber,
        lot: lot,
        artist: artist,
        title: title,
      });
      const res = await createdProperty.save();

      return {
        id: res.id,
        ...res._doc,
      };
    },
  },
};
