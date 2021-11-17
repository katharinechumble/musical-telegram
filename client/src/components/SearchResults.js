import React, { useState } from "react";
import ProductCard from "./ProductCard";
import Auth from "../utils/auth";

import { productSearch } from "../utils/api";

// Material UI
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
// Icons
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const SearchResults = () => {
  // hold search data
  const [searchedItems, setSearchedItems] = useState([]);
  // hold search field data
  const [searchInput, setSearchInput] = useState("");
  // handle search errors
  const [searchError, setSearchError] = useState(false);
  // hold clicked state
  const [clicked, setClicked] = useState(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setSearchError(false);

    try {
      const response = await productSearch(searchInput);

      if (response.length < 0) {
        throw new Error("We missed the mark!");
      }

      setSearchedItems(response);

      setSearchInput("");
    } catch (err) {
      setSearchError(true);
      setSearchInput("");
      console.log(err);
    }
  };

  return (
    <>
      {!Auth.loggedIn() ? (
        <Paper color="primary" elevation={3}>
          <Typography
            sx={{ padding: "1rem" }}
            align="center"
            variant="h3"
            gutterBottom
            component="div"
          >
            Log In or Sign Up to Begin!!!
          </Typography>
        </Paper>
      ) : null}
      {Auth.loggedIn() ? (
        <form
          onSubmit={handleFormSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "8px",
          }}
        >
          <TextField
            variant="outlined"
            label="Search"
            margin="normal"
            fullWidth
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
              setSearchedItems([]);
              setClicked(false);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          {searchInput ? (
            <Button
              onClick={() => setClicked(true)}
              type="submit"
              variant="contained"
              size="large"
              endIcon={<ShoppingCartIcon />}
            >
              Shop
            </Button>
          ) : (
            <Button
              disabled
              variant="contained"
              size="large"
              endIcon={<ShoppingCartIcon />}
            >
              Shop
            </Button>
          )}
        </form>
      ) : null}
      {Auth.loggedIn() ? (
        <Paper color="primary" elevation={3}>
          <Typography
            sx={{ padding: "1rem" }}
            align="center"
            variant="h3"
            gutterBottom
            component="div"
          >
            {clicked && searchedItems.length <= 0
              ? "Loading..."
              : "Search for an item to begin"}
          </Typography>
        </Paper>
      ) : null}

      {searchError ? (
        "Hmmm... No results"
      ) : (
        <Grid container spacing={2} sx={{ justifyContent: "center" }}>
          {searchedItems.map((item) => {
            return (
              <Grid key={item.itemId} item xs={12} sm={6} md={4} lg={3}>
                <ProductCard
                  keyValue={item.itemId}
                  itemName={item.itemName}
                  buyUrl={item.buyUrl}
                  imgUrl={item.imgUrl}
                  price={item.price}
                  description={item.description}
                  searchResults={searchedItems}
                />
              </Grid>
            );
          })}
        </Grid>
      )}
    </>
  );
};

export default SearchResults;
