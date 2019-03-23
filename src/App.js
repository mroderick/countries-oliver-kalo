import React, { Component } from 'react';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { InMemoryCache, defaultDataIdFromObject } from 'apollo-cache-inmemory';

import ContinentsPage from './pages/ContinentsPage';
import CountriesPage from './pages/CountriesPage';


const cache = new InMemoryCache({
  // TODO: Verify these custom keys are working
  dataIdFromObject: object => {
    console.debug('DEBUG: object.__typename', object.__typename)
    switch (object.__typename) {
      case 'continent': return `continent:${object.code}`; // use `continent` prefix and `code` as the primary key
      case 'country': return `country:${object.code}`; // use `country` prefix and `code` as the primary key
      default: return defaultDataIdFromObject(object); // fall back to default handling
    }
  }
});

const client = new ApolloClient({
  uri: "https://countries.trevorblades.com/",
  cache
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <header>
            Countries App
          </header>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/continents/">Continents</Link>
            </li>
            <li>
              <Link to="/countries/">Countries</Link>
            </li>
          </ul>
          <Route path="/continents" exact component={ContinentsPage} />
          <Route path="/countries" exact component={CountriesPage} />
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
