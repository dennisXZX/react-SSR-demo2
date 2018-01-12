import 'babel-polyfill';
import express from 'express';
import { matchRoutes } from 'react-router-config';
import Routes from './client/Routes';
import React from 'react';
import renderer from './helpers/renderer';
import createStore from './helpers/createStore';

const app = express();

app.use(express.static('public'));

app.get('*', (req, res) => {
  // create a store
  const store = createStore();

  /*
   first figure out what components need to be rendered based on URL using matchRoutes(),
   then loop over routes in an array, execute loadData() if there is one in each component,
   after calling all the loadDate methods, the store is initialized with all the data from API.
   this returns an array of Promise in the end.
  */
  const promises = matchRoutes(Routes, req.path).map(({ route }) => {
    return route.loadData ? route.loadData(store) : null;
  });

  Promise.all(promises).then(() => {
    // send an HTML markup string to browser
    // the req is passed to renderer in order to retrieve the current path
    res.send(renderer(req, store));
  });
})

app.listen(3000, () => {
  console.log('Listening on port 3000');
})