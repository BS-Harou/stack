import React, {StrictMode, Fragment} from 'react';
import Login from 'sections/login/login';
import Home from 'sections/home/home-container';
import Menu from 'components/menu/menu';
import {store, history} from '../model';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';
import {hot} from 'react-hot-loader';
import {Route, Switch} from 'react-router-dom';
import './app.css';

const LOGGED_IN = true;

debugger;

// TODO ErrorBoundary ??
const App = () => (
	<StrictMode>
		<Provider store={store}>
			<ConnectedRouter history={history}>
				<Fragment>
					{LOGGED_IN && (
						<div className='logged-in'>
							<Menu />
							<main>
								<Switch>
									<Route path="/home" component={Home}/>
									<Route component={Login}/>
								</Switch>
							</main>
						</div>
					)}
				</Fragment>
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
