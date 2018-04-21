import {createSelector} from 'reselect';

const getIdent = (state, props) => props['ident'];

const getComponentState = createSelector([
	getIdent,
	(state) => state['forms']
], function(ident, forms) {
	return forms[ident];
});

export const getValue = createSelector([
	getComponentState
], function(state) {
	if (!state) return '';
	return state['value'];
});

export default {
	getValue
};
