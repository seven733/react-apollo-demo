import ApolloClient from "apollo-boost";

// https://api.github.com/graphql
export default new ApolloClient({
  uri: "/graphql"
});
