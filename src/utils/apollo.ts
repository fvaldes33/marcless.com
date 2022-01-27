// import fetch from "isomorphic-fetch";
import {
  ApolloClient,
  InMemoryCache,
} from "@apollo/client";
import possibleTypes from '../possible-types.json';

const cache = new InMemoryCache({
  possibleTypes,
});

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_STOREFRONT_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-Shopify-Storefront-Access-Token': process.env.NEXT_PUBLIC_STOREFRONT_TOKEN!,
  },
  cache
});

export default client;
