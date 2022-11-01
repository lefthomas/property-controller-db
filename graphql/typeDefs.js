const { gql } = require("apollo-server");

module.exports = gql`
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

  type Query {
    property(ID: ID!): Property!
    getProperty(amount: Int): [Property]
  }

  type Mutation {
    createProperty(propertyInput: PropertyInput): Property!
  }
`;


mongoimport --uri "old secret" --collection properties --drop --file /Users/development/code/transferdb/csv/Book3.csv

