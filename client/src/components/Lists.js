import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_ME } from "../utils/queries";

const Lists = () => {
	const { data, loading } = useQuery(GET_ME);
	const userData = data?.me || {};
	console.log("userData: ", userData);

	const [family, setFamily] = useState([]);
	const [friends, setFriends] = useState([]);
	const [coWorker, setCoWorker] = useState([]);

	useEffect(() => {
		if (!loading && userData) {
			let familyArr = userData.savedProducts.filter(
				(item) => item.listTag[0] === "family"
			);
			setFamily(familyArr);

			let friendArr = userData.savedProducts.filter(
				(item) => item.listTag[0] === "friends"
			);
			setFriends(friendArr);

			let coWorkerArr = userData.savedProducts.filter(
				(item) => item.listTag[0] === "co-workers"
			);
			setCoWorker(coWorkerArr);
		}
	}, [userData, loading]);

	if (loading) {
		return <h2>Loading...</h2>;
	}
	console.log("family: ", family);
	return (
		<>
			<div>
				<h1>Family</h1>
				{family
					? family.map((item) => <p key={item.itemId}>{item.itemName}</p>)
					: null}
			</div>
			<div>
				<h1>Friends</h1>
				{friends
					? friends.map((item) => <p key={item.itemId}>{item.itemName}</p>)
					: null}
			</div>
			<div>
				<h1>Co-Workers</h1>
				{coWorker
					? coWorker.map((item) => <p key={item.itemId}>{item.itemName}</p>)
					: null}
			</div>
		</>
	);
};

export default Lists;
