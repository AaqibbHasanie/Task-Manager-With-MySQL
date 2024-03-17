const express = require("express");
const mysql = require("mysql");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "aaqib",
  database: "taskmanager",
});

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.get("/index", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/tasks", (req, res) => {
  const query = "SELECT * FROM tasks";

  pool.query(query, (error, results) => {
    if (error) {
      console.error("Error retrieving tasks:", error);
      res.status(500).send("Error retrieving tasks from the database");
      return;
    }

    res.json(results);
  });
});

app.post("/tasks", (req, res) => {
  const {
    task_description
  } = req.body;
  if (!task_description) {
    return res.status(400).send("Task description is required");
  }

  const created_at = new Date();
  const task_status = "Pending";

  const query =
    "INSERT INTO tasks (task_description, created_at, task_status) VALUES (?, ?, ?)";

  pool.query(
    query,
    [task_description, created_at, task_status],
    (error, results) => {
      if (error) {
        console.error("Error adding task:", error);
        res.status(500).send("Error adding task to the database");
        return;
      }
      res.status(201).send("Task added successfully");
    }
  );
});

app.delete("/tasks/:id", (req, res) => {
  const taskId = req.params.id;

  const query = "DELETE FROM tasks WHERE id = ?";

  pool.query(query, taskId, (error, results) => {
    if (error) {
      console.error("Error deleting task:", error);
      res.status(500).send("Error deleting task from the database");
      return;
    }

    if (results.affectedRows === 0) {
      res.status(404).send("Task not found");
      return;
    }
    res.status(200).send("Task deleted successfully");
  });
});

app.put("/tasks/:id/status", (req, res) => {
  const taskId = req.params.id;
  const newStatus = req.body.task_status;

  const query = "UPDATE tasks SET task_status = ? WHERE id = ?";

  pool.query(query, [newStatus, taskId], (error, results) => {
    if (error) {
      console.error("Error updating task status:", error);
      res.status(500).send("Error updating task status in the database");
      return;
    }

    if (results.affectedRows === 0) {
      res.status(404).send("Task not found");
      return;
    }
    res.status(200).send("Task status updated successfully");
  });
});

app.use("/", (req, res, next) => {
  res.redirect("/index");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
