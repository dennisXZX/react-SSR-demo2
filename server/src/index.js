import express from 'express';
import React from 'react';
import renderer from './helpers/renderer';

const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  // send an HTML markup string to browser
  res.send(renderer());
})

app.listen(3000, () => {
  console.log('Listening on port 3000');
})