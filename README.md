# Task Manager with MySQL and Express.js

This is a simple task manager application built using MySQL for database storage and Express.js for server-side functionality. Users can add, delete, and mark tasks as completed.

## Getting Started

### Prerequisites

Make sure you have the following software installed on your machine:

- [Node.js](https://nodejs.org/)
- [MySQL](https://www.mysql.com/)

### Installation

1. Clone this repository to your local machine.

2. Navigate to the project directory:
   cd task-manager
3. Install dependencies using npm:
   npm install
4. Set up MySQL database:
   
Open MySQL Workbench and run the following SQL script to create the required database and table:

CREATE DATABASE IF NOT EXISTS taskmanager;
USE taskmanager;

CREATE TABLE IF NOT EXISTS tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  task_description VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  task_status ENUM('Pending', 'Completed') DEFAULT 'Pending'
);

## Usage
1. Start the server:
   nodemon db.js
2. Open your web browser and navigate to http://localhost:3000/ to access the Task Manager application.

## Features
**Add Task**: Enter a task description and click "Add Task" to add a new task.

**Delete Task**: Click the "Delete" button to remove a task from the list.

**Mark Task as Completed**: Click the "Complete" button to mark a task as completed.

**View Task List**: See a list of all tasks with their descriptions, completion status, and actions.

## Technologies Used
**Express.js**: Backend server framework for handling HTTP requests.

**MySQL**: Relational database management system for data storage.

**HTML/CSS**: Frontend markup and styling.

**JavaScript (Client-side)**: Client-side scripting for dynamic interaction.
