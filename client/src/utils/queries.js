import gql from "graphql-tag";

// Query to retrieve an existing user and their lists, expect to update once the list functions have been determined

export const GET_ME = gql`
    {
        me {
            _id
            username
            email
            savedLists{}
        }
    }
`;
