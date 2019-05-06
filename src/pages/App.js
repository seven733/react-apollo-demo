import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Layout } from 'antd';
import { ApolloProvider } from "react-apollo-hooks";
import ApolloClient from "apollo-boost";
import Menu from 'components/Menu/index.js';
import { Fetching } from 'components/Fetching/index.js';
import routes from '@/route';
import './App.css';

const { Header } = Layout;

// https://api.github.com/graphql
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

function App() {
  return (
    <Suspense fallback={<Fetching />}>
      <ApolloProvider client={client}>
        <Router>
          <Layout style={{ minHeight: '100vh' }}>
            <Header style={{ background: '#fff' }} >
              <Menu></Menu>
            </ Header>
            <div style={{ margin: '16px' }}>
              <div style={{ padding: 24, background: '#fff', minHeight: '90vh' }}>
                <Switch>
                  { routes.map(route => (
                    <Route path={ route.path } exact={ route.exact } component={ route.component } key={ route.path } />
                  )) }
                </Switch>
              </div>
            </div>
          </Layout>
        </Router>
      </ApolloProvider>
    </Suspense>
  );
}

export default App;
