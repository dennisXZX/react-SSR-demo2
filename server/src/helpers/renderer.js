import React from 'react';
import { renderToString } from 'react-dom/server';
import Home from '../client/components/Home';

export default () => {
  // render the React component into a string
  const content = renderToString(<Home />);

  // prepare the rendered content and insert the client public/bundle.js for browser
  const html = `
    <html>
      <head></head>
      <body>
        <div id="root">${content}</div>
        <script src="bundle.js"></script>
      </body>  
    </html>
  `;

  return html;
};