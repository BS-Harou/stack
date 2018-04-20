// TODO: move to 'boot' dir tree
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import rootReducer from './root-reducer';
import rootSaga from './root-saga';

import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';

export const history = createHistory();
const routerEnhancer = routerMiddleware(history);


const logger = createLogger();
const sagaMiddleware = createSagaMiddleware();
var composeEnhancers = compose;

if (__DEV__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
	composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
}

export const store = createStore(
	rootReducer,
	composeEnhancers(
		applyMiddleware(thunk, promise, sagaMiddleware, routerEnhancer, logger)
	)
);

window.store = store;

sagaMiddleware.run(rootSaga);
