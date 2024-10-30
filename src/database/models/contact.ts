import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    status: {
        type: String,
        default: 'Pending'
    }
}, { timestamps: true })

const Task = mongoose.model('tasks', taskSchema);

export default Task;