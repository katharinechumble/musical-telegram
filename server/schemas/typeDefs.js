// import the gql tagged template function
const { gql } = require("apollo-server-express");

// create our typeDefs
const typeDefs = gql`
	type User {
		_id: ID!
		firstname: String
		lastname: String
		username: String
		email: String
		productCount: Int
		savedProducts: [Product]
	}

	type Product {
		itemId: ID!
		itemName: String!
		price: String!
		imgUrl: String
		buyUrl: String
		description: [String]
		listTag: [String]
	}

	type List {
		_id: ID!
		listName: String!
	}

	input SavedProduct {
		itemId: ID!
		itemName: String!
		price: String!
		imgUrl: String
		buyUrl: String
		description: [String]
		listTag: [String]
	}

	type Query {
		me: User
	}

	type Auth {
		token: ID!
		user: User
	}

	type Mutation {
		login(username: String!, password: String!): Auth
		addUser(
			firstname: String!
			lastname: String!
			username: String!
			email: String!
			password: String!
		): Auth
		saveProduct(productData: SavedProduct): User
		createList(listName: String!): User
	}
`;

// export the typeDefs
module.exports = typeDefs;
