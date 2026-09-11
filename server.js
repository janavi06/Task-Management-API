const express = require("express");
const { request } = require("node:http");
const pool = require("./db");

const taskRoutes = require("./routes/taskRoutes");

const app = express();
app.use(express.json());
app.use(taskRoutes);

pool.query("SELECT NOW()")
    .then(result => {
        console.log(result.rows);
    })
    .catch(error => {
        console.log(error);
    });


app.use((error, request,response, next) => {
    console.log(error);

    response.status(500).json({
        error: "Internal server error"
    });
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})


