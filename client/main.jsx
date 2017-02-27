import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import Router from './router/router-container';
import App from './app/app-container';
import store from './model';
import {Provider} from 'react-redux';

function renderApp() {
	ReactDOM.render(
		<AppContainer>
			<Provider store={store}>
				<Router>
					<App />
				</Router>
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
	module.hot.accept('./router/router-container', renderApp);
}
