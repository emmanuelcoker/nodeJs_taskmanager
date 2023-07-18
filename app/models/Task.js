const mongoose = require('mongoose');


const TaskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    },
    status: {
        type: String,
        enum: ['pending', 'active', 'awaiting review', 'blocker', 'reviewed', 'completed'],
        default: 'pending'
    },
    priority: {
        type: Number,
        required: true,
        enum: [1, 2, 3, 4, 5],
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    endDate: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Task = mongoose.model('Task', TaskSchema)

module.exports = Task;