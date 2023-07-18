const Task = require('../models/Task');
const Comment = require('../models/Comment');


const createTask = async (data) => {
    const task = await Task.create(data);
    return task;
}

const findTaskById =  async (id) => {   
   try {
    const task = await Task.findById(id).lean();
    return task;
   } catch (error) {
        console.error(error);
   }
}


const updateTask = async (queryObject, data) => {
    try {
        await Task.updateOne(queryObject, data);
    } catch (error) {
        console.error(error)
    }
}


const postComment = async (task_id, user_id, comment) => {
    try {
        await Comment.create({
            task    : task_id,
            user    : user_id,
            comment : comment
        });

    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    createTask,
    findTaskById,
    updateTask,
    postComment
}