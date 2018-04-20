import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import actionCreators from './home-actions';
import {getItems, getValue} from './home-selectors';
import {createStructuredSelector} from 'reselect';
import Home from './home';

const mapStateToProps = function() {
	return createStructuredSelector({
		value: getValue,
		items: getItems
	});
};

const mapDispatchToProps = function(dispatch) {
	return {
		actions: bindActionCreators(actionCreators, dispatch)
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
