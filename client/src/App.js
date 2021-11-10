import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import Navbar from "./components/Navbar";
import SearchResults from "./components/SearchResults";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import SavedItems from "./components/SavedItems";

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

					<Switch>
						<Route exact path="/" component={SearchResults} />
						<Route exact path="/login" component={Login} />
						<Route exact path="/signup" component={SignUp} />
						<Route exact path="/saveditems" component={SavedItems} />
					</Switch>
				</>
			</Router>
		</ApolloProvider>
	);
}

export default App;
