const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const userService = require('../services/user-service');
const settings = require('../settings');
const _ = require('lodash');

module.exports = () => {
	passport.use(new FacebookStrategy({
		clientID: settings.facebook.app_id,
		clientSecret: settings.facebook.app_secret,
		callbackURL: 'https://localhost:8080/auth/facebook/callback',
		profileFields: ['id', 'emails', 'displayName'],
	}, (accessToken, refreshToken, profile, done) => {
		console.log('PROFILE: ', profile);
		userService.findUserById(profile.id)
		.then(user => {
			if (user) return done(null, {id: user.id});
			const email = _.get(profile, 'emails[0].value', '');
			return userService.createUser({ id: profile.id, name: profile.displayName, email, accessToken	})
			.then(() => done(null, {id: profile.id}));
		})
		.catch(err => done(err));
	}));

	passport.serializeUser((user, done) => done(null, user.id));

	passport.deserializeUser((userId, done) => {
		userService.findUserById(userId)
		.then(user => done(null, user))
		.catch(err => done(err));
	});
};
