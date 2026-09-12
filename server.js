const express = require("express");
const { request } = require("node:http");
const pool = require("./db");

const authRoutes = require("./routes/authRoutes");

const taskRoutes = require("./routes/taskRoutes");

const app = express();
app.use(express.json());

app.get("/health", (request, response) => {
    response.json({
        status: "ok"
    })
})

app.use(taskRoutes);
app.use(authRoutes);


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

const server = app.listen(3000, () => {
    console.log("Server is running on port 3000");
})

const shutdown = async () => {
    console.log("shuting down server...");

    server.close(async () => {
        // close the connection pool cleanly
        await pool.end();

        console.log("Server shut down");
        process.exit(0);
    })
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);


