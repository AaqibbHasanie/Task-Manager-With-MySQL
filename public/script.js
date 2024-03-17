document.addEventListener("DOMContentLoaded", function () {
  let tasksData = [];
  const taskList = document.getElementById("task-list");
  const taskForm = document.getElementById("task-form");

  function deleteTask(taskId) {
    fetch(`/tasks/${taskId}`, {
        method: "DELETE",
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete task");
        }
        fetchTasks();
      })
      .catch((error) => console.error("Error deleting task:", error));
  }

  function completeTask(taskId) {

    fetch(`/tasks/${taskId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          task_status: "Completed"
        }),
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to complete task");
        }
        fetchTasks();
      })
      .catch((error) => console.error("Error completing task:", error));
  }

  function renderTasks(tasks) {
    taskList.innerHTML = "";

    tasks.forEach((task) => {
      const row = `
      <tr>
        <td>${task.id}</td>
        <td>${task.task_description}</td>
        <td>${task.task_status}</td>
        <td>
          ${
            !task.completed
              ? `<button class="complete-btn" data-task-id="${task.id}">Complete</button>`
              : ""
          }
          <button class="delete-btn" data-task-id="${task.id}">Delete</button>
        </td>
      </tr>
    `;
      taskList.insertAdjacentHTML("beforeend", row);
    });

    const deleteButtons = taskList.querySelectorAll(".delete-btn");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const taskId = button.dataset.taskId;
        deleteTask(taskId);
      });
    });


    const completeButtons = taskList.querySelectorAll(".complete-btn");
    completeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const taskId = button.dataset.taskId;
        completeTask(taskId);
      });
    });
  }

  function fetchTasks() {
    fetch("/tasks")
      .then((response) => response.json())
      .then((data) => {

        tasksData = data.map((task) => ({
          ...task,
          completed: task.task_status === "Completed",
        }));
        renderTasks(tasksData);
      })
      .catch((error) => console.error("Error fetching tasks:", error));
  }

  taskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const taskInput = document.getElementById("task-input");
    const taskDescription = taskInput.value.trim();

    if (!taskDescription) {
      alert("Task description cannot be empty");
      return;
    }

    const newTask = {
      task_description: taskDescription
    };

    fetch("/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add task");
        }
        taskInput.value = "";
        fetchTasks();
      })
      .catch((error) => console.error("Error adding task:", error));
  });

  fetchTasks();
});
