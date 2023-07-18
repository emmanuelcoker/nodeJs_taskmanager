const Task = require('../models/Task');
const Comment = require('../models/Comment');

const homepage = async (req, res) => {

    const tasks = await Task.find({}).populate('user').lean();


    const message = req.flash('success')[0] || null;
    const comments = await Comment.find().populate('task').populate({
        path: 'user',
        select: 'firstName lastName email image' // Specify the fields you want to populate from the User model
      }).lean();

    res.render('admin/dashboard', {
        message,
        tasks,
        comments
    });
}


module.exports = {
    homepage
}