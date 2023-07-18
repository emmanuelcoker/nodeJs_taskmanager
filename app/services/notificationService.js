const Notification = require('../models/Notification');


const sendNotification = async (data, user_id) => {
    try {
        const notificationData = {
            data: data,
            notifiable_user: user_id,
        }
    
        const newNotification = await Notification.create(notificationData);
    } catch (error) {
        console.error(error);
    }
}


module.exports = {
    sendNotification
}