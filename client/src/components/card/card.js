import React, {Component} from 'react';
import css from './card.css';
import PropTypes from 'prop-types';

class Card extends Component {
	static defaultProps = {
		show: false,
		title: '',
	};

	static propTypes = {
		defaultShow: PropTypes.bool,
		title: PropTypes.string,
		children: PropTypes.Component
	};

	constructor(props) {
		super(props);
		this.state = {show: props.defaultShow};
		this.toggleShow = this.toggleShow.bind(this);
	}

	toggleShow() {
		this.setState({show: !this.state.show});
	}

	render() {
		const {title, children} = this.props;
		const {show} = this.state;
		return (
			<div className={`card ${css.card}`}>
				<div className={`card-header ${css.header}`} onClick={this.toggleShow} style={{position: 'sticky', top: 0}}>{title}</div>
				<div className={`collapse ${css.body}` + (show ? ' show' : '')}>
					{children}
				</div>
			</div>
		);
	}
}

export default Card;
