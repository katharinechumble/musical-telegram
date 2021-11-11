import { gql } from "@apollo/client";

// Query to retrieve an existing user and their lists, expect to update once the list functions have been determined

export const GET_ME = gql`
	{
		me {
			_id
			firstname
			lastname
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
`;
