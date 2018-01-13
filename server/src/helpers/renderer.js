import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import Routes from '../client/Routes';

export default (req, store) => {
  // render the React component into a string
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path} context={{}}>
        <div>{renderRoutes(Routes)}</div>
      </StaticRouter>
    </Provider>
  );

  // prepare and insert the client public/bundle.js into the template
  // so the SPA takes control once it is loaded
  const html =`
    <html>
      <head></head>
      <body>
        <div id="root">${content}</div>
        <!--
        retrieve the current state from the store, which is created on the server side
        attach the store to window object so the store can be accessed on the client side
        -->
        <script type="text/javascript">
          window.INITIAL_STATE = ${JSON.stringify(store.getState())}
        </script>
        <script src="bundle.js"></script>
      </body>
    </html>
  `;

  return html;
};