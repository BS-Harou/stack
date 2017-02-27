import {SET_ITEMS, SET_VALUE} from './app-action-types';

const initialState = {
	items: {
		jedna: { value: 'jedna' },
		dva: { value: 'dva' },
		tri: { value: 'tri' }
	},
	value: 'default'
};

export default function (state = initialState, action) {

	switch (action.type) {
	case SET_VALUE:
		return Object.assign({}, state, { value: action.payload });
	case SET_ITEMS:
		return Object.assign({}, state, { items: action.payload });
	}

	return state;
}

