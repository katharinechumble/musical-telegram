import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useMutation } from "@apollo/client";

import Auth from "../utils/auth";

import { REMOVE_CART_ITEM } from "../utils/mutations";

const CartItem = (props) => {
	const [removeCartItem] = useMutation(REMOVE_CART_ITEM);

	//remove cart item functionality.
	const removeFromCart = async (itemId) => {
		const token = Auth.loggedIn() ? Auth.getToken() : null;
		const removeId = await itemId;

		if (!token) {
			return false;
		}
		try {
			const { data } = await removeCartItem({
				variables: { itemId: removeId },
			});

			return data;
		} catch (err) {
			console.error(err);
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
							onClick={() => removeFromCart(props.productId)}
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
