import React, {StrictMode} from 'react';
import Home from 'sections/home/home-container';
import Menu from 'components/menu/menu';
import {store, history} from '../model';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';
import {hot} from 'react-hot-loader';
import './app.css';

// TODO ErrorBoundary ??
const App = () => (
	<StrictMode>
		<Provider store={store}>
			<ConnectedRouter history={history}>
				<div>
					<Menu />
					<main>
						<Home />
					</main>
				</div>
			</ConnectedRouter>
		</Provider>
	</StrictMode>
);

/*
TODO: reducers, sagas hot reloading
https://gist.github.com/markerikson/dc6cee36b5b6f8d718f2e24a249e0491
if (module.hot) {
	// Enable Webpack hot module replacement for reducers
	module.hot.accept('../-reducer.js', () => {
		const nextRootReducer = require('../root-reducer');
		store.replaceReducer(nextRootReducer);
	});
}
*/

export default hot(module)(App);
