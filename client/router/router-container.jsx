import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import actionCreators from './router-action-creators';
import {createStructuredSelector} from 'reselect';

import {BrowserRouter} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';


const history = createBrowserHistory();

const mapStateToProps = function() {
	return createStructuredSelector({
		location: ((state) => state.router.location),
		action: (state) => state.router.action
	});
};

const mapDispatchToProps =	function(dispatch) {
	return {
		actions: bindActionCreators(actionCreators, dispatch)
	};
};

class Router extends Component {
	render() {
		return (
			<BrowserRouter history={history}>
				{this.props.children}
			</BrowserRouter>
		);
	}

	handleRouteChange(location, action) {
		this.props.actions.navigate({
			location: location,
			action: action == 'SYNC' ? this.props.action : action
		});
	}

}

Router.displayName = 'Router';

Router.defaultProps = {
};

Router.propTypes = {
	children: React.PropTypes.node,
	action: React.PropTypes.string,
	location: React.PropTypes.object,
	actions: React.PropTypes.objectOf(React.PropTypes.func)
};

export default connect(mapStateToProps, mapDispatchToProps)(Router);
