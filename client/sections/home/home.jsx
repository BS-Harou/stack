import React, {Component} from 'react';
// import {Link, Route} from 'react-router-dom';
// import css from './home.css';
// import PropTypes from 'prop-types';
import Card from 'components/card/card';

const MOCK = [
	{month: 'Duben'},
	{month: 'Březeb'},
	{month: 'Únor'},
	{month: 'Leden'},
];

class Home extends Component {
	static defaultProps = {};

	static propTypes = {};

	render() {
		const list = MOCK.map((item, i) => (
			<Card title={item.month} key={i} defaultShow={i === 0}>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut nibh vel eros viverra ultricies. Curabitur nec eros tincidunt, vestibulum nibh ac, varius dolor.
					Nunc non rhoncus sapien. Ut purus diam, accumsan euismod enim quis, luctus faucibus justo. Ut dictum neque ut nisi convallis lobortis.
					Aliquam dolor sem, facilisis eu finibus in, posuere mattis orci. Vivamus nec quam in neque ullamcorper semper.
				</p>
				<p>
					Sed sodales sodales condimentum. Donec quis odio dictum, feugiat eros tempor, commodo dui. Nunc elementum dictum massa eget placerat.
					Phasellus et nulla nisl. Nulla efficitur sem sem, sit amet pellentesque nunc gravida accumsan. Vivamus hendrerit turpis a ipsum mattis luctus.
					Sed nibh felis, luctus eu vehicula et, viverra hendrerit tortor. Morbi nec diam ante.
				</p>
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
