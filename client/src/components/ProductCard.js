import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const ProductCard = () => {
	const fakeData = {
		buyUrl:
			"https://www.target.com/p/10-5oz-glass-jar-lavender-and-eucalyptus-candle-project-62-8482/-/A-76550427",
		imgUrl:
			"https://target.scene7.com/is/image/Target/GUEST_f47c2196-332e-45ff-ac50-43c41db4d81e",
		itemName:
			"10.5oz Glass Jar Lavender and Eucalyptus Candle - Project 62&#8482;",
		price: "$10.00",
		description: [
			"Create a fresh, inviting ambience in your space",
			"The glass container adds style while making it easy to display",
			"It has a burn time of up to 70 hours",
		],
	};

	const nameSplit = fakeData.itemName.split("-");
	const cleanedName = nameSplit[0].trim();

	console.log(fakeData.description);

	return (
		<Card sx={{ maxWidth: 345 }}>
			<CardMedia
				component="img"
				height="300"
				image={fakeData.imgUrl}
				alt="product"
			/>
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{cleanedName}
				</Typography>
				<Typography gutterBottom variant="subtitle1" component="div">
					{fakeData.price}
				</Typography>

				{fakeData.description.map((i) => {
					return (
						<Typography key={i} gutterBottom component="div" variant="caption">
							-{i}
						</Typography>
					);
				})}
			</CardContent>
			<CardActions sx={{ display: "flex", justifyContent: "space-around" }}>
				<Button variant="contained" size="small">
					Add to List
				</Button>
				<a
					href={fakeData.buyUrl}
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
