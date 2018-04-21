import React, {Component} from 'react';
import PropTypes from 'prop-types';
import css from './rent.css';

const borderImg = 'https://media.overstockart.com/optimized/cache/data/frames/FR-6996G20X24-1000x1000.png';

class RentLodger extends Component {
	static propTypes = {
		picture: PropTypes.string,
		name: PropTypes.string,
	};

	static defaultProps = {};

	render() {
		return (
			<div className={css.lodger}>
				<div className={css.picture}>
					<img className={css.avatar} src={this.props.picture} width="80" height="80" />
					<img className={css.frame} src={borderImg} width="100" height="100" />
				</div>
				<div className={css.info}>
					<div className={css.name}>
						{this.props.name}
					</div>
					<div>
						Nájem: 3653 Kč
					</div>
				</div>
			</div>
		);
	}
}

export default RentLodger;
