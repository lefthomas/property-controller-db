const { GraphQLScalarType } = require("graphql");
const Property = require("../models/property");
const Transfer = require("../models/transfer");
const Hold = require("../models/hold");
const User = require("../models/user");
const { ApolloError } = require("apollo-server-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const api_key = process.env.API_KEY;

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

    async getPropertyByObject(_, { objectNumbers }) {
      return await Property.find({ objectNumber: objectNumbers });
    },

    // gets all objects on a particular transfer
    async getProperty(_, { ID }) {
      return await Transfer.findById(ID);
    },
    async getHoldProperty(_, { ID }) {
      return await Hold.findById(ID);
    },
    async getTransfers(_, { originLocation }) {
      return await Transfer.where("complete")
        .equals(false)
        .where("originLocation")
        .equals(originLocation)
        .sort({
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
    async getHoldList(_, { saleCode }) {
      return await Hold.where("saleCode").equals(saleCode);
    },
    user: (_, { ID }) => User.findById(ID),
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
    async deleteTransfer(_, { ID }) {
      const wasDeleted = (await Transfer.deleteOne({ _id: ID })).deletedCount;
      return wasDeleted;
      // 1 if deleted, 0 if not
    },
    async createHold(_, { saleCode }) {
      const createdHold = new Hold({
        saleCode: saleCode,
      });
      const res = await createdHold.save();

      return {
        id: res.id,
        ...res._doc,
      };
    },

    async addWorkToHold(_, { ID, holdInput: { requestedProperty } }) {
      const wasUpdated = (
        await Hold.updateOne(
          { _id: ID },
          { $push: { requestedProperty: requestedProperty } }
        )
      ).modifiedCount;
      return wasUpdated;
    },

    async registerUser(_, { registerInput: { username, email, password } }) {
      //check if email exists
      const oldUser = await User.findOne({ email });

      //throw error if user exists

      if (oldUser) {
        throw new ApolloError(
          "A User is already registered with the email " + email
        );
      }

      //encrypt password

      var encryptedPassword = await bcrypt.hash(password, 10);

      //build out mongoose model (User)
      const newUser = new User({
        username: username,
        email: email.toLowerCase(),
        password: encryptedPassword,
      });

      //Create JWT (attach to user model)
      const token = jwt.sign({ user_id: newUser._id, email }, api_key);
      newUser.token = token;

      //save user in Mongodb

      const res = await newUser.save();

      return {
        id: res.id,
        ...res._doc,
      };
    },
    async loginUser(_, { loginInput: { email, password } }) {
      //check user exists with email
      const user = await User.findOne({ email });
      //check password is correct
      if (user && (await bcrypt.compare(password, user.password))) {
        //create new token
        const token = jwt.sign({ user_id: user._id, email }, api_key);
        //attach token to user model
        user.token = token;

        return {
          id: user.id,
          ...user._doc,
        };
      } else {
        throw new ApolloError("Incorrect password");
      }
    },
  },
};
