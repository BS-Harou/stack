import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import formsActionCreators from './forms-action-creators';
import {getValue} from './forms-selectors';
import {createStructuredSelector} from 'reselect';

const mapStateToPropsFactory = function(type) {
	return function() {
		return createStructuredSelector({
			value: getValue,
			type: () => type
		});
	};
};

const mapDispatchToProps =	function(dispatch) {
	const actionCreators = bindActionCreators(formsActionCreators, dispatch);
	return {
		onChange: actionCreators.change
	};
};

console.log('FORM: ', React.DOM.input);
console.log('FORM2: ', React.createElement('input', null));

const test = function(props) {
	return (
		<input {...props} />
	);
};

export default {
	Text: connect(mapStateToPropsFactory('text'), mapDispatchToProps)(test),
	/*
	Checkbox: connect(mapStateToPropsFactory('checkbox'), mapDispatchToProps)(React.createElement('input', null)),
	Radio: connect(mapStateToPropsFactory('radio'), mapDispatchToProps)(React.createElement('input', null)),
	Password: connect(mapStateToPropsFactory('password'), mapDispatchToProps)(React.createElement('input', null)),
	EMail: connect(mapStateToPropsFactory('email'), mapDispatchToProps)(React.createElement('input', null)),
	Textarea: connect(mapStateToPropsFactory(), mapDispatchToProps)(React.createElement('textarea', null)),
	Select: connect(mapStateToPropsFactory(), mapDispatchToProps)(React.createElement('select', null)),
	Button: connect(mapStateToPropsFactory(), mapDispatchToProps)(React.createElement('select', null)),
	Submit: connect(mapStateToPropsFactory('submit'), mapDispatchToProps)(React.createElement('input', null)),
	Reset: connect(mapStateToPropsFactory('reset'), mapDispatchToProps)(React.createElement('input', null)),
	Number: connect(mapStateToPropsFactory('number'), mapDispatchToProps)(React.createElement('input', null)),
	Date: connect(mapStateToPropsFactory('date'), mapDispatchToProps)(React.createElement('input', null)),
	Color: connect(mapStateToPropsFactory('color'), mapDispatchToProps)(React.createElement('input', null)),
	Range: connect(mapStateToPropsFactory('range'), mapDispatchToProps)(React.createElement('input', null)),
	Month: connect(mapStateToPropsFactory('month'), mapDispatchToProps)(React.createElement('input', null)),
	Week: connect(mapStateToPropsFactory('week'), mapDispatchToProps)(React.createElement('input', null)),
	Time: connect(mapStateToPropsFactory('time'), mapDispatchToProps)(React.createElement('input', null)),
	DateTime: connect(mapStateToPropsFactory('datetime'), mapDispatchToProps)(React.createElement('input', null)),
	DateTimeLocal: connect(mapStateToPropsFactory('datetime-local'), mapDispatchToProps)(React.createElement('input', null)),
	Search: connect(mapStateToPropsFactory('search'), mapDispatchToProps)(React.createElement('input', null)),
	Tel: connect(mapStateToPropsFactory('tel'), mapDispatchToProps)(React.createElement('input', null)),
	Url: connect(mapStateToPropsFactory('url'), mapDispatchToProps)(React.createElement('input', null))
	*/
};
