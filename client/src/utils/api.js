// route to get logged in user's info (needs the token)
// export const getMe = (token) => {
//   return fetch("/api/users/me", {
//     headers: {
//       "Content-Type": "application/json",
//       authorization: `Bearer ${token}`,
//     },
//   });
// };

// export const createUser = (userData) => {
//   return fetch("/api/users", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(userData),
//   });
// };

// export const loginUser = (userData) => {
//   return fetch("/api/users/login", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(userData),
//   });
// };

// ! TO MAKE SURE WE DO NOT GO OVER OUR USAGE PLEASE TRY AND COMMENT OUT FETCH REQUESTS WHEN NOT IN USE

// export const getStoreInfo = async (zip) => {
// 	try {
// 		const response = await fetch(
// 			`https://target-com-store-product-reviews-locations-data.p.rapidapi.com/location/search?zip=${zip}&radius=20`,
// 			{
// 				method: "GET",
// 				headers: {
// 					"x-rapidapi-host":
// 						"target-com-store-product-reviews-locations-data.p.rapidapi.com",
// 					"x-rapidapi-key": process.env.REACT_APP_API_KEY,
// 				},
// 			}
// 		);
// 		const data = await response.json();
// 		const store = data.locations[0];

// 		const storeData = {
// 			storeId: store.location_id,
// 			address: store.address.address_line1,
// 		};
// 		console.log(storeData);
// 		return storeData;
// 	} catch (err) {
// 		console.log(err);
// 	}
// };

export const productSearch = async (query) => {
  try {
    const response = await fetch(
      `https://target-com-store-product-reviews-locations-data.p.rapidapi.com/product/search?store_id=2126&keyword=${query}&offset=0&limit=24&sponsored=1&rating=0`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host":
            "target-com-store-product-reviews-locations-data.p.rapidapi.com",
          "x-rapidapi-key": process.env.REACT_APP_API_KEY,
        },
      }
    );

    const data = await response.json();

    const results = data.products;

    const searchData = [];

    for (let i = 0; i < results.length; i++) {
      const item = {
        itemId: results[i].tcin,
        itemName: results[i].item.product_description.title,
        price: results[i].price.formatted_current_price,
        imgUrl: results[i].item.enrichment.images.primary_image_url,
        buyUrl: results[i].item.enrichment.buy_url,
        description: results[i].item.product_description.soft_bullets.bullets,
      };

      searchData.push(item);
    }
    console.log("searchData: ", searchData);
    return searchData;
  } catch (err) {
    console.log(err);
  }
};
