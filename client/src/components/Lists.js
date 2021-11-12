import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import { Form, Button, Alert } from "react-bootstrap";
import { CREATE_LIST } from "../utils/mutations";

import Grid from "@mui/material/Grid";
import ProductCard from "./ProductCard";

const Lists = () => {
  const { data } = useQuery(GET_ME);
  const userData = data?.me || {};
  console.log("userData: ", userData);
  const [createList] = useMutation(CREATE_LIST);
  const userDataLength = Object.keys(userData).length;

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await createList({
        variables: { ...userFormData },
      });
    } catch (e) {
      console.error(e);
    }
    console.log(data);
  };

  return (
    <>
      <div>User Lists will go here.</div>
      <form onSubmit={handleFormSubmit}>
        <label for="input">Input</label>
        <input type="text" id="input"></input>
        <button>click me.</button>
      </form>
      {userData.savedLists ? (
        <Grid container spacing={2} sx={{ justifyContent: "center" }}>
          {userData.savedLists.map((item) => {
            return item.savedLists.listName;
          })}
        </Grid>
      ) : null}
    </>
  );
};

export default Lists;
