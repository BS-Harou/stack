import React, {Component} from 'react';
// import PropTypes from 'prop-types';

class Menu extends Component {
	static propTypes = {};

	static defaultProps = {};

	render() {
		return (
			<nav className="navbar sticky-top navbar-expand-sm navbar-dark bg-dark">
				<button className="navbar-toggler" data-toggle="collapse" data-target="#navbar">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbar">
					<a className="navbar-brand" href="#">Nájem</a>
					<ul className="navbar-nav mr-auto">
						<li>
							<a className="nav-link active" href="#">Active</a>
						</li>
						<li>
							<a className="nav-link" href="#">Link</a>
						</li>
						<li>
							<a className="nav-link" href="#">Link</a>
						</li>
					</ul>
					<button className="btn btn-outline-success">Nastavení</button>
				</div>
			</nav>
		);
	}
}

export default Menu;
