import {SET_ITEMS, SET_VALUE} from './app-action-types';
import {push} from 'react-router-redux';

export function setItems(val) {
	return {
		type: SET_ITEMS,
		payload: val
	};
}

export function setValue(val) {
	return {
		type: SET_VALUE,
		payload: val
	};
}

export function navigate(val) {
	return push(val);
}

export default {
	setItems,
	setValue,
	navigate
};
