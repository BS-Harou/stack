import {CHANGE} from './forms-action-types';

export function change(val) {
	return {
		type: CHANGE,
		payload: val
	};
}

export default {
	change: change
};
