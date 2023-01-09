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

  type User {
    username: String
    email: String
    password: String
    token: String
  }

  input RegisterInput {
    username: String
    email: String
    password: String
    confirmPassword: String
  }

  input LoginInput {
    email: String
    password: String
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
    _id: String
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
    getProperty(ID: ID!): Transfer
    getTransfers(originLocation: String): [Transfer]
    getPropertyByObject(objectNumbers: [String]): [Property]
    getGlanceBox(originLocation: String): [Transfer]
    user(id: ID!): User
  }

  type Mutation {
    createProperty(propertyInput: PropertyInput): Property!
    addWorkToTransfer(ID: ID!, transferInput: TransferInput): Boolean
    deleteTransfer(ID: ID): Boolean
    registerUser(registerInput: RegisterInput): User
    loginUser(loginInput: LoginInput): User
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
