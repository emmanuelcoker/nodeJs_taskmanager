const path = require('path');

const User = require('../../models/User');
const Task = require('../../models/Task');
const TaskRepository = require('../../repositories/taskrepository');
const  TaskEvent = require('../../Events/taskEvent');



const create = async (req, res) => {
    const users = await User.find({}).lean();
    
    res.render('admin/tasks/create', {
        users
    });
}

const store = async(req, res) => {
    try {
        const newTask = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            priority: Number(req.body.priority),
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            user: req.body.user
        }


        await TaskRepository.createTask(newTask);
        TaskEvent.emit('NewTask', req.body.title, req.body.user);

        return res.redirect('/admin/dashboard');

    } catch (error) {
        console.error(error);
    }
};


const edit = async (req, res) => {
   try {
        const task = await Task.findById(req.params.id).populate('user').lean();
        if(!task){
            return res.render('error/404')        
        }
    
        const users = await User.find({}).lean();
        res.render('admin/tasks/edit', {
            task,
            users
        });
   } catch (error) {
        console.error(error);
        return res.render('error/500')
   }
}


const update = async (req, res) => {
   try {
    const task = await TaskRepository.findTaskById(req.params.id);

    if(!task){
        return res.render('error/404')        
    }

    await TaskRepository.updateTask({_id: req.params.id}, req.body);

    //emit notification event
    TaskEvent.emit('updateTask', req.user._id);

    res.redirect('/admin/dashboard');

   } catch (error) {
     console.error(error)
     return res.render('error/500')
   }
}


const destroy= async (req, res) => {
    try {
     const task = await TaskRepository.findTaskById(req.params.id);
 
     if(!task){
         return res.render('error/404')        
     }
 
     await Task.findByIdAndRemove(req.params.id);

     //emit notification event
     TaskEvent.emit('deleteTask', req.user._id);
     
    res.redirect('/admin/dashboard');
 
    } catch (error) {
      console.error(error)
      return res.render('error/500')
    }
 }


module.exports = {
    create,
    store,
    edit,
    update,
    destroy
}