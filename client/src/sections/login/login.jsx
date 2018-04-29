import React, {PureComponent} from 'react';
import css from './login.css';
import logo from 'logo.svg';
// import PropTypes from 'prop-types';

class Home extends PureComponent {
	static defaultProps = {};

	static propTypes = {};

	render() {
		return (
			<div className={`container-fluid ${css.login}`}>
				<div className='row h-100 justify-content-center align-items-center'>
					<form className={css.loginForm} action='/auth/facebook'>
						<img src={logo} width="197" height="132" />
						<button type='submit' className='btn btn-primary'>Login with facebook</button>
					</form>
				</div>
			</div>
		);
	}
}

export default Home;
