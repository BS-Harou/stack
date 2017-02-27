import React, {Component} from 'react';
import { Link, Route } from 'react-router-dom';
import appStyle from './app.css';


//import Forms from '../forms/forms-containers';


//console.log('TEXT: ', Forms.Text);
// <Text ident="name" placeholder="Name..." />
// <Forms.Text ident="text1" />

class App extends Component {
	render() {
		const list = this.props.items.map((item) => <div key={item.value}>{item.value}</div>);
		return (
			<div>
				<div>Val is: <span>{this.props.value}</span></div>
				<div>{list}</div>
				<input name="test" onChange={this.handleChange.bind(this)} ref="test" />
	
				<div>Menu:</div>
				<ul className={appStyle.test}>
					<li><Link to="/one">One</Link></li>
					<li><Link to="/two">Two</Link></li>
					<li><Link to="/three">Three</Link></li>
					<li><a href="https://google.com">Google</a></li>
				</ul>
				<button onClick={this.handleButtonClick.bind(this)}>
					Go to /three
				</button>
				<div style={{ padding: 10 }}>
					<Route path="/" exactly render={() => <div>Home</div>}/>
					<Route path="/one" render={() => <div>One</div>}/>
					<Route path="/two" render={() => <div>Two</div>}/>
					<Route path="/three" render={() => <div>Three</div>}/>
				</div>
				
			</div>
		);
	}

	handleChange() {
		this.props.actions.setValue(this.refs.test.value);
	}

	handleButtonClick() {
		this.props.actions.navigate({
			location: { pathname: '/three' },
			action: 'PUSH'
		});
	}
}

App.displayName = 'App';

App.defaultProps = {
	items: [],
	value: ''
};

App.propTypes = {
	items: React.PropTypes.array,
	value: React.PropTypes.string,
	actions: React.PropTypes.objectOf(React.PropTypes.func)
};

export default App;
