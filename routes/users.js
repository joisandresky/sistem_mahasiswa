var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');

//Users Login Page
router.get('/login', function(req, res){
  res.render('login');
});

router.get('/register', function(req, res){
  res.render('register');
});

router.post('/register', function(req, res){
  var name = req.body.name;
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  var password2 = req.body.password;

  //Validasi
  req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('email', 'email is required').notEmpty();
  req.checkBody('email', 'email is not Valid').isEmail();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password2', 'Confirm Password is required').equals(req.body.password);

  var errors = req.validationErrors();
  if(errors){
    res.render('register', {
        errors : errors
    });
  }else {
    var newUser = new User({
      name: name,
      username: username,
      email: email,
      password: password
    });

    User.createUser(newUser, function(err, user){
      if(err) throw err;
      console.log(user);
    });

    req.flash('success_msg', 'Your are Registered and lets login now');
    res.redirect('/users/login');
  }
});

passport.use(new LocalStrategy(
  function(username, password, done){
    
  }));
//Autentikasi Passport JS
router.post('/login', passport.authenticate('local', {succesRedirect :'/', failureRedirect: '/users/login', failureFlash: true}), function(req, res) {
    res.redirect('/');
  });

module.exports = router;
