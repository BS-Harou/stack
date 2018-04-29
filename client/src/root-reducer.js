import { combineReducers } from 'redux';
import home from 'sections/home/home-reducer';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
	sections: combineReducers({
		home,
	}),
	router: routerReducer
});
