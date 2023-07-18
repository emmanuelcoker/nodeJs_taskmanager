const passport = require('passport');

const emailRegister =  (req, res) => {
    res.render('auth/register', {
        layout: 'auth-layout'
    });
}


const adminRegister =  (req, res) => {
    res.render('admin/auth/register', {
        layout: 'auth-layout'
    });
}



module.exports = {
    emailRegister,
    adminRegister
}