import React from 'react';
import { Query } from "react-apollo";

import { FetchContinents } from '../../apollo/queries';

import List from './List';


const Data = () => {
  return (
    <Query query={FetchContinents}>
      {({ loading, error, data }) => {
        if (loading) return "Loading..";
        if (error) return `Error! ${error.message}`;

        return <List continents={data.continents}/>;
      }}
    </Query>
  )
}

export default Data;
