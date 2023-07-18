const mongoose = require('mongoose');


const RoleSchema = mongoose.Schema({
    role: {
        type: String,
        required: true,
        enum: ['user', 'admin'],
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Role = mongoose.model('Role', RoleSchema)

module.exports = Role;