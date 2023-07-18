//express handle bars template engine
const { engine } = require('express-handlebars');

// Register `hbs.engine` with the Express app.
//Handle bars template engine

module.exports = (app) => {
    const { formatDate, ifEquals, priorityColor } = require('../../app/helpers/hbs');
    app.engine('.hbs', engine({defaultLayout: 'main-layout', extname: '.hbs', helpers: {
        formatDate,
        ifEquals,
        priorityColor
    }}));
    app.set('view engine', '.hbs');
    app.set('views', './views');

}