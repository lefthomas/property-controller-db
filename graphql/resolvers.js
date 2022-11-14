const Property = require("../models/Property");
const Transfer = require("../models/Transfer");

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
    async createTransfer(
      _,
      {
        transferInput: {
          shipper,
          coordinator,
          collectionDate,
          deliveryDate,
          complete,
          requestedProperty,
        },
      }
    ) {
      const createdTransfer = new Transfer({
        shipper: shipper,
        coordinator: coordinator,
        collectionDate: collectionDate,
        deliveryDate: deliveryDate,
        complete: complete,
        requestedProperty: requestedProperty,
      });
      const res = await createdTransfer.save();

      return {
        id: res.id,
        ...res._doc,
      };
    },
  },
};
