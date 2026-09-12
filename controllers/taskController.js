const { response } = require("express");
const { get } = require("../routes/taskRoutes");
const { getAllTasks, getTaskById, createTask, updateTask, deleteTask } = require("../services/taskService");

const getTasks = async (request,response) => {

    const userId = request.user.userId;
    const sort = request.query.sort;
    const limit = Number(request.query.limit) || 10;
    const offset = Number(request.query.offset) || 0;

    const tasks = await getAllTasks(sort, limit, offset);
    response.send(tasks);
};
// IDOR(insecure direct object refrence) problem

const getTask = async (request, response) => {
    const id = Number(request.params.id);
    const userId = request.user.userId;

    const tasks = await getTaskById(userId, id);


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
    const userId = request.user.userId;
    const task = await createTask(userId, title);
    response.status(201).send(task);
}

const updateTaskController = async (request,response) => {
    const id = Number(request.params.id);
    const title = request.body.title;
    const user = request.user.userId;
    
    const task = await updateTask(userId, id, title);


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
    const user = request.user.userId;

    const task = await deleteTask(userId,id);

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