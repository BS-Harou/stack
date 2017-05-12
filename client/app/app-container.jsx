import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import appActionCreators from './app-action-creators';
import {getItems, getValue} from './app-selectors';
import {createStructuredSelector} from 'reselect';
import App from './app-component';

const mapStateToProps = function() {
	return createStructuredSelector({
		value: getValue,
		items: getItems
	});
};

const mapDispatchToProps = function(dispatch) {
	const actionCreators = Object.assign({}, appActionCreators);
	return {
		actions: bindActionCreators(actionCreators, dispatch)
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
