import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const CartItem = (props) => {
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
						<Button color="warning">Remove</Button>
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
