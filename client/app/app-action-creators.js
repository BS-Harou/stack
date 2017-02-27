import {SET_ITEMS, SET_VALUE} from './app-action-types';

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

export default {
	setItems,
	setValue
};
