
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'isomorphic-unfetch';

import Layout from '../components/Layout';
import ResourceList from '../components/ResourceList';
const httpLink = createHttpLink({
    uri: "http://localhost:8000/graphql",
    fetch
})
const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
});


export default () => (
    <ApolloProvider client={client} >
    <Layout>
      <h1>Useful Learning Resources</h1>
        <ResourceList />
    </Layout>
    </ApolloProvider>
  )