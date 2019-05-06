import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Layout } from 'antd';
import { ApolloProvider } from "react-apollo";
import Menu from 'components/Menu/index.js';
import { Fetching } from 'components/Fetching/index.js';
import routes from '@/route';
import client from '@/client';
const { Header } = Layout;

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
