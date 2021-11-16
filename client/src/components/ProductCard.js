import React, { useState } from "react";

import { useMutation } from "@apollo/client";
import { SAVE_PRODUCT } from "../utils/mutations";
import Auth from "../utils/auth";

// * Material UI
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

// Modal Style
const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};

const ProductCard = (props) => {
	// * Items State
	const [searchResults] = useState(props.searchResults);
	const [selectedItem, setSelectedItem] = useState("");
	const [radioValue, setRadioValue] = useState("family");

	// * Modal State
	const [open, setOpen] = useState(false);
	const handleOpen = (event) => {
		event.preventDefault();
		setOpen(true);

		const productId = event.target.id;
		setSelectedItem(productId);
	};
	const handleClose = (event) => {
		event.preventDefault();
		setOpen(false);
	};

	// * Mutation
	const [saveProduct] = useMutation(SAVE_PRODUCT);

	// * Handlers
	const handleSaveProduct = async (id) => {
		const productToSave = await searchResults.find(
			(product) => product.itemId === id
		);

		const token = Auth.loggedIn() ? Auth.getToken() : null;

		if (!token) {
			return false;
		}

		try {
			const { data } = await saveProduct({
				variables: {
					productData: {
						...productToSave,
						listTag: radioValue,
					},
				},
			});
			console.log("data: ", data);
			return data;
		} catch (err) {
			console.log(err);
		}
	};

	const handleRadioChange = (event) => {
		event.preventDefault();

		setRadioValue(event.target.value);
	};

	// * Name Util

	const nameSplit = props.itemName.split("-");
	const cleanedName = nameSplit[0].trim();

	// * Location Util
	const getLocation = () => {
		const location = window.location.pathname;

		if (location === "/lists") {
			return true;
		} else {
			return false;
		}
	};

	// @ +++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	return (
		<>
			<Card
				sx={{ maxWidth: 345, border: ".15rem solid lightgrey" }}
				key={props.keyValue}
			>
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
							<Typography
								key={i}
								gutterBottom
								component="div"
								variant="caption"
							>
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
					{getLocation() ? null : (
						<Button
							onClick={handleOpen}
							variant="contained"
							size="small"
							id={props.keyValue}
						>
							Add to List
						</Button>
					)}
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

			<div>
				<Modal
					open={open}
					onClose={handleClose}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Box sx={style}>
						<Typography id="modal-modal-title" variant="h6" component="h2">
							What List Would You Like to Add To?
						</Typography>
						<form onSubmit={() => handleSaveProduct(selectedItem)}>
							<FormControl component="fieldset">
								<FormLabel component="legend">List</FormLabel>
								<RadioGroup
									aria-label="List"
									defaultValue="family"
									name="radio-buttons-group"
									onChange={handleRadioChange}
								>
									<FormControlLabel
										value="family"
										control={<Radio />}
										label="Family"
									/>
									<FormControlLabel
										value="friends"
										control={<Radio />}
										label="Friends"
									/>
									<FormControlLabel
										value="co-workers"
										control={<Radio />}
										label="Co-Workers"
									/>
								</RadioGroup>
								<Button type="submit" variant="contained" size="small">
									Add to List
								</Button>
							</FormControl>
						</form>
					</Box>
				</Modal>
			</div>
		</>
	);
};

export default ProductCard;
