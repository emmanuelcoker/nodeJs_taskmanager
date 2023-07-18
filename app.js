const express = require('express')
const app = express();


//app provider
require('./app/providers/appProvider')(app);


// connect to database
require('./app/config/database')();

//hbs provider
require('./app/providers/hbsProvider')(app);


//session provider
require('./app/providers/sessionProvider')(app);


//passport provider
require('./app/providers/passportProvider')(app);



//set local variables
app.use((req, res, next) => {
    const user = req.user || null; 
    if(user){
        res.locals.authUser = {
            firstName: user.firstName,
            lastName:  user.lastName,
            email:     user.email,
            role:      user.role._id
        };
    }else{
        res.locals.authUser= null;
    }
    
    next();
  });


// routes
require('./app/providers/routeProvider')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>{
    console.log(`Server Listening in ${process.env.NODE_ENV} server on port: ${PORT}...`);
})