
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const passport = require('passport');
const helmet = require('helmet');
const csurf = require('csurf');
const webpackSetup = require('./setup/webpack-setup');
const passportSetup = require('./setup/passport-setup');
const routes = require('./routes');
const settings = require('./settings3');

module.exports = (app) => {
	passportSetup();
	app.use(helmet());
	app.use(helmet.contentSecurityPolicy({
		directives: settings.csp,
	}));
	app.use(logger('dev'));
	app.use(cookieParser());
	app.use(session({
		store: new RedisStore(settings.redis),
		secret: settings.sessions.secret,
		resave: false,
		saveUninitialized: false,
		name: settings.sessions.name,
	}));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(csurf());
	app.use((req, res, next) => {
		let user = req.user;
		if (user) {
			res.locals.user = {
				username: user.username,
				avatar: user.avatar,
			};
		}
		// res.locals.flash = req.flash('success'); // TODO socket.io flash notifications
		res.locals.csrfToken = req.csrfToken();
		next();
	});
	routes(app, settings);
	webpackSetup(app);
};
