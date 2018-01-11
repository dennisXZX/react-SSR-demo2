import 'babel-polyfill';
import express from 'express';
import React from 'react';
import renderer from './helpers/renderer';
import createStore from './helpers/createStore';

const app = express();

app.use(express.static('public'));

app.get('*', (req, res) => {
  // create a store
  const  store = createStore();

  // load data into the store

  // send an HTML markup string to browser
  // the req is passed to renderer in order to retrieve the current path
  res.send(renderer(req, store));
})

app.listen(3000, () => {
  console.log('Listening on port 3000');
})