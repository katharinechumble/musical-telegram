import React from "react";

import CartItem from "./CartItem";
import Typography from "@mui/material/Typography";

const Cart = () => {
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

      {fakeArr.map((item) => {
        return (
          <CartItem
            product={item.product}
            price={item.price}
            imgUrl={item.imgUrl}
          />
        );
      })}
    </>
  );
};

export default Cart;
