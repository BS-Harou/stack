import {ACTIONS} from './home-actions';

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
	case ACTIONS.SET_VALUE:
		return Object.assign({}, state, { value: action.payload });
	case ACTIONS.SET_ITEMS:
		return Object.assign({}, state, { items: action.payload });
	}

	return state;
}

