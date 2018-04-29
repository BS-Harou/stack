const passport = require('passport');

module.exports = (app) => {
	app.use('/auth/facebook', passport.authenticate('facebook'));
	app.use('/auth/facebook/callback', passport.authenticate('facebook', {
		successRedirect: '/home',
		failureRedirect: '/',
	}));
};
