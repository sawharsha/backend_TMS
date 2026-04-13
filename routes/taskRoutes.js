const express = require('express');

const{ createTask, getTasks,updateTask, deleteTask } = require('../controllers/taskController');

const protect = require('../middlewares/authMiddleware');

const authorizeRoles = require('../middlewares/roleMiddleware');

const router = express.Router();

// Create a new task
router.post('/', 
    protect,
    authorizeRoles('trainer'),
    createTask
);

// Get all tasks
router.get('/', 
    protect,
    getTasks
);

// update a task
router.put('/:id', 
    protect,
    authorizeRoles('trainer'),
    updateTask
);

// delete a task
router.delete('/:id', 
    protect,
    authorizeRoles('trainer'),
    deleteTask
);
module.exports = router;