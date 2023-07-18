const Task = require('../models/Task');
const Comment = require('../models/Comment');
const Role = require('../models/Role');


const homepage = async (req, res) => {
    const message = req.flash('success')[0] || null;
    const roleData = await Role.findById(req.user.role).lean();

    if(roleData.role == 'admin'){
        return res.redirect('/admin/dashboard');
    }

    const tasks = await Task.find({
        user: req.user._id
    }).populate('user').lean();

    const comments = await Comment.find().populate('task').populate({
        path: 'user',
        select: 'firstName lastName email image' // Specify the fields you want to populate from the User model
      }).lean();
    res.render('home', {
        message,
        tasks,
        comments
    });
}


module.exports = {
    homepage
}