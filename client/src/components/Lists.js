import React, { useState, useEffect } from "react";

import ProductCard from "./ProductCard";
import Button from "@mui/material/Button";

import { useQuery } from "@apollo/client";
import { GET_ME } from "../utils/queries";

import Grid from "@mui/material/Grid";

//addToCart Functionality.
let listItemArr = [];
const addToCart = () => {
  console.log("You clicked the add to cart button");
  console.log("listItemArr: ", listItemArr);
  //Now that I'm getting all the items on the list page to the cartArray when hitting
  //Add to Cart need to narrow it down so that it only adds the selected item to the cart array.
  for (let i = 0; i < listItemArr.length; i++) {
    console.log(listItemArr.listItems);
  }
};

const Lists = () => {
  const { data, loading } = useQuery(GET_ME);
  const userData = data?.me || {};
  //console.log("userData: ", userData);

  //Trying to get the selected item from the list to the cartArray
  //So that can be pushed to the eventual cart page.
  let userItems = userData.savedProducts;
  listItemArr.push(userItems);
  console.log("userItems: ", userItems);

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

  if (loading) {
    return <h2>Loading...</h2>;
  }
  //   console.log("family: ", family);

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
                          onClick={addToCart}
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
                          onClick={addToCart}
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
                          onClick={addToCart}
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
