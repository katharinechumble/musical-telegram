import { UPDATE_PRODUCTS, UPDATE_LISTS, UPDATE_CURRENT_LIST } from "./actions";
import { useReducer } from "react";

export const reducer = (state, action) => {
  switch (action.type) {
    // if action type value is the value of `UPDATE_PRODUCTS`, return a new state object with an updated products array
    case UPDATE_PRODUCTS:
      return {
        ...state,
        products: [...action.products],
      };
    // if action type value is the value of `UPDATE_LISTS`, return a new state object with an updated lists array
    case UPDATE_LISTS:
      return {
        ...state,
        LISTS: [...action.lists],
      };
    case UPDATE_CURRENT_LIST:
      return {
        ...state,
        currentList: action.currentList,
      };

    default:
      return state;
  }
};

//This function, useProductReducer(), will be used to help initialize our global state object and then provide us with the functionality for
//updating that state by automatically running it through our custom reducer() function.
export function useProductReducer(initialState) {
  return useReducer(reducer, initialState);
}
