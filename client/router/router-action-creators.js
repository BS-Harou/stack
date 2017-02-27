import {NAVIGATE} from './router-action-types';

export function navigate(val) {
	return {
		type: NAVIGATE,
		payload: val
	};
}

export default {
	navigate: navigate
};
