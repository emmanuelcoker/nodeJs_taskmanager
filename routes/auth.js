const express = require('express');
const passport = require('passport');
const router = express.Router();

//import controllers
const LoginController = require('../app/controllers/authcontroller/login');
const RegisterController = require('../app/controllers/authcontroller/register');

//middlewares
//auth middlewares
const { ensureAuth, ensureGuest}  = require('../app/middleware/authenticate');

//login page
router.get('/login', ensureGuest, LoginController.emailLogin);
router.post('/login', ensureGuest,  passport.authenticate('loginUser', { failureRedirect: '/auth/login' }),
function(req, res) {
  req.flash('success', 'Welcome back, '+ req.user.firstName)
  res.redirect('/');
})

//register page
router.get('/register', ensureGuest,  RegisterController.emailRegister);
router.post('/register', ensureGuest,  passport.authenticate('registerUser', { failureRedirect: '/auth/register' }),
function(req, res){
  req.flash('success', 'Welcome, '+ req.user.firstName)
  res.redirect('/');
})





router.get('/google', passport.authenticate('google', { scope: [ 'email','profile' ] }));

router.get( '/google/callback', passport.authenticate( 'google', { failureRedirect: '/auth/login',  successRedirect: '/' }));


router.post('/logout', ensureAuth, (req, res) => {
    req.logout(function(err) {
        if (err) {
          // Handle error, if any
          console.error(err);
          return res.status(500).send('An error occurred during logout');
        }
        // Successful logout
        res.redirect('/');
      });
})
module.exports = router;