import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Layout } from 'antd';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import Menu from 'components/Menu/index.js';
import routes from '@/route';
import client from '@/client';
import { createStore, StoreProvider } from 'easy-peasy';
import initStore from '@/store';
const { Header } = Layout;

const store = createStore(initStore);

function App() {
  return (
    <StoreProvider store={store}>
      <ApolloHooksProvider client={client}>
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
      </ApolloHooksProvider>
    </StoreProvider>
  );
}

export default App;
