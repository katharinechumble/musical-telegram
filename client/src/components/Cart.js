import React from "react";

import CartItem from "./CartItem";
import Typography from "@mui/material/Typography";

const Cart = () => {
	const fakeArr = [
		{
			product: "Polyresin Wood Accent Lamp White (Includes LED Light Bulb)",
			price: "$10",
			imgUrl:
				"https://target.scene7.com/is/image/Target/GUEST_56950027-a834-4588-99b9-38b27b2bc797",
		},
		{
			product: "Textural Ceramic Mini Lamp White",
			price: "$100",
			imgUrl:
				"https://target.scene7.com/is/image/Target/GUEST_214f0ed2-0c26-496e-9032-66d0668c2c7a",
		},
		{
			product:
				"360 Lighting Nathan Gold Cage USB Black Shade Table Lamps Set of 2",
			price: "$10",
			imgUrl:
				"https://target.scene7.com/is/image/Target/GUEST_0446f55a-aa97-4794-ac09-99ac5cb8cfaf",
		},
	];

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
