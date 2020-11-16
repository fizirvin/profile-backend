import { buildSchema } from 'graphql'

module.exports = buildSchema(`
    scalar Decimal
    scalar Date

    type RootQuery {
        login(name: String, password: String): AuthData!
        users: [User]
    }

    type AuthData {
        token: String!
        userId: ID!
        firstName: String!
    }

    type User {
        _id: ID!
        firstName: String!
        lastName: String!
        email: String!
        active: Boolean!
        createdAt: Date!
        updatedAt: Date
    }

    type Password {
        _id: ID!
        userId: ID!
        password: String!
    }

    type RootMutation {
        newUser(input: NewUser): User!
        updateUser(input: UpdateUser): User!
    }

    input NewUser {
        firstName: String!
        lastName: String!
        email: String!
        password: String!
    }

    input UpdateUser {
        firstName: String!
        lastName: String!
        email: String!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`)
