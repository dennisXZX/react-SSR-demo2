import 'babel-polyfill';
import express from 'express';
import { matchRoutes } from 'react-router-config';
import proxy from 'express-http-proxy';
import Routes from './client/Routes';
import React from 'react';
import renderer from './helpers/renderer';
import createStore from './helpers/createStore';

const app = express();

// set up a proxy
app.use('/api', proxy('http://react-ssr-api.herokuapp.com', {
  proxyReqOptDecorator(opts) {
    opts.headers['x-forwarded-host'] = 'localhost:3000';
    return opts;
  }
}));

app.use(express.static('public'));

app.get('*', (req, res) => {

  const store = createStore(req);

  /*
   need to figure out what components need to be rendered based on URL using matchRoutes(),
   loop over all the routes, execute loadData() if there is one in the component,
   after calling all the loadDate methods, the store should be initialized with all the data from API.
  */
  const promises = matchRoutes(Routes, req.path)
    .map(({ route }) => {
      return route.loadData ? route.loadData(store) : null;
    })
    // wrap the promise into promise so we can handle them manually
    .map(promise => {
      if (promise) {
        return new Promise((resolve, reject) => {
          // always resolve the promise
          promise.then(resolve).catch(resolve);
        })
      }
    })

  Promise.all(promises)
    .then(() => {
      const context = {};
      const content = renderer(req, store, context);

      if (context.url) {
        return res.redirect(301, context.url);
      }

      // send a 404 status if there is an error
      if (context.notFound) {
        res.status(404);
      }

      // when all the promises have resolved
      // we send an HTML markup string to browser
      // the req is passed to renderer in order to retrieve the current path
      res.send(content);
    });
})

app.listen(3000, () => {
  console.log('Listening on port 3000');
})