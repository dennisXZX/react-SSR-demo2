import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import Home from './client/components/Home';

const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  // render the React component into a string
  const content = renderToString(<Home />);

  // prepare the rendered content and insert the bundle.js for browser
  const html = `
    <html>
      <head></head>
      <body>
        <div id="root">${content}</div>
        <script src="bundle.js"></script>
      </body>  
    </html>
  `;

  res.send(html);
})

app.listen(3000, () => {
  console.log('Listening on port 3000');
})