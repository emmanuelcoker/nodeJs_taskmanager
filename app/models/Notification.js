const mongoose = require('mongoose');


const NotificationSchema = mongoose.Schema({
    //data[title, message] , notifiable_user, status[read, unread]
    data: {
        type: Array,
        required: true,
    },
    notifiable_user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    status: {
        type: String,
        enum: ['read', 'unread'],
        default: 'unread',
    },
    createdAt: {
        type: Date,
        default: Date.now
    } 
});

const Notification = mongoose.model('Notification', NotificationSchema);

module.exports = Notification;