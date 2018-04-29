import React, {PureComponent} from 'react';
// import PropTypes from 'prop-types';
import RentLodger from './rent-lodger';
import RentDetail from './rent-detail';
import css from './rent.css';

const MOCK_LODGERS = [
	{
		picture: 'https://scontent-vie1-1.xx.fbcdn.net/v/t1.0-1/c26.86.615.615/s40x40/64037_255037404582609_626714749_n.jpg?_nc_cat=0&oh=a57aa46bb02beb01d60c66e20958f572&oe=5B620E0E',
		name: 'Michal Polata'
	},
	{
		picture: 'https://scontent-vie1-1.xx.fbcdn.net/v/t1.0-1/c12.12.155.155/s40x40/6513_10201265650788202_1886302550_n.jpg?_nc_cat=0&oh=62c903aa2467e2471231ad04c0137d04&oe=5B55A947',
		name: 'Martin Kadlec'
	},
	{
		picture: 'https://scontent-vie1-1.xx.fbcdn.net/v/t1.0-1/p40x40/24300995_1984818841543125_3909002852507413160_n.jpg?_nc_cat=0&oh=558849a744f09fb292ad040a9952156e&oe=5B691339',
		name: 'Daniel Němec'
	},
	{
		picture: 'https://pm1.narvii.com/6800/df4d0a08f4c15add699bb8ae9b3eba57cbbbfe68v2_128.jpg',
		name: 'Neptunia'
	},
	{
		picture: 'http://i48.tinypic.com/20zqm45.png',
		name: 'Plutia'
	},
];

class Rent extends PureComponent {
	static propTypes = {};

	static defaultProps = {};

	render() {
		const lodgers = MOCK_LODGERS.map((lodger, i) => (
			<div key={i} className='col-sm-6'>
				<RentLodger {...lodger} />
			</div>
		));
		return (
			<div className={css.rent}>
				<RentDetail />
				<div className={css.lodgerList}>
					<div className="row">
						{lodgers}
					</div>
				</div>
			</div>
		);
	}
}

export default Rent;
