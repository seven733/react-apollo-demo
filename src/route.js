import React from 'react';
import Home from 'pages/home/index.js';

function Hot() {
  return (<div>
    Hot
  </div>)
}

function New() {
  return (<div>
    <h1>NEW</h1>
  </div>)
}

const routes = [
  {
    path: '/',
    component: Home,
    exact: true
  },
  {
    path: '/hot',
    component: Hot,
  },
  {
    path: '/new',
    component: New,
  },
]

export default routes;