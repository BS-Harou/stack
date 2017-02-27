import {NAVIGATE} from './router-action-types';
import createBrowserHistory from 'history/createBrowserHistory';

const history = createBrowserHistory();

const initialState = {
	location: history.location,
	action: history.action
};

export default (state = initialState, action) => {
	if (action.type === NAVIGATE) {
		return {
			location: action.payload.location,
			action: action.payload.action
		};
	} else {
		return state;
	}
};
