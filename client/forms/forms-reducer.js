import {CHANGE} from './forms-action-types';

const initialState = {
	value: null
};

export default function (state = initialState, action) {

	if (action.type == CHANGE) {
		return { value: action.payload };
	}

	return state;
}

