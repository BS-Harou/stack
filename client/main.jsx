import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import App from './app/app-container';
import {store, history} from './model';
import {Provider} from 'react-redux';

import { ConnectedRouter } from 'react-router-redux';

function renderApp() {
	ReactDOM.render(
		<AppContainer>
			<Provider store={store}>
				<ConnectedRouter history={history}>
					<App />
				</ConnectedRouter>
			</Provider>
		</AppContainer>,
		document.getElementById('root')
	);
}

renderApp();

store.subscribe(function() {
	renderApp();
});


// Hot Module Replacement API
if (module.hot) {
	module.hot.accept('./app/app-container', renderApp);
}
