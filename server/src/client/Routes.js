import React from 'react';
import HomePage from './pages/HomePage';
import UsersListPage from './pages/UsersListPage';

// using React Router Config to set up routing
// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
export default [
  {
    ...HomePage,
    path: '/',
    exact: true
  },
  {
    ...UsersListPage,
    path: '/users',
  }
];