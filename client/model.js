import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import rootReducer from './root-reducer';
import mainSaga from './main-saga';


const logger = createLogger();
const sagaMiddleware = createSagaMiddleware();
var composeEnhancers = compose;

if (__DEV__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
	composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
}

const store = createStore(
	rootReducer,
	composeEnhancers(
		applyMiddleware(thunk, promise, sagaMiddleware, logger)
	)
);

window.store = store;

sagaMiddleware.run(mainSaga);

export default store;
