const TaskRepository = require('../repositories/taskrepository');
const  TaskEvent = require('../Events/taskEvent');

const update = async (req, res) => {
   try {
    const task = await TaskRepository.findTaskById(req.params.id);

    if(!task){
        return res.render('error/404')        
    }

    await TaskRepository.updateTask({_id: req.params.id}, req.body);

    //send notification
    TaskEvent.emit('updateTaskStatus', req.user.firstName, req.user._id);

    res.redirect('/');

   } catch (error) {
     console.error(error)
     return res.render('error/500')
   }
}



const postComment = async (req, res) => {
  try {
   const task = await TaskRepository.findTaskById(req.params.taskId);

   if(!task){
       return res.render('error/404')        
   }

   await TaskRepository.postComment(req.params.taskId, req.user.id, req.body.comment);
   res.redirect('/');

  } catch (error) {
    console.error(error)
    return res.render('error/500')
  }
}




module.exports = {
    update,
    postComment
}