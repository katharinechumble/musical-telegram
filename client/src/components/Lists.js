import React, { useState, useEffect } from "react";

import ProductCard from "./ProductCard";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { useQuery, useMutation } from "@apollo/client";

import { GET_ME } from "../utils/queries";
import { ADD_TO_CART } from "../utils/mutations";
import Auth from "../utils/auth";

import Grid from "@mui/material/Grid";
import { REMOVE_LIST_ITEM } from "../utils/mutations";

const lodash = require("lodash");

// let famItemPrice;

const Lists = () => {
  const { data, loading } = useQuery(GET_ME);
  const userData = data?.me || {};
  const [family, setFamily] = useState([]);
  const [friends, setFriends] = useState([]);
  const [coWorker, setCoWorker] = useState([]);

  const [removeListItem] = useMutation(REMOVE_LIST_ITEM);

  useEffect(() => {
    if (!loading && userData) {
      let familyArr = userData.savedProducts.filter(
        (item) => item.listTag[0] === "family"
      );

      setFamily(familyArr);

      let friendArr = userData.savedProducts.filter(
        (item) => item.listTag[0] === "friends"
      );

      setFriends(friendArr);

      let coWorkerArr = userData.savedProducts.filter(
        (item) => item.listTag[0] === "co-workers"
      );

      setCoWorker(coWorkerArr);
    }
  }, [userData, loading]);

  const [cartToTrue] = useMutation(ADD_TO_CART);
  //Add To Cart functionality.
  const handleAddToCart = async (id) => {
    const productToCart = userData.savedProducts.find(
      (item) => item.itemId === id
    );

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    const cartToggle = !productToCart.cartValue;

    try {
      const { data } = await cartToTrue({
        variables: {
          itemId: productToCart.itemId,
          cartBool: cartToggle,
        },
      });

      return data;
    } catch (err) {
      console.log(err);
    }
  };

  //remove list item functionality.
  const removeItem = async (itemId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }
    try {
      const { data } = await removeListItem({
        variables: { itemId },
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  //List Totals Functionality:

  // Family List Total.
  function calculateFamTotal() {
    let famPriceArray = [];
    userData.savedProducts.forEach((item) => {
      if (item.listTag[0] === "family") {
        //filters out the $ so it doesn't return NaN.
        let itemPrice = item.price.replace("$", "");

        //converts from a string to an Intger so the lodash sum Method can be ran on it.
        let itemPriceNum = parseFloat(itemPrice);

        let fixedItemPrice = itemPriceNum;

        famPriceArray.push(fixedItemPrice);
      }
    });

    let famListTotal = lodash.sum(famPriceArray);

    return famListTotal.toFixed(2);
  }

  // Friends List Total.
  function calculateFriendsTotal() {
    let friendPriceArray = [];
    userData.savedProducts.forEach((item) => {
      if (item.listTag[0] === "friends") {
        //filters out the $ so it doesn't return NaN.
        let itemPrice = item.price.replace("$", "");

        //converts from a string to an Intger so the lodash sum Method can be ran on it.
        let itemPriceNum = parseFloat(itemPrice);

        let fixedItemPrice = itemPriceNum;

        friendPriceArray.push(fixedItemPrice);
      }
    });

    let friendListTotal = lodash.sum(friendPriceArray);

    return friendListTotal.toFixed(2);
  }

  //Co-Workers List Total.
  function calculateCoWrksTotal() {
    let cwPriceArray = [];
    userData.savedProducts.forEach((item) => {
      if (item.listTag[0] === "co-workers") {
        //filters out the $ so it doesn't return NaN.
        let itemPrice = item.price.replace("$", "");

        //converts from a string to an Intger so the lodash sum Method can be ran on it.
        let itemPriceNum = parseFloat(itemPrice);

        let fixedItemPrice = itemPriceNum;

        cwPriceArray.push(fixedItemPrice);
      }
    });

    let cwListTotal = lodash.sum(cwPriceArray);

    return cwListTotal.toFixed(2);
  }

  return (
    <>
      <div className="ListTitleDisp">
        <h1>Family</h1>
        <Typography
          sx={{ padding: "1rem" }}
          align="center"
          variant="h5"
          gutterBottom
          component="div"
        >
          Family Total: ${calculateFamTotal()}
        </Typography>
        <Grid container spacing={2} sx={{ justifyContent: "center" }}>
          {family
            ? family.map((item) => {
                return (
                  <Grid key={item.itemName} item xs={12} sm={6} md={4} lg={3}>
                    <ProductCard
                      keyValue={item.itemId}
                      itemName={item.itemName}
                      buyUrl={item.buyUrl}
                      imgUrl={item.imgUrl}
                      price={item.price}
                      description={item.description}
                    />
                    <div className="list-disp">
                      <div key={item.itemId} className="list-addtocart">
                        {item.cartValue ? (
                          <Button
                            container
                            spacing={2}
                            sx={{ justifyContent: "center" }}
                            disabled
                            type="submit"
                            variant="contained"
                            sx={{
                              backgroundColor: "#A5D8F3",
                              color: "#072636",
                            }}
                            // onClick={() => handleAddToCart(item.itemId)}
                          >
                            In Cart
                          </Button>
                        ) : (
                          <Button
                            container
                            spacing={2}
                            sx={{ justifyContent: "center" }}
                            type="submit"
                            variant="contained"
                            onClick={() => handleAddToCart(item.itemId)}
                            sx={{
                              backgroundColor: "#A5D8F3",
                              color: "#072636",
                            }}
                          >
                            Add To Cart
                          </Button>
                        )}
                        <div className="rmv-list-btn">
                          <Button
                            container
                            spacing={2}
                            sx={{ justifyContent: "space-around" }}
                            type="submit"
                            variant="contained"
                            onClick={() => removeItem(item.itemId)}
                          >
                            Remove Item
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Grid>
                );
              })
            : null}
        </Grid>
      </div>
      <div className="ListTitleDisp">
        <h1>Friends</h1>
        <Typography
          sx={{ padding: "1rem" }}
          align="center"
          variant="h5"
          gutterBottom
          component="div"
        >
          Friends Total: ${calculateFriendsTotal()}
        </Typography>
        <Grid container spacing={2} sx={{ justifyContent: "center" }}>
          {friends
            ? friends.map((item) => {
                return (
                  <Grid key={item.itemName} item xs={12} sm={6} md={4} lg={3}>
                    <ProductCard
                      keyValue={item.itemId}
                      itemName={item.itemName}
                      buyUrl={item.buyUrl}
                      imgUrl={item.imgUrl}
                      price={item.price}
                      description={item.description}
                    />
                    <div className="list-disp">
                      <div key={item.itemId} className="list-addtocart">
                        {item.cartValue ? (
                          <Button
                            container
                            spacing={2}
                            sx={{ justifyContent: "center" }}
                            disabled
                            type="submit"
                            variant="contained"
                            sx={{
                              backgroundColor: "#A5D8F3",
                              color: "#072636",
                            }}
                            // onClick={() => handleAddToCart(item.itemId)}
                          >
                            In Cart
                          </Button>
                        ) : (
                          <Button
                            container
                            spacing={2}
                            sx={{ justifyContent: "center" }}
                            type="submit"
                            variant="contained"
                            onClick={() => handleAddToCart(item.itemId)}
                            sx={{
                              backgroundColor: "#A5D8F3",
                              color: "#072636",
                            }}
                          >
                            Add To Cart
                          </Button>
                        )}
                        <div className="rmv-list-btn">
                          <Button
                            container
                            spacing={2}
                            sx={{ justifyContent: "space-around" }}
                            type="submit"
                            variant="contained"
                            onClick={() => removeItem(item.itemId)}
                          >
                            Remove Item
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Grid>
                );
              })
            : null}
        </Grid>
      </div>
      <div className="ListTitleDisp">
        <h1>Co-Workers</h1>
        <Typography
          sx={{ padding: "1rem" }}
          align="center"
          variant="h5"
          gutterBottom
          component="div"
        >
          Co-Workers Total: ${calculateCoWrksTotal()}
        </Typography>
        <Grid container spacing={2} sx={{ justifyContent: "center" }}>
          {coWorker
            ? coWorker.map((item) => {
                return (
                  <Grid key={item.itemName} item xs={12} sm={6} md={4} lg={3}>
                    <ProductCard
                      keyValue={item.itemId}
                      itemName={item.itemName}
                      buyUrl={item.buyUrl}
                      imgUrl={item.imgUrl}
                      price={item.price}
                      description={item.description}
                    />
                    <div className="list-disp">
                      <div key={item.itemId} className="list-addtocart">
                        {item.cartValue ? (
                          <Button
                            container
                            spacing={2}
                            sx={{ justifyContent: "center" }}
                            disabled
                            type="submit"
                            variant="contained"
                            sx={{
                              backgroundColor: "#A5D8F3",
                              color: "#072636",
                            }}
                            // onClick={() => handleAddToCart(item.itemId)}
                          >
                            In Cart
                          </Button>
                        ) : (
                          <Button
                            container
                            spacing={2}
                            sx={{ justifyContent: "center" }}
                            type="submit"
                            variant="contained"
                            onClick={() => handleAddToCart(item.itemId)}
                            sx={{
                              backgroundColor: "#A5D8F3",
                              color: "#072636",
                            }}
                          >
                            Add To Cart
                          </Button>
                        )}
                        <div className="rmv-list-btn">
                          <Button
                            container
                            spacing={2}
                            sx={{ justifyContent: "space-around" }}
                            type="submit"
                            variant="contained"
                            onClick={() => removeItem(item.itemId)}
                          >
                            Remove Item
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Grid>
                );
              })
            : null}
        </Grid>
      </div>
    </>
  );
};

export default Lists;
