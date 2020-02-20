import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { createHttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";

const httpLink = createHttpLink({ uri: "/graphql" });
const errorLink = onError(({ networkError }) => {
  if (networkError.statusCode === 401) {
    alert('404')
  }
});

const link = errorLink.concat(httpLink);
export default new ApolloClient({
  link,
  cache: new InMemoryCache()
});
