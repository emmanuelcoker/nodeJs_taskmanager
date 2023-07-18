const express = require('express')
const flash = require('connect-flash');
var methodOverride = require('method-override')
const morgan = require('morgan');
const path = require('path');
const dotenv = require('dotenv')


module.exports = (app) => {
    dotenv.config({ path: path.resolve(__dirname, '../../.env')});
    //use morgan
    app.use(morgan('tiny'));

    app.use(express.urlencoded({ extended: false }))
    app.use(express.static(path.resolve(__dirname, '../../public')))
    app.use(express.json())

    //connect flash
    app.use(flash());
    
    //method override for put and delete requests
    app.use(methodOverride(function (req, res) {
        if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
        }
    }))
}