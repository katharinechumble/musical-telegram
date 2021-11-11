import gql from "graphql-tag";

// mutation to log in an existing user

export const LOGIN_USER = gql`
	mutation login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			token
			user {
				_id
				username
			}
		}
	}
`;

// mutation to add new users

export const ADD_USER = gql`
	mutation addUser(
		$firstname: String!
		$lastname: String!
		$username: String!
		$email: String!
		$password: String!
	) {
		addUser(
			firstname: $firstname
			lastname: $lastname
			username: $username
			email: $email
			password: $password
		) {
			token
			user {
				_id
				username
				email
				savedProducts {
					itemId
					itemName
					price
					imgUrl
					buyUrl
					description
				}
			}
		}
	}
`;

export const SAVE_PRODUCT = gql`
	mutation saveProduct($productData: SavedProduct) {
		saveProduct(productData: $productData) {
			_id
			username
			email
		}
	}
`;

// mutations for the list functions, will update once we've got those typeDefs settled.

// export const SAVE_LIST = gql`
// mutation saveList()`;

// export const REMOVE_LIST = gql`
// mutation deleteList()`;
