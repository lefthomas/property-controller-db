const { GraphQLScalarType } = require("graphql");
const Property = require("../models/Property");
const Transfer = require("../models/Transfer");

const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
};

const dateResolver = new GraphQLScalarType({
  name: "Date",
  //the value here is received from the client in Mutations
  parseValue(value) {
    return value;
  },
  //the value here is received from the server in Queries
  serialize(value) {
    return value.toLocaleString("en-GB", options);
  },
});

module.exports = {
  Date: dateResolver,

  Query: {
    async property(_, { ID }) {
      return await Property.findById(ID);
    },
    async getProperty(_, { ID }) {
      return await Transfer.findById(ID);
    },
    async getTransfers() {
      return await Transfer.find({ complete: false }).sort({
        additionsDate: 1,
      });
    },
    async getGlanceBox(_, { originLocation }) {
      return await Transfer.where("complete")
        .equals(false)
        .where("originLocation")
        .equals(originLocation)
        .sort({
          additionsDate: 1,
        })
        .limit(1);
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
        shipper,
        coordinator,
        additionsDate,
        departureDate,
        originLocation,
        requestedProperty,
      }
    ) {
      const createdTransfer = new Transfer({
        shipper: shipper,
        coordinator: coordinator,
        complete: false,
        additionsDate: additionsDate,
        departureDate: departureDate,
        requestedProperty: requestedProperty,
        originLocation: originLocation,
      });
      const res = await createdTransfer.save();

      return {
        id: res.id,
        ...res._doc,
      };
    },
    async addWorkToTransfer(_, { ID, transferInput: { requestedProperty } }) {
      const wasUpdated = (
        await Transfer.updateOne(
          { _id: ID },
          { $push: { requestedProperty: requestedProperty } }
        )
      ).modifiedCount;
      return wasUpdated;
    },
  },
};
