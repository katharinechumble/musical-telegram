import React from "react";
import ProductCard from "./ProductCard";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const SearchResults = () => {
	const fakeArr = [
		{
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
		},
		{
			buyUrl:
				"https://www.target.com/p/11oz-glass-jar-3-wick-candle-peace-tranquility-chesapeake-bay-candle/-/A-52481331",
			imgUrl:
				"https://target.scene7.com/is/image/Target/GUEST_11da501f-17c1-474a-964d-fb84235466ce",
			itemName:
				"11oz Glass Jar 3-Wick Candle Peace & Tranquility - Chesapeake Bay Candle",
			price: "$14.99",
			description: [
				"Cashmere and jasmine scented candle with a soft, sweet and fresh aroma",
				"Soy wax candle with essential oils for an effective and smooth burn",
				"Comes in a frosted glass container with a wooden lid for a stylish look",
				"Perfect for creating an inviting and cozy atmosphere in any room",
				"100% recyclable in partnership with TerraCycle",
			],
		},
		{
			buyUrl:
				"https://www.target.com/p/12oz-lidded-black-jar-candle-vanilla-birch-the-collection-by-chesapeake-bay-candle/-/A-54021455",
			imgUrl:
				"https://target.scene7.com/is/image/Target/GUEST_590de3ae-a11d-4f98-a891-cc62f8324c21",
			itemName:
				"12oz Lidded Black Jar Candle Vanilla Birch - The Collection By Chesapeake Bay Candle",
			price: "$10.99",
			description: [
				"Soy wax blend candle with a burn time of approx. 54 hours",
				"Infused with a soothing vanilla fragrance",
				"Perfect way to spruce up your home ambience",
				"Poured in the U.S.",
				"100% recyclable in partnership with TerraCycle",
			],
		},
		{
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
		},
		{
			buyUrl:
				"https://www.target.com/p/11oz-glass-jar-3-wick-candle-peace-tranquility-chesapeake-bay-candle/-/A-52481331",
			imgUrl:
				"https://target.scene7.com/is/image/Target/GUEST_11da501f-17c1-474a-964d-fb84235466ce",
			itemName:
				"11oz Glass Jar 3-Wick Candle Peace & Tranquility - Chesapeake Bay Candle",
			price: "$14.99",
			description: [
				"Cashmere and jasmine scented candle with a soft, sweet and fresh aroma",
				"Soy wax candle with essential oils for an effective and smooth burn",
				"Comes in a frosted glass container with a wooden lid for a stylish look",
				"Perfect for creating an inviting and cozy atmosphere in any room",
				"100% recyclable in partnership with TerraCycle",
			],
		},
		{
			buyUrl:
				"https://www.target.com/p/12oz-lidded-black-jar-candle-vanilla-birch-the-collection-by-chesapeake-bay-candle/-/A-54021455",
			imgUrl:
				"https://target.scene7.com/is/image/Target/GUEST_590de3ae-a11d-4f98-a891-cc62f8324c21",
			itemName:
				"12oz Lidded Black Jar Candle Vanilla Birch - The Collection By Chesapeake Bay Candle",
			price: "$10.99",
			description: [
				"Soy wax blend candle with a burn time of approx. 54 hours",
				"Infused with a soothing vanilla fragrance",
				"Perfect way to spruce up your home ambience",
				"Poured in the U.S.",
				"100% recyclable in partnership with TerraCycle",
			],
		},
	];

	return (
		<>
			<form
				onSubmit={() => {
					alert("hello");
				}}
				style={{
					display: "flex",
					flexDirection: "column",
					marginBottom: "8px",
				}}
			>
				<TextField
					variant="outlined"
					label="Search"
					margin="normal"
					fullWidth
					InputProps={{
						startAdornment: (
							<InputAdornment position="end">
								<SearchIcon />
							</InputAdornment>
						),
					}}
				/>
				<Button
					type="submit"
					variant="contained"
					size="large"
					endIcon={<ShoppingCartIcon />}
				>
					Shop
				</Button>
			</form>

			<Grid container spacing={2} sx={{ justifyContent: "center" }}>
				{fakeArr.map((item, i) => {
					return (
						<Grid item xs={12} sm={6} md={4} lg={3}>
							<ProductCard
								keyValue={i}
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

export default SearchResults;
