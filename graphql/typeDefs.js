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

  input TransferInput {
    shipper: String
    coordinator: String
    additionsDate: Date
    departureDate: Date
    complete: Boolean
    requestedProperty: [PropertyInput]
    originLocation: String
  }

  type Transfer {
    shipper: String
    coordinator: String
    additionsDate: Date
    departureDate: Date
    complete: Boolean
    requestedProperty: [Property]
    originLocation: String
  }

  type Query {
    property(ID: ID!): Property!
    getProperty(amount: Int): [Property]
    getTransfers: [Transfer]
  }

  type Mutation {
    createProperty(propertyInput: PropertyInput): Property!
    addWorkToTransfer(ID: ID!, transferInput: TransferInput): Boolean
  }

  type Mutation {
    createTransfer(
      shipper: String
      coordinator: String
      additionsDate: Date
      departureDate: Date
      complete: Boolean
      requestedProperty: [String]
      originLocation: String
    ): Transfer!
  }
`;
