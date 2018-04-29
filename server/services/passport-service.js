const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

module.exports = (settings) => {
	passport.use(new FacebookStrategy({
		clientID: settings.facebook.app_id,
		clientSecret: settings.facebook.app_secret,
		callbackURL: 'https://localhost:8080/auth/facebook/callback',
	}, (accessToken, refreshToken, profile, done) => {
		done(null, {
			name: profile.displayName,
			id: profile.id,
			accessToken: accessToken,
		});
	}));
	passport.serializeUser((user, done) => done(null, user));
	passport.deserializeUser((user, done) => done(null, user));
}
