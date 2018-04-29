import React, {PureComponent} from 'react';
// import {Link, Route} from 'react-router-dom';
// import css from './home.css';
// import PropTypes from 'prop-types';
import Card from 'components/card/card';
import Rent from 'components/rent/rent';

const MOCK = [
	{month: 'Duben'},
	{month: 'Březeb'},
	{month: 'Únor'},
	{month: 'Leden'},
];

class Home extends PureComponent {
	static defaultProps = {};

	static propTypes = {};

	render() {
		const list = MOCK.map((item, i) => (
			<Card title={item.month} key={i} defaultShow={i === 0}>
				<Rent />
			</Card>
		));
		return (
			<div style={{position: 'relative'}}>
				{list}
			</div>
		);
	}
}

export default Home;
