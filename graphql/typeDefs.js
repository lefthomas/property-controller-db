const { gql } = require("apollo-server");

module.exports = gql`
  type Property {
    objectNumber: String
    saleNumber: String
    lot: String
    artist: String
    title: String
  }

  type Transfer {
    shipper: String
    coordinator: String
    collectionDate: String
    collectionTime: String
    deliveryDate: String
    deliveryTime: String
    complete: Boolean
    requestedProperty: [String]
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
    collectionDate: String
    deliveryDate: String
    complete: Boolean
    requestedProperty: [String]
  }

  type Query {
    property(ID: ID!): Property!
    getProperty(amount: Int): [Property]
  }

  type Mutation {
    createProperty(propertyInput: PropertyInput): Property!
  }

  type Mutation {
    createTransfer(transferInput: TransferInput): Transfer!
  }
`;
