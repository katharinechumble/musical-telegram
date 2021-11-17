import React, { useState, useEffect } from "react";

import ProductCard from "./ProductCard";
import Button from "@mui/material/Button";

import { useQuery, useMutation } from "@apollo/client";

import { GET_ME } from "../utils/queries";
import { ADD_TO_CART } from "../utils/mutations";
import Auth from "../utils/auth";

import Grid from "@mui/material/Grid";
import { REMOVE_LIST_ITEM } from "../utils/mutations";

//addToCart Functionality global.

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

	return (
		<>
			<div>
				<h1>Family</h1>
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
										<div key={item.itemId} className="list-addtocart">
											{item.cartValue ? (
												<Button
													disabled
													type="submit"
													variant="contained"
													sx={{
														backgroundColor: "#A5D8F3",
														color: "#072636"
													  }}
													// onClick={() => handleAddToCart(item.itemId)}
												>
													In Cart
												</Button>
											) : (
												<Button
													type="submit"
													variant="contained"
													onClick={() => handleAddToCart(item.itemId)}
													sx={{
														backgroundColor: "#A5D8F3",
														color: "#072636"
													  }}
												>
													Add To Cart
												</Button>
											)}

											<Button
												type="submit"
												variant="contained"
												onClick={() => removeItem(item.itemId)}
											>
												Remove Item
											</Button>
										</div>
									</Grid>
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
									<Grid key={item.itemName} item xs={12} sm={6} md={4} lg={3}>
										<ProductCard
											keyValue={item.itemId}
											itemName={item.itemName}
											buyUrl={item.buyUrl}
											imgUrl={item.imgUrl}
											price={item.price}
											description={item.description}
										/>
										<div key={item.itemId} className="list-addtocart">
											{item.cartValue ? (
												<Button
													disabled
													type="submit"
													variant="contained"
													// onClick={() => handleAddToCart(item.itemId)}
													sx={{
														backgroundColor: "#A5D8F3",
														color: "#072636"
													  }}
												>
													In Cart
												</Button>
											) : (
												<Button
													type="submit"
													variant="contained"
													onClick={() => handleAddToCart(item.itemId)}
												>
													Add To Cart
												</Button>
											)}

											<Button
												type="submit"
												variant="contained"
												onClick={() => removeItem(item.itemId)}
											>
												Remove Item
											</Button>
										</div>
									</Grid>
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
									<Grid key={item.itemName} item xs={12} sm={6} md={4} lg={3}>
										<ProductCard
											keyValue={item.itemId}
											itemName={item.itemName}
											buyUrl={item.buyUrl}
											imgUrl={item.imgUrl}
											price={item.price}
											description={item.description}
										/>
										<div key={item.itemId} className="list-addtocart">
											{item.cartValue ? (
												<Button
													disabled
													type="submit"
													variant="contained"
													sx={{
														backgroundColor: "#A5D8F3",
														color: "#072636"
													  }}
													// onClick={() => handleAddToCart(item.itemId)}
												>
													In Cart
												</Button>
											) : (
												<Button
													type="submit"
													variant="contained"
													onClick={() => handleAddToCart(item.itemId)}
												>
													Add To Cart
												</Button>
											)}

											<Button
												type="submit"
												variant="contained"
												onClick={() => removeItem(item.itemId)}
											>
												Remove Item
											</Button>
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
