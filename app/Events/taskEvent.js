const EventEmitter = require('events')
const NotificationService = require('../services/notificationService');
const User = require('../models/User');
const Role = require('../models/Role');

const TaskEvent = new EventEmitter();

TaskEvent.on('NewTask', async (content, user_id) => {
    const data = {
        title: "New task for you!",
        body:  content
    }

    await NotificationService.sendNotification(data, user_id);
    console.log('new task notification');
});

TaskEvent.on('updateTaskStatus', async (sendername, user_id) => {
    const data = {
        title: 'Task status updated',
        body:  sendername + ' updated a task'
    }

    TaskEvent.emit('updateTask', user_id); //send to user
    
    const role = await Role.findOne({role: 'admin'}).lean();
    const users = await User.find({role: role._id}).lean();
    for(user in users){
        await NotificationService.sendNotification(data, users[user]._id); //send to admins
    }

    console.log('task status update notification');
});

TaskEvent.on('updateTask', async (user_id) => {
    const data = {
        title: 'Task Updated Successfuly!',
        body:  'You have successfully updated task details.'
    }

    await NotificationService.sendNotification(data, user_id);
    console.log('task updated notification');
});

TaskEvent.on('deleteTask', async (user_id) => {
    const data = {
        title: 'Task Deleted',
        message: 'Task Deleted successfully'
    }

    await NotificationService.sendNotification(data, user_id);
})


module.exports = TaskEvent    