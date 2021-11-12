import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ME } from "../utils/queries";

import Grid from "@mui/material/Grid";
import ProductCard from "./ProductCard";

const SavedItems = () => {
	const { data } = useQuery(GET_ME);
	const userData = data?.me || {};
	console.log("userData: ", userData);

	const userDataLength = Object.keys(userData).length;

	if (!userDataLength) {
		return <h2>LOADING...</h2>;
	}
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
						</Grid>
					);
				})}
			</Grid>
		</>
	);
};

export default SavedItems;
