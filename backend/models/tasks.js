const mongoose = require('mongoose');

const taskSchema =  new mongoose.Schema({
    taskName : {type: String, required: true},
    description: { type: String },
    dueDate: { type: Date, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Task', taskSchema);