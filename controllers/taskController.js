const { response } = require("express");
const { get } = require("../routes/taskRoutes");
const { getAllTasks, getTaskById, createTask, updateTask, deleteTask } = require("../services/taskService");

const getTasks = async (request,response) => {

    const sort = request.query.sort;

    const tasks = await getAllTasks(sort);
    response.send(tasks);
};

const getTask = async (request, response) => {
    const id = Number(request.params.id);

    const tasks = await getTaskById(id);

    if (tasks.length === 0) {
        response.status(404).json({
            error: "Task not found"
        });
    } else {
        response.send(tasks[0]);
    }
};

const createTaskController = async (request, response) => {
    const title = request.body.title;

    const task = await createTask(title);
    response.status(201).send(task);
}

const updateTaskController = async (request,response) => {
    const id = Number(request.params.id);
    const title = request.body.title;
    
    const task = await updateTask(id, title);


     if (task === undefined) {
        response.status(404).json({
            error: "Task Not found"
        });
    } else {
        response.send(task);
    }  
}

const deleteTaskController = async (request, response) => {
    const id = Number(request.params.id);

    const task = await deleteTask(id);

    if (task === undefined) {
        response.status(404).json({
            error: "Task not found"
        });
    } else {
        response.send(task);
    }

}

module.exports= {
    getTasks,
    getTask,
    createTaskController,
    updateTaskController,
    deleteTaskController
};