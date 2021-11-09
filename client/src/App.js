import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import Navbar from "./components/Navbar";

const client = new ApolloClient({
	request: (operation) => {
		const token = localStorage.getItem("id_token");

		operation.setContext({
			headers: {
				authorization: token ? `Bearer ${token}` : "",
			},
		});
	},
	uri: "/graphql",
});

function App() {
	return (
		<ApolloProvider client={client}>
			<Router>
				<>
					<Navbar />
					<Switch>{/* Here's where the pages will go */}</Switch>
				</>
			</Router>
		</ApolloProvider>
	);
}

export default App;
