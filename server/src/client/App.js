import React from 'react'
import { renderRoutes } from 'react-router-config';
import Header from './components/Header';
import { fetchCurrentUser } from './actions'

const App = ({ route }) => {
  return (
    <div>
      <Header />
      {renderRoutes(route.routes)}
    </div>
  )
};

export default {
  component: App,
  // extract the dispatch function from the store and manually dispatch an action
  loadData: ({ dispatch }) => dispatch(fetchCurrentUser())
};
