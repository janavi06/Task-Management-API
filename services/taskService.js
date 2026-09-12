const pool = require("../db");

const getAllTasks = async (userId, sort, limit, offset) => {
    let order = "ASC";

    if (sort === "desc"){
        order = "DESC"
    }
    const result = await pool.query(
        `SELECT * FROM tasks 
        WEHRE user_id = $1
        ORDER BY id ${order} LIMIT $2
        OFFSET $3,` 
        [userId, limit, offset]);
    return result.rows;
};

const getTaskById = async (userId, id) => {
   const result = await pool.query(
     "SELECT * FROM tasks WHERE id = $1 AND user_id = $2",
    [id, userId]
   )
   return result.rows;
};

const createTask = async (userId, title) => {
    const result = await pool.query(
         "INSERT INTO tasks (user_id, title) VALUES ($1, $2) RETURNING *",
        [userId, title]
    )
    return result.rows[0];
} 

const updateTask = async (userId, id, title) => {
    const result = await pool.query(
         `UPDATE tasks SET title = $1 WHERE id = $2 AND user_id = $3 
          RETURNING *`,
        [title, id, userId]
    )
    return result.rows[0];
}

const deleteTask = async (userId, id) => {
    const result = await pool.query(
         "DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *",
        [id, userId]
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