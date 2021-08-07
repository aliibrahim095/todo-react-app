import React from 'react';
import App from './App';
import { ApolloProvider,ApolloClient, InMemoryCache } from '@apollo/react-hooks';
import dotenv from 'dotenv'

dotenv.config();
const client = new ApolloClient({
  uri: process.env.REACT_APP_GCMS_URL,
  cache: new InMemoryCache(),
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);