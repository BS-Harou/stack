import { combineReducers } from 'redux';
import appReducer from './app/app-reducer';
import formsReducer from './forms/forms-reducer';
import routerReducer from './router/router-reducer';

export default combineReducers({
	app: appReducer,
	router: routerReducer,
	forms: formsReducer
});
