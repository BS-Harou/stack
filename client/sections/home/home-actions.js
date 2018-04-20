import {push} from 'react-router-redux';

export const ACTIONS = {
	SET_ITEMS: 'home/SET_ITEMS',
	SET_VALUE: 'home/SET_VALUE',
};

export function setItems(val) {
	return {
		type: ACTIONS.SET_ITEMS,
		payload: val
	};
}

export function setValue(val) {
	return {
		type: ACTIONS.SET_VALUE,
		payload: val
	};
}

export function navigate(val) {
	return dispatch => dispatch(push(val));
}

export default {
	setItems,
	setValue,
	navigate
};
