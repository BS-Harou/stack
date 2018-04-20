import {createSelector} from 'reselect';
import sortBy from 'lodash/sortBy';

export const getItems = createSelector([
	(state) =>state.sections.home.items,
], function(items = {}) {
	const result = sortBy(Object.values(items), (item) => item.value);
	return result;
});

export const getValue = createSelector([
	(state) => state.sections.home.value,
], function(value) {
	console.log('SEL VAL: ', value);
	return value;
});
