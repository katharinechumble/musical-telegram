import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// import { ApolloProvider } from "@apollo/react-hooks";
// import ApolloClient from "apollo-boost";

// * Components
import Navbar from "./components/Navbar";
// import { StoreProvider } from "./utils/GlobalState";

import SearchResults from "./components/SearchResults";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import SavedItems from "./components/SavedItems";
import Lists from "./components/Lists";
import Cart from "./components/Cart";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
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
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/lists" component={Lists} />
          </Switch>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
