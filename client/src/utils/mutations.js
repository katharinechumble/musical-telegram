import { gql } from "@apollo/client";

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

export const CREATE_LIST = gql`
  mutation createList($listName: listName) {
    createList(listName: $listName) {
      _id
      username
      savedLists {
        listName
      }
    }
  }
`;

export const REMOVE_PRODUCT = gql`
  mutation removeProduct($itemId: String!) {
    removeProduct(itemId: $itemId) {
      _id
      username
      email
    }
  }
`;

export const REMOVE_LIST_ITEM = gql`
  mutation removeListItem($itemId: String!) {
    removeListItem(itemId: $itemId) {
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
`;

// mutations for the list functions, will update once we've got those typeDefs settled.

// export const SAVE_LIST = gql`
// mutation saveList()`;

// export const REMOVE_LIST = gql`
// mutation deleteList()`;
