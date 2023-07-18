const express = require('express');
const passport = require('passport');
const router = express.Router();

//import controllers
const AdminController = require('../app/controllers/admincontroller');
const LoginController = require('../app/controllers/authcontroller/login');
const RegisterController = require('../app/controllers/authcontroller/register');
const TaskController = require('../app/controllers/admin/taskcontroller');

//middlewares
//auth middlewares
const { ensureGuest}  = require('../app/middleware/authenticate');
const { ensureAdmin }  = require('../app/middleware/authenticateAdmin');

//login page
router.get('/login', ensureGuest, LoginController.adminLogin);
router.post('/login', ensureGuest,  passport.authenticate('loginAdmin', { failureRedirect: '/admin/login' }),
function(req, res) {
  req.flash('success', 'Welcome back, '+ req.user.firstName)
  res.redirect('/');
})

//register page
router.get('/register', ensureGuest,  RegisterController.adminRegister);
router.post('/register', ensureGuest,  passport.authenticate('registerAdmin', { failureRedirect: '/admin/register', successRedirect: '/admin/dashboard' }))

//google oauth
router.get('/google', passport.authenticate('google', { scope: [ 'email','profile' ] }));
router.get( '/google/callback', passport.authenticate( 'google', { failureRedirect: '/admin/login',  successRedirect: '/admin/dashboard' }));


//login page
router.get('/dashboard', ensureAdmin, AdminController.homepage);


//tasks
router.get('/tasks/create', ensureAdmin, TaskController.create);
router.post('/tasks', ensureAdmin, TaskController.store);
router.get('/tasks/edit/:id', ensureAdmin, TaskController.edit);
router.put('/tasks/:id', ensureAdmin, TaskController.update);
router.delete('/tasks/:id', ensureAdmin, TaskController.destroy);

router.post('/logout', ensureAdmin, (req, res) => {
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