const express = require("express");
const pool = require("../db");
const router = express.Router();
const {getTasks, getTask, 
    createTaskController, 
    updateTaskController,
    deleteTaskController
} = require("../controllers/taskController");

const validateTask = require("../middleware/validateTask");
const authenticate = require("../middleware/authMiddleware");


router.get("/tasks", authenticate, getTasks);


router.get("/tasks/:id", authenticate, getTask);


router.post("/tasks",authenticate, validateTask, createTaskController);


router.patch("/tasks/:id", authenticate, validateTask, updateTaskController );

router.delete("/tasks/:id",authenticate, deleteTaskController);


module.exports = router;