const { gql } = require("apollo-server");

module.exports = gql`
  scalar Date

  type Property {
    objectNumber: String
    saleNumber: String
    lot: String
    artist: String
    title: String
  }

  input PropertyInput {
    objectNumber: String
    saleNumber: String
    lot: String
    artist: String
    title: String
  }

  type Transfer {
    shipper: String
    coordinator: String
    additionsDate: Date
    departureDate: Date
    complete: Boolean
    requestedProperty: [String]
    originLocation: String
  }

  type Query {
    property(ID: ID!): Property!
    getProperty(amount: Int): [Property]
    getTransfers: [Transfer]
  }

  type Mutation {
    createProperty(propertyInput: PropertyInput): Property!
  }

  type Mutation {
    createTransfer(
      shipper: String
      coordinator: String
      additionsDate: Date
      departureDate: Date
      complete: Boolean
      requestedProperty: [String]
    ): Transfer!
  }
`;
