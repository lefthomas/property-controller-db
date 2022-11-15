const { GraphQLScalarType } = require("graphql");
const Property = require("../models/Property");
const Transfer = require("../models/Transfer");

const dateResolver = new GraphQLScalarType({
  name: "Date",
  //the value here is received from the client in Mutations
  parseValue(value) {
    return value;
  },
  //the value here is received from the server in Queries
  serialize(value) {
    return value.toLocaleString();
  },
});

module.exports = {
  Date: dateResolver,

  Query: {
    async property(_, { ID }) {
      return await Property.findById(ID);
    },
    async getProperty(_, { amount }) {
      return await Property.find().sort({ createdAt: -1 }).limit(amount);
    },
    async getTransfers() {
      return await Transfer.find().sort({
        additionsDate: -1,
      });
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
      { shipper, coordinator, additionsDate, departureDate, originLocation }
    ) {
      const createdTransfer = new Transfer({
        shipper: shipper,
        coordinator: coordinator,
        complete: false,
        additionsDate: additionsDate,
        departureDate: departureDate,
        requestedProperty: [],
        originLocation: originLocation,
      });
      const res = await createdTransfer.save();

      return {
        id: res.id,
        ...res._doc,
      };
    },
  },
};
