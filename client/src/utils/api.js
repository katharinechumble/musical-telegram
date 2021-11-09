export const getStoreInfo = async (zip) => {
	try {
		const response = await fetch(
			`https://target-com-store-product-reviews-locations-data.p.rapidapi.com/location/search?zip=${zip}&radius=20`,
			{
				method: "GET",
				headers: {
					"x-rapidapi-host":
						"target-com-store-product-reviews-locations-data.p.rapidapi.com",
					"x-rapidapi-key":
						"26eb2eb880mshcaceb65a68a8302p1e6fc8jsndb5c311ac090",
				},
			}
		);

		console.log(response);
	} catch (err) {
		console.log(err);
	}
};

export const productSearch = async (query, storeId) => {
	try {
		const response = await fetch(
			`https://target-com-store-product-reviews-locations-data.p.rapidapi.com/product/search?store_id=${storeId}&keyword=${query}&offset=0&limit=24&sponsored=1&rating=0`,
			{
				method: "GET",
				headers: {
					"x-rapidapi-host":
						"target-com-store-product-reviews-locations-data.p.rapidapi.com",
					"x-rapidapi-key":
						"26eb2eb880mshcaceb65a68a8302p1e6fc8jsndb5c311ac090",
				},
			}
		);

		console.log(response);
	} catch (err) {
		console.log(err);
	}
};
