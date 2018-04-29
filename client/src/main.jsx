import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/app';

// import registerServiceWorker from './register-service-worker';
// registerServiceWorker();

// bootstrap
// import 'jquery';
// import 'popper.js';
import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/js/bootstrap.js';

const root = document.createElement('div');
root.className = 'root';
document.body.appendChild(root);

ReactDOM.render(<App />, root);
