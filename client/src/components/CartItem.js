import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useMutation } from "@apollo/client";

import Auth from "../utils/auth";

import { REMOVE_CART_ITEM, ADD_TO_CART } from "../utils/mutations";

const CartItem = (props) => {
	//remove cart item functionality.
	const [cartToTrue] = useMutation(ADD_TO_CART);
	//Add To Cart functionality.
	const handleAddToCart = async (itemId) => {
		const token = Auth.loggedIn() ? Auth.getToken() : null;

		if (!token) {
			return false;
		}

		const cartToggle = false;

		try {
			const { data } = await cartToTrue({
				variables: {
					itemId: itemId,
					cartBool: cartToggle,
				},
			});
			return data;
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<>
			<Card
				sx={{
					display: "flex",
					width: "auto",
					justifyContent: "space-between",
					marginBottom: "8px",
					border: ".25rem solid black",
				}}
			>
				<Box sx={{ display: "flex", flexDirection: "column" }}>
					<CardContent sx={{ flex: "1 0 auto" }}>
						<Typography component="div" variant="h5">
							{props.product}
						</Typography>
						<Typography
							variant="subtitle1"
							color="text.secondary"
							component="div"
						>
							{props.price}
						</Typography>
					</CardContent>
					<Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
						<Button
							onClick={() => handleAddToCart(props.productId)}
							color="warning"
						>
							Remove
						</Button>
					</Box>
				</Box>
				<CardMedia
					component="img"
					sx={{ width: 151 }}
					image={props.imgUrl}
					alt="Live from space album cover"
				/>
			</Card>
		</>
	);
};

export default CartItem;
