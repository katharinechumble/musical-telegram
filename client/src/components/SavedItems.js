import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_ME } from "../utils/queries";

import Grid from "@mui/material/Grid";
import ProductCard from "./ProductCard";
import { REMOVE_PRODUCT } from "../utils/mutations";

const SavedItems = () => {
  const { data } = useQuery(GET_ME);
  const [deleteProduct] = useMutation(REMOVE_PRODUCT);
  const userData = data?.me || {};
  console.log("userData: ", userData);

  const userDataLength = Object.keys(userData).length;

  if (!userDataLength) {
    return <h2>LOADING...</h2>;
  }

  const handleDeleteProduct = async (itemId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await deleteProduct({
        variables: { itemId: itemId },
        update: (cache) => {
          const data = cache.readQuery({ query: GET_ME });
          const userDataCache = data.me;
          const savedProductsCache = userDataCache.savedProducts;
          const updatedProductsCache = savedProductsCache.filter(
            (item) => item.itemId !== itemId
          );
          data.me.savedProducts = updatedProductsCache;
          cache.writeQuery({
            query: GET_ME,
            data: { data: { ...data.me.savedProducts } },
          });
        },
      });
      removeProductId(itemId);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Grid container spacing={2} sx={{ justifyContent: "center" }}>
        {userData.savedProducts.map((item) => {
          return (
            <Grid
              sx={{ marginTop: "8px" }}
              key={item.itemId}
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
            >
              <ProductCard
                keyValue={item.itemId}
                itemName={item.itemName}
                buyUrl={item.buyUrl}
                imgUrl={item.imgUrl}
                price={item.price}
                description={item.description}
              />
			  <Button className="btn-danger" onClick={() => handleDeleteProduct(item.itemId)}>
				  Delete Item
			  </Button>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default SavedItems;
