const ensureAuth = (req, res, next) => {
    if(req.isAuthenticated()){
        return next()
    }
    return res.redirect('/auth/login');
}

const ensureGuest = async (req, res, next) => {
    if(req.isAuthenticated()){
        return res.redirect('/'); 
    }else{
       return next();
    }
}


module.exports = {
    ensureAuth,
    ensureGuest
}