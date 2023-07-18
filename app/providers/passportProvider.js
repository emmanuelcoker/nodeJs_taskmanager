const { localRegistration, localLogin, googleLogin, adminLogin, adminRegistration } = require('../../app/config/passport');


module.exports = (app) => {
    app.use(localRegistration().initialize());
    app.use(localRegistration().session());
    app.use(localLogin().initialize());
    app.use(localLogin().session());
    app.use(googleLogin().initialize());
    app.use(googleLogin().session());
    app.use(adminLogin().initialize());
    app.use(adminLogin().session());
    app.use(adminRegistration().initialize());
    app.use(adminRegistration().session());
}