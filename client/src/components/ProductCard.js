import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { useMutation } from "@apollo/client";
import { SAVE_PRODUCT } from "../utils/mutations";
import Auth from "../utils/auth";

const ProductCard = (props) => {
	const [saveProduct] = useMutation(SAVE_PRODUCT);

	const handleSaveProduct = async (event) => {
		event.preventDefault();
		console.log(event.target.id);

		const productId = event.target.id;

		const productToSave = props.searchResults.find(
			(product) => product.itemId === productId
		);
		console.log("productToSave: ", productToSave);

		const token = Auth.loggedIn() ? Auth.getToken() : null;

		if (!token) {
			return false;
		}

		try {
			const { data } = await saveProduct({
				variables: {
					productData: { ...productToSave },
				},
			});

			return data;
		} catch (err) {
			console.log(err);
		}
	};

	const nameSplit = props.itemName.split("-");
	const cleanedName = nameSplit[0].trim();

	return (
		<Card sx={{ maxWidth: 345 }} key={props.keyValue}>
			<CardMedia
				component="img"
				height="300"
				image={props.imgUrl}
				alt="product"
			/>
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{cleanedName}
				</Typography>
				<Typography gutterBottom variant="subtitle1" component="div">
					{props.price}
				</Typography>

				{props.description.map((i) => {
					return (
						<Typography key={i} gutterBottom component="div" variant="caption">
							-{i}
						</Typography>
					);
				})}
			</CardContent>
			<CardActions
				sx={{
					display: "flex",
					justifyContent: "space-around",
				}}
			>
				<Button
					onClick={handleSaveProduct}
					variant="contained"
					size="small"
					id={props.keyValue}
				>
					Add to List
				</Button>
				<a
					href={props.buyUrl}
					target="_blank"
					rel="noopener noreferrer"
					style={{ textDecoration: "none" }}
				>
					<Button size="small">Learn More</Button>
				</a>
			</CardActions>
		</Card>
	);
};

export default ProductCard;
