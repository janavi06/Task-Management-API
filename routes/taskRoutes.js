const express = require("express");
const pool = require("../db");
const router = express.Router();
const {getTasks, getTask, 
    createTaskController, 
    updateTaskController,
    deleteTaskController
} = require("../controllers/taskController");

const validateTask = require("../middleware/validateTask");


router.get("/tasks", getTasks);


router.get("/tasks/:id", getTask);


router.post("/tasks", validateTask, createTaskController);


router.patch("/tasks/:id", validateTask, updateTaskController );

router.delete("/tasks/:id", deleteTaskController);


module.exports = router;