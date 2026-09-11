const pool = require("../db");

const getAllTasks = async (sort) => {
    const result = await pool.query(
        "SELECT * FROM tasks ORDER BY id ASC");
    return result.rows;
};

const getTaskById = async (id) => {
   const result = await pool.query(
     "SELECT * FROM tasks WHERE id = $1",
    [id]
   )
   return result.rows;
};

const createTask = async (title) => {
    const result = await pool.query(
         "INSERT INTO tasks (title) VALUES ($1) RETURNING *",
        [title]
    )
    return result.rows[0];
} 

const updateTask = async (id, title) => {
    const result = await pool.query(
         "UPDATE tasks SET title = $1 WHERE id = $2 RETURNING *",
        [title, id]
    )
    return result.rows[0];
}

const deleteTask = async (id) => {
    const result = await pool.query(
         "DELETE FROM tasks WHERE id = $1 RETURNING *",
        [id]
    )

    return result.rows[0];
}

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
};