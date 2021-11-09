// ! TO MAKE SURE WE DO NOT GO OVER OUR USAGE PLEASE TRY AND COMMENT OUT FETCH REQUESTS WHEN NOT IN USE

// require("dotenv").config();

// export const getStoreInfo = async (zip) => {
// 	try {
// 		const response = await fetch(
// 			`https://target-com-store-product-reviews-locations-data.p.rapidapi.com/location/search?zip=${zip}&radius=20`,
// 			{
// 				method: "GET",
// 				headers: {
// 					"x-rapidapi-host":
// 						"target-com-store-product-reviews-locations-data.p.rapidapi.com",
// 					"x-rapidapi-key":
// 						"26eb2eb880mshcaceb65a68a8302p1e6fc8jsndb5c311ac090",
// 				},
// 			}
// 		);
// 		const data = await response.json();
// 		const store = data.locations[0];

// 		const storeData = {
// 			storeId: store.location_id,
// 			address: store.address.address_line1,
// 		};

// 		return storeData;
// 	} catch (err) {
// 		console.log(err);
// 	}
// };

// export const productSearch = async (query, storeId) => {
// 	try {
// 		const response = await fetch(
// 			`https://target-com-store-product-reviews-locations-data.p.rapidapi.com/product/search?store_id=${storeId}&keyword=${query}&offset=0&limit=24&sponsored=1&rating=0`,
// 			{
// 				method: "GET",
// 				headers: {
// 					"x-rapidapi-host":
// 						"target-com-store-product-reviews-locations-data.p.rapidapi.com",
// 					"x-rapidapi-key":
// 						"26eb2eb880mshcaceb65a68a8302p1e6fc8jsndb5c311ac090",
// 				},
// 			}
// 		);

// 		const data = await response.json();
// 		console.log(data.products);
// 		const results = data.products;

// 		const searchData = [];

// 		for (let i = 0; i < results.length; i++) {
// 			const item = {
// 				itemName: results[i].item.product_description.title,
// 				price: results[i].price.formatted_current_price,
// 				imgUrl: results[i].item.enrichment.images.primary_image_url,
// 				buyUrl: results[i].item.enrichment.buy_url,
// 				description: results[i].item.product_description.soft_bullets.bullets,
// 			};

// 			searchData.push(item);
// 		}

// 		return searchData
// 	} catch (err) {
// 		console.log(err);
// 	}
// };
