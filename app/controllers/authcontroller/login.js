const emailLogin =  (req, res) => {
    const error = req.flash('error')[0] || null;
    res.render('auth/login', {
        layout: 'auth-layout',
        message: error
    });
}


const adminLogin =  (req, res) => {
    const error = req.flash('error')[0] || null;
    res.render('admin/auth/login', {
        layout: 'auth-layout',
        message: error
    });
}


module.exports = {
    emailLogin,
    adminLogin
}