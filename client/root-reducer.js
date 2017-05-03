import { combineReducers } from 'redux';
import appReducer from './app/app-reducer';
import formsReducer from './forms/forms-reducer';
import { routerReducer } from 'react-router-redux';


export default combineReducers({
	app: appReducer,
	router: routerReducer,
	forms: formsReducer
});
