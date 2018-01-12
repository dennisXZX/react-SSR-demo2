import React from 'react';
import Home from './components/Home';
import UsersList, { loadData } from './components/UsersList';

// using React Router Config to set up routing
// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
export default [
  {
    path: '/',
    component: Home,
    exact: true
  },
  {
    loadData: loadData,
    path: '/users',
    component: UsersList
  }
];