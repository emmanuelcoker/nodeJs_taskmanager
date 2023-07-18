


module.exports = (app) => {
    app.use('/', require('../../routes/index'));
    app.use('/auth', require('../../routes/auth'));
    app.use('/admin', require('../../routes/admin'));
}