const express = require('express');
const app = express();
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('express-flash');
const moment = require('moment');
const db = require('./models/index.js');
// const async = require("async");
// require("dotenv").config();


const sequelize = new Sequelize('DogApp', 'postgres', 'postgres', {
	host: 'localhost',
	dialect: 'postgres',
	timestamps: false
});

passport.use(
	new LocalStrategy(
		{
			usernameField: 'email'
		},
		function(email, password, done) {
			db.users.findAll({ raw: true, where: { email_address: email } }).then(function(user) {
				if (!user[0]) {
					return done(null, false, { message: 'Incorrect username.' });
				}

				bcrypt.compare(password, user[0].password, function(err, result) {
					if (err) {
						console.log(err);
						return done(null, false, { message: 'Error authenticating login' });
					} else if (result == true) {
						return done(null, user);
					} else {
						return done(null, false, { message: 'Incorrect password' });
					}
				});
			});
		}
	)
);

passport.serializeUser(function(user, done) {
	done(null, user[0].id);
});

passport.deserializeUser(function(id, done) {
	db.users.findAll({ raw: true, where: { id: id } }).then(function(user, err) {
		done(err, user[0]);
	});
});

const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');

// Set public folder for images and stylesheets
app.use(express.static('public'));

// Parses from a form and sends it to server
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(
	session({
		// Key we want to keep secret which will encrypt all of our information
		secret: 'keyboard cat',
		// Should we resave our session variables if nothing has changes which we dont
		resave: false,
		// Save empty value if there is no vaue which we do not want to do
		saveUninitialized: false
	})
);
// Funtion inside passport which initializes passport
app.use(passport.initialize());
// Store our variables to be persisted across the whole session. Works with app.use(Session) above
app.use(passport.session());

// Flash
app.use(flash());

app.get('/', function(req, res) {
	res.render('index');
});

app.get('/users/register', checkAuthenticated, function(req, res) {
	res.render('register');
});

app.get('/users/login', checkAuthenticated, function(req, res) {
	// flash sets a messages variable. passport sets the error message
	res.render('login');
});

app.get('/users/dashboard', checkNotAuthenticated, function(req, res) {
	db.dogs
		.findAll({
			include: [
				{
					model: db.food
				},
				{
					model: db.potties
				}
			],
			where: { user_id: req.user.id }
		})
		.then(function(dogs) {
			res.render('dashboard', { user: req.user.name, dogs: dogs, moment: moment });
		});
});

app.get('/users/logout', function(req, res) {
	req.logout();
	res.render('index', { message: 'You have logged out successfully' });
});

app.post('/users/register', async function(req, res) {
	let { name, email, password, password2 } = req.body;

	let errors = [];

	if (!name || !email || !password || !password2) {
		errors.push({ message: 'Please enter all fields' });
	}

	if (password.length < 6) {
		errors.push({ message: 'Password must be at least 6 characters long' });
	}

	if (password !== password2) {
		errors.push({ message: 'Passwords do not match' });
	}

	if (errors.length > 0) {
		res.render('register', { errors, name, email, password, password2 });
	} else {
		hashedPassword = await bcrypt.hash(password, 10);
		// Validation passed
		let results = await db.users.findAll({
			raw: true,
			where: {
				email_address: email
			}
		});
		if (results[0]) {
			return res.render('register', { message: 'Email already registered' });
		} else {
			const user = await db.users.create({ name: name, email_address: email, password: hashedPassword });
			req.flash('success_msg', 'You are now registered. Please log in');
			res.redirect('/users/login');
		}
	}
});

app.post(
	'/users/login',
	passport.authenticate('local', {
		successRedirect: '/users/dashboard',
		failureRedirect: '/users/login',
		failureFlash: true
	})
);

app.post('/users/dogs', async function(req, res) {
	let { dog_name } = req.body;
	const dog = await db.dogs.create({ name: req.body.dog_name, user_id: req.user.id }).then(function(dog) {});
	res.redirect('/users/dashboard');
});

app.get('/users/create_dog', checkNotAuthenticated, function(req, res) {
	res.render('create_dog');
});

app.get('/users/dog_events/:id/create', checkNotAuthenticated, function(req, res) {
	res.render('create_event', { id: req.params.id });
});

app.post('/users/dogs/:id/delete', checkNotAuthenticated, async function(req, res) {
	await db.dogs
		.destroy({
			where: {
				id: req.params.id
			}
		})
		.then(function() {
			res.redirect('/users/dashboard');
		})
		.catch(function(error) {
			console.log(error);
			res.redirect('/users/dashboard');
		});
});

app.post('/users/dog_events/:id/create/food/wet/now', checkNotAuthenticated, async function(req, res) {
	await db.food.create({ dog_id: req.params.id, type_of_food: 'wet', time: sequelize.fn('NOW') }).then(function() {
		res.redirect('/users/dashboard');
	});
});

app.post('/users/dog_events/:id/create/food/wet/datepicker', checkNotAuthenticated, async function(req, res) {
	console.log('request to create specific food event received');
	console.log(req.body);
	await db.food.create({ dog_id: req.params.id, type_of_food: 'wet', time: req.body.date }).then(function() {
		res.redirect('/users/dashboard');
	});
});

app.post('/users/dog_events/:id/create/food/dry/now', checkNotAuthenticated, async function(req, res) {
	await db.food.create({ dog_id: req.params.id, type_of_food: 'dry', time: sequelize.fn('NOW') }).then(function() {
		res.redirect('/users/dashboard');
	});
});

app.post('/users/dog_events/:id/create/food/dry/datepicker', checkNotAuthenticated, async function(req, res) {
	console.log('request to create specific food event received');
	console.log(req.body);
	await db.food.create({ dog_id: req.params.id, type_of_food: 'dry', time: req.body.date }).then(function() {
		res.redirect('/users/dashboard');
	});
});

app.post('/users/dog_events/:id/create/potty/pee/now', checkNotAuthenticated, async function(req, res) {
	await db.potties
		.create({ dog_id: req.params.id, pee: true, time: sequelize.fn('NOW') })
		.then(function() {
			res.redirect('/users/dashboard');
		})
		.catch(function(e) {
			console.log(e);
		});
});

app.post('/users/dog_events/:id/create/potty/pee/datepicker', checkNotAuthenticated, async function(req, res) {
	await db.potties
		.create({ dog_id: req.params.id, pee: true, time: req.body.date })
		.then(function() {
			res.redirect('/users/dashboard');
		})
		.catch(function(e) {
			console.log(e);
		});
});

app.post('/users/dog_events/:id/create/potty/poop/now', checkNotAuthenticated, async function(req, res) {
	await db.potties
		.create({ dog_id: req.params.id, poop: true, time: sequelize.fn('NOW') })
		.then(function() {
			res.redirect('/users/dashboard');
		})
		.catch(function(e) {
			console.log(e);
		});
});

app.post('/users/dog_events/:id/create/potty/poop/datepicker', checkNotAuthenticated, async function(req, res) {
	await db.potties
		.create({ dog_id: req.params.id, poop: true, time: req.body.date })
		.then(function() {
			res.redirect('/users/dashboard');
		})
		.catch(function(e) {
			console.log(e);
		});
});

function checkAuthenticated(req, res, next) {
	if (
		(req.isAuthenticated() && req.path == '/users/login') ||
		(req.isAuthenticated() && req.path == '/users/register')
	) {
		return res.redirect('/users/dashboard');
	}
	next();
}

function checkNotAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/users/login');
}

app.listen(PORT, function() {
	console.log(`Server listening on port ${PORT}`);
});
