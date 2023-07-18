const session = require('express-session');
const MongoStore = require('connect-mongo');

module.exports = (app) => {
    app.use(session({ 
        secret: 'keyboard cat', 
        resave: true, saveUninitialized: true, 
        store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }) 
    }));

}