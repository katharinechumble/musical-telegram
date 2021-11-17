import React, { useState, useEffect } from "react";

import { useQuery } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import CartItem from "./CartItem";
import Typography from "@mui/material/Typography";

const Cart = () => {
  const { data, loading } = useQuery(GET_ME);
  const userData = data?.me || {};

  console.log("data: ", data);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (!loading && userData) {
      let cartArr = userData.cartProducts;
      setCart(cartArr);
    }
  }, [userData, loading]);

  if (loading) {
    return (
      <Typography variant="h2" gutterBottom component="div">
        Loading...
      </Typography>
    );
  }

  if (!data.me.cartProducts.length) {
    return (
      <Typography
        variant="h2"
        sx={{ padding: "1rem" }}
        gutterBottom
        component="div"
      >
        Your Cart Is Empty!!!
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
