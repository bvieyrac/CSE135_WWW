const express = require('express');
const session = require("express-session");
const body = require("body-parser");
const app = express();
const port = 3003;

//app.use(express.json());

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


var myUsers = [
    { id: 1, username: 'admin', password: 'admin', email: 'admin@test.com'},
    { id: 2, username: 'student', password: 'student', email: 'student@test.com'}
];

var currentUser;

function findUser(username, func){
    for( let user of myUsers ){
        if(user.username === username){
            currentUser = user.username;
            return func(null, user);
        }
        if(user.email === username){
            currentUser = user.username;
            return func(null, user);
        }
    }
    return func(null, null);
}

//Sessioning

passport.serializeUser(function(user, done){
    done(null, user.username);
});

passport.deserializeUser(function(username, done){
    findUser(username, function(err,user){
        done(err, user);
    });
});

passport.use( new LocalStrategy({ usernameField: 'user',
                                  passwordField: 'pass'},
    function(username, password, done){
        findUser(username, function(err,user){
            if(err) {return done(err);}
            if( !user || user.password != password){
                return done(null, false, {
                    'message' : 'User/password does not match'
                });
            }
            return done(null, user);
        });
    }
));

app.use(express.json());
app.use(session({ secret: 'Some secret', resave: false,
                  saveUninitialized: false}));
app.use(body());
app.use(passport.initialize());
app.use(passport.session());

function ensureAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {return next();}
    res.redirect('login');
}

app.get('/login', function(req, res){
    res.sendFile('login.html', { root: __dirname});
    //res.cookie('user', 'some user', {maxAge: 10800});
});

// app.post('/login', passport.authenticate('local', 
//         { successRedirect: 'user', failureRedirect: 'login'}
// ));
 
//  app.post('/login', passport.authenticate('local'), function(req, res) {
//    // If this function gets called, authentication was successful.
//    // `req.user` contains the authenticated user.
//    if(currentUser == 'admin') res.cookie('IsAdmin', 'True', {maxAge: 10800});
//    else res.cookie('IsAdmin', 'False', {maxAge: 10800});
//    res.redirect('home');
//  });

app.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) { return next(err); }
      if (!user) { return res.redirect('/login'); }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        if(currentUser == 'admin') res.cookie('IsAdmin', 'True', {maxAge: 10800});
        else res.cookie('IsAdmin', 'False', {maxAge: 10800});
        return res.redirect('dashboard');
      });
    })(req, res, next);
  });

app.get('/logout', function(req, res){
        req.logout();
        //res.redirect('login');
        res.sendFile('logout.html', { root: __dirname});
});

app.get('/dashboard', ensureAuthenticated, function(req, res){
    res.sendFile('dashboard.html', {root: __dirname});
});

app.get('/users', ensureAuthenticated, function(req,res){
    if(currentUser == 'admin'){
        res.sendFile('users.html', {root: __dirname});
        //res.send(myUsers);
    } 
    else res.redirect('dashboard');
});


app.listen(port);
