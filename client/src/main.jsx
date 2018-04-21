import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/app';

// bootstrap
// import 'jquery';
// import 'popper.js';
import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/js/bootstrap.js';

const root = document.createElement('div');
document.body.appendChild(root);

ReactDOM.render(<App />, root);
