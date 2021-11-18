import React, { useState, useEffect } from "react";

import { useQuery } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import CartItem from "./CartItem";
import Typography from "@mui/material/Typography";

const lodash = require("lodash");

const Cart = () => {
  const { data, loading } = useQuery(GET_ME);
  const userData = data?.me || {};

  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (!loading && userData) {
      let cartArr = userData.savedProducts.filter((item) => item.cartValue);
      setCart(cartArr);
    }
  }, [userData, loading]);

  function calculateTotal() {
    let cartPriceArray = [];
    userData.savedProducts.forEach((item) => {
      if (item.cartValue) {
        let itemPrice = item.price.replace("$", "");
        console.log("itemPrice: ", itemPrice);
        let itemPriceNum = parseInt(itemPrice);
        console.log("itemPriceNum: ", itemPriceNum);
        let fixedItemPrice = Math.abs(itemPriceNum);
        console.log("fixedItemPrice: ", fixedItemPrice);
        cartPriceArray.push(fixedItemPrice);
      }
    });

    console.log("cartPriceArray: ", cartPriceArray);

    let cartTotal = lodash.sum(cartPriceArray);
    console.log("cartTotal: ", cartTotal);
    return cartTotal;
  }

  if (loading) {
    return (
      <Typography variant="h2" gutterBottom component="div">
        Loading...
      </Typography>
    );
  }

  return (
    <>
      <Typography
        sx={{ padding: "1rem" }}
        align="center"
        variant="h3"
        gutterBottom
        component="div"
      >
        Your Cart
      </Typography>

      <Typography
        sx={{ padding: "1rem" }}
        align="center"
        variant="h3"
        gutterBottom
        component="div"
      >
        Total: ${calculateTotal()}
      </Typography>

      {cart.map((item) => {
        return (
          <CartItem
            key={item.itemId}
            productId={item.itemId}
            product={item.itemName}
            price={item.price}
            imgUrl={item.imgUrl}
          />
        );
      })}
    </>
  );
};

export default Cart;
