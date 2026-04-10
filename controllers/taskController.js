const Task = require('../models/task');

export const createTask = async (req, res) => {
    try {
        const { 
            title,
            description, 
            deadline, 
            assignedTo
         } = req.body;
        const task = await Task.create({
            title,
            description,
            deadline,
            assignedTo,
            createdBy: req.user._id
        });
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
//get all tasks
export const getTasks = async (req, res) => {
    try {
        let tasks;
        if (req.user.role === 'trainer') {
            tasks = await Task.find().populate('assignedTo', 'name email');
        } else {
            tasks = await Task.find({ assignedTo: req.user._id });
        }
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

};

//update task status
export const updateTaskStatus = async (req, res) => {
    try {
        

        const task = await Task.findById(req.params.id );
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        task.title = req.body.title || task.title;
        task.description = req.body.description || task.description;
        task.deadline = req.body.deadline || task.deadline;
        task.assignedTo = req.body.assignedTo || task.assignedTo;
        task.status = req.body.status || task.status;


        const updatedTask = await task.save();
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//delete task
export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        await task.remove();
        res.status(200).json({ message: 'Task removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }   
};
