const Role = require('../models/Role');

const ensureAdmin = async (req, res, next) => {
    const roleData = await Role.findById(req.user.role).lean();
    if(req.isAuthenticated()){
        if(roleData)
        if(roleData.role != 'admin'){
            return res.redirect('/');
        }else{
            return next();
        }
    }
    return res.redirect('/admin/login');
}



module.exports = {
    ensureAdmin,
}