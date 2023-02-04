const { gql } = require("apollo-server");

module.exports = gql`
  scalar Date

  type Property {
    objectNumber: String
    saleNumber: String
    lot: String
    artist: String
    title: String
    markHeld: Boolean
    newRequest: Boolean
    keepLoc: String
  }

  type User {
    username: String
    email: String
    password: String
    token: String
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

  type Hold {
    _id: String
    saleCode: String
    requestedProperty: [Property]
  }

  input RegisterInput {
    username: String!
    email: String!
    password: String!
    confirmPassword: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input PropertyInput {
    objectNumber: String
    saleNumber: String
    lot: String
    artist: String
    title: String
    markHeld: Boolean
    newRequest: Boolean
    keepLoc: String
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

  input HoldInput {
    saleCode: String
    requestedProperty: [PropertyInput]
  }

  type Query {
    property(ID: ID!): Property!
    getProperty(ID: ID!): Transfer
    getHoldProperty(ID: ID!): Hold
    getTransfers(originLocation: String): [Transfer]
    getHoldList(saleCode: String): [Hold]
    getPropertyByObject(objectNumbers: [String]): [Property]
    getGlanceBox(originLocation: String): [Transfer]
    user(id: ID!): User
  }

  type Mutation {
    createProperty(propertyInput: PropertyInput): Property!
    createTransfer(
      shipper: String
      coordinator: String
      additionsDate: Date
      departureDate: Date
      complete: Boolean
      requestedProperty: [PropertyInput]
      originLocation: String
    ): Transfer!
    createHold(requestedProperty: [PropertyInput], saleCode: String): Hold!
    addWorkToTransfer(ID: ID!, transferInput: TransferInput): Boolean
    addWorkToHold(ID: ID!, holdInput: HoldInput): Boolean
    deleteTransfer(ID: ID): Boolean
    registerUser(registerInput: RegisterInput): User
    loginUser(loginInput: LoginInput): User
  }
`;
