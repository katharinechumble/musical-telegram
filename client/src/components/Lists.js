import React, { useState, useEffect } from "react";

import ProductCard from "./ProductCard";
import Button from "@mui/material/Button";

import { useQuery } from "@apollo/client";
import { GET_ME } from "../utils/queries";

import Grid from "@mui/material/Grid";

//addToCart Functionality.
let userItems;
let cartArray = [];

const Lists = () => {
  const { data, loading } = useQuery(GET_ME);
  const userData = data?.me || {};

  const [family, setFamily] = useState([]);
  const [friends, setFriends] = useState([]);
  const [coWorker, setCoWorker] = useState([]);

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

  userItems = userData.savedProducts;
  //Add To Cart functionality.
  const handleAddToCart = async (itemId) => {
    const productToCart = userItems.find((item) => item.itemId === itemId);
    const cartProdName = productToCart.itemName;
    const cartProdPrice = productToCart.price;
    const cartProdId = productToCart.itemId;

    cartArray.push({ cartProdName, cartProdPrice, cartProdId });
    console.log("cartArray: ", cartArray);
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <div>
        <h1>Family</h1>
        <Grid container spacing={2} sx={{ justifyContent: "center" }}>
          {family
            ? family.map((item) => {
                return (
                  <>
                    <Grid key={item.itemId} item xs={12} sm={6} md={4} lg={3}>
                      <ProductCard
                        keyValue={item.itemId}
                        itemName={item.itemName}
                        buyUrl={item.buyUrl}
                        imgUrl={item.imgUrl}
                        price={item.price}
                        description={item.description}
                      />
                      <div className="list-addtocart">
                        <Button
                          type="submit"
                          variant="contained"
                          onClick={() => handleAddToCart(item.itemId)}
                        >
                          Add To Cart
                        </Button>
                      </div>
                    </Grid>
                  </>
                );
              })
            : null}
        </Grid>
      </div>
      <div>
        <h1>Friends</h1>
        <Grid container spacing={2} sx={{ justifyContent: "center" }}>
          {friends
            ? friends.map((item) => {
                return (
                  <>
                    <Grid key={item.itemId} item xs={12} sm={6} md={4} lg={3}>
                      <ProductCard
                        keyValue={item.itemId}
                        itemName={item.itemName}
                        buyUrl={item.buyUrl}
                        imgUrl={item.imgUrl}
                        price={item.price}
                        description={item.description}
                      />
                      <div className="list-addtocart">
                        <Button
                          type="submit"
                          variant="contained"
                          onClick={() => handleAddToCart(item.itemId)}
                        >
                          Add To Cart
                        </Button>
                      </div>
                    </Grid>
                  </>
                );
              })
            : null}
        </Grid>
      </div>
      <div>
        <h1>Co-Workers</h1>
        <Grid container spacing={2} sx={{ justifyContent: "center" }}>
          {coWorker
            ? coWorker.map((item) => {
                return (
                  <>
                    <Grid key={item.itemId} item xs={12} sm={6} md={4} lg={3}>
                      <ProductCard
                        keyValue={item.itemId}
                        itemName={item.itemName}
                        buyUrl={item.buyUrl}
                        imgUrl={item.imgUrl}
                        price={item.price}
                        description={item.description}
                      />
                      <div className="list-addtocart">
                        <Button
                          type="submit"
                          variant="contained"
                          onClick={() => handleAddToCart(item.itemId)}
                        >
                          Add To Cart
                        </Button>
                      </div>
                    </Grid>
                  </>
                );
              })
            : null}
        </Grid>
      </div>
    </>
  );
};

export default Lists;
