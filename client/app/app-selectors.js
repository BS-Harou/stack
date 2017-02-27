import {createSelector} from 'reselect';
import sortBy from 'lodash/sortBy';

export const getItems = createSelector([
	(state) => (state.app['items'])
], function(items = {}) {
	const result = sortBy(Object.values(items), (item) => item.value);
	return result;
});

export const getValue = createSelector([
	(state) => (state.app['value'])
], function(value) {
	console.log('SEL VAL: ', value);
	return value;
});
