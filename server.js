const express = require("express");
const app = express();
const Sequelize = require('sequelize');
const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const session = require("express-session");
const cookieParser = require('cookie-parser');
const flash = require("express-flash");

const sequelize = new Sequelize('DogApp', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres'
  });


const Model = Sequelize.Model;
class users extends Model {};

users.init({
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email_address: {
        type: Sequelize.STRING,
        allowNull: false,
        unqiue: true,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
},
    {   sequelize, 
        modelName: 'users', 
        tableName: 'users',
        timestamps: false,
});


passport.use(new LocalStrategy({
    usernameField: 'email'
},
function(email, password, done) {
    console.log(email)
    users.findAll( {raw: true, where: { email_address: email }})
        .then(function(user){
        console.log(user[0]);
        if(!user[0]) {
          return done(null, false, { message: 'Incorrect username.' });
        }

        console.log("Made it to line 54");

        bcrypt.compare(password, user[0].password, function(err, result) {
            if(err) {
                console.log(err);
                return done(null, false, { message: 'Incorrect password.' });
            } else if (result) {
                return done(null, user);
            } else {
                return done(null, false, { message: "Error authenticating login"})
            }
        });
      })
}
));

passport.serializeUser(function(user, done) {
    done(null, user[0].id);
  });
  
passport.deserializeUser(function(id, done) {
    users.findAll( {raw: true, where: { id: id }})
    .then(function(user, err){
        console.log(user)
      done(err, user[0]);
    });
  });

const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");


// Set public folder for images and stylesheets
app.use( express.static( "public" ) );

// Parses from a form and sends it to server
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(
    session({
      // Key we want to keep secret which will encrypt all of our information
      secret: "keyboard cat",
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

app.get("/", function(req, res) {
    res.render("index")
});

app.get("/users/register", checkAuthenticated, function(req, res){
    res.render("register")
});

app.get("/users/login", checkAuthenticated, function(req, res){
    // flash sets a messages variable. passport sets the error message
    res.render("login")
});

app.get("/users/dashboard", checkNotAuthenticated, function(req, res){
    console.log(req.isAuthenticated());
    res.render("dashboard", { user: req.user.name });
});

app.get("/users/logout", function(req, res) {
    req.logout();
    res.render("index", { message: "You have logged out successfully" });
  });

app.post("/users/register", async function(req, res) {
    let { name, email, password, password2 } = req.body;
  
    let errors = [];
  
    if (!name || !email || !password || !password2) {
      errors.push({ message: "Please enter all fields" });
    }
  
    if (password.length < 6) {
      errors.push({ message: "Password must be a least 6 characters long" });
    }
  
    if (password !== password2) {
      errors.push({ message: "Passwords do not match" });
    }
  
    if (errors.length > 0) {
      res.render("register", { errors, name, email, password, password2 });
    } else {
      hashedPassword = await bcrypt.hash(password, 10);
      console.log(hashedPassword);
      // Validation passed
        let results = await users.findAll({
        raw: true,
        where: {
          email_address: email
            }
        })
        console.log(results);
        console.log(typeof results)
        if (results[0]) {
            console.log("Email already exists")
            return res.render("register", { message: "Email already registered"});
        } else {
            const user = await users.create({name:name, email_address: email, password:hashedPassword});
            console.log(user.id)
            req.flash("success_msg", "You are now registered. Please log in");
            res.redirect("/users/login");
        }
  }
});

app.post(
    "/users/login",
    passport.authenticate("local", {
      successRedirect: "/users/dashboard",
      failureRedirect: "/users/login",
      failureFlash: true
    })
  );

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect("/users/dashboard");
    }
    next();
  }
  
  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/users/login");
  }


app.listen(PORT, function(){
    console.log(`Server listening on port ${PORT}`)
})