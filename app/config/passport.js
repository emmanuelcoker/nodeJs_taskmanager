const CustomStrategy = require('passport-custom').Strategy;
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const bcrypt = require('bcrypt');
const Role = require('../models/Role');
const User = require('../models/User');
const passport = require('passport');

//user
const localRegistration = () => {

    passport.use('registerUser', new CustomStrategy(
        async function(req, done) {
            try {
                if(req.body.password != req.body.password_confirmation){
                    console.log('Passwords do not match');
                    return new Error('Passwords do not match');
                }

                const hashedPassword = await bcrypt.hash(req.body.password, 10);
                
                //check if roles have been created
                //if created, assign role_id to user, else, create roles for admin and user

                let role = await Role.findOne({
                    role: 'user'
                }).lean();

                if(!role){
                    role =  await Role.create({
                        role: 'user'
                    });
                }

                //check if user already exists
                const user = await User.findOne({
                    email: req.body.email
                }).lean();

                if(user){
                    return new Error('An account with this email already exist');
                }else{
                    const userData = {
                        firstName: req.body.firstname,
                        lastName: req.body.lastname,
                        email: req.body.email,
                        password: hashedPassword,
                        role: role._id
                    } 

                    const newUser = await User.create(userData);
                    done(null, newUser); 
                }
                
            } catch (error) {
                console.error(error)
            }
            
        }

    ));


    serializeUser(passport);
    deserializeUser(passport);
    return passport;
} 

const localLogin = () => {

    passport.use('loginUser', new CustomStrategy(
        async function(req, done) {
            try {
                
                 //check if user already exists
                 const user = await User.findOne({
                    email: req.body.email
                }).populate('role').lean();

                if(user){
                    if(user.role.role != 'user'){
                        req.flash('error', 'This account does not exist!')
                        return req.res.redirect('/auth/login');
                    }
                    const passwordMatch = await bcrypt.compare(req.body.password, user.password);

                    if(passwordMatch){
                        done(null, user); 
                    }else{
                        req.flash('error', 'Incorrect password!')
                        return req.res.redirect('/auth/login');
                    }
                }else{
                    req.flash('error', 'This account does not exist!')
                    return req.res.redirect('/auth/login');
                }
                
            } catch (error) {
                console.error(error)
            }
            
        }

    ));


    serializeUser(passport);
    deserializeUser(passport);
    return passport;
} 

//google login or register
const googleLogin = () => {

    passport.use(new GoogleStrategy({
        clientID:     process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.APP_URL + "/auth/google/callback",
      },
      async function(req, accessToken, refreshToken, profile, done) {
    
        try {
            //find user
            const user = await User.findOne({
                email: profile.email
            }).lean();
    
            //user exists, log user in, else create new user and log user in
            if(user){
                done(null, user);
            }else{
    
                //user role
                const role = await Role.findOne({
                    role: 'user'
                });
    
                const newUserData = {
                    googleId: profile.id,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    email: profile.email,
                    role: role._id,
                    image: profile.photos[0].value
                }
                const newUser = await User.create(newUserData).lean();
                done(null, newUser) 
            }
        } catch (error) {
            console.error(error)
        }
      }
    ));


    serializeUser(passport);
    deserializeUser(passport);

    return passport;
} 


//admin
const adminRegistration = () => {

    passport.use('registerAdmin', new CustomStrategy(
        async function(req, done) {
            try {
                if(req.body.password != req.body.password_confirmation){
                    console.log('Passwords do not match');
                    return new Error('Passwords do not match');
                }

                const hashedPassword = await bcrypt.hash(req.body.password, 10);
                
                //check if roles have been created
                //if created, assign role_id to user, else, create roles for admin and user

                let role = await Role.findOne({
                    role: 'admin'
                }).lean();

                if(!role){
                    role =  await Role.create({
                        role: 'admin'
                    });
                }

                //check if user already exists
                const user = await User.findOne({
                    email: req.body.email
                }).lean();

                if(user){
                    return new Error('An account with this email already exist');
                }else{
                    const userData = {
                        firstName: req.body.firstname,
                        lastName: req.body.lastname,
                        email: req.body.email,
                        password: hashedPassword,
                        role: role._id
                    } 

                    const newUser = await User.create(userData);
                    done(null, newUser); 
                }
                
            } catch (error) {
                console.error(error)
            }
            
        }

    ));


    serializeUser(passport);
    deserializeUser(passport);
    return passport;
} 

//admin
const adminLogin = () => {

    passport.use('loginAdmin', new CustomStrategy(
        async function(req, done) {
            try {
                
                 //check if user already exists
                 const user = await User.findOne({
                    email: req.body.email
                }).populate('role').lean();

                if(user){
                    if(user.role.role != 'admin'){
                        req.flash('error', 'This account does not exist!')
                        return req.res.redirect('/admin/login');
                    }
                    
                    const passwordMatch = await bcrypt.compare(req.body.password, user.password);

                    if(passwordMatch){
                        done(null, user); 
                    }else{
                        req.flash('error', 'Incorrect password!')
                        return req.res.redirect('/admin/login');
                    }
                }else{
                    req.flash('error', 'This account does not exist!')
                    return req.res.redirect('/admin/login');
                }
                
            } catch (error) {
                console.error(error)
            }
            
        }

    ));


    serializeUser(passport);
    deserializeUser(passport);
    return passport;
} 


function serializeUser(passport){
    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });
}

function deserializeUser(passport){
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
             done(null, user);  
         } catch (error) {
             console.error(error);
         }
    });
}

module.exports ={
    localRegistration,
    localLogin,
    googleLogin,
    adminLogin,
    adminRegistration
}