# To-Do List App

A simple, full stack to-do list application built with Node.js/Express backend and vanilla JavaScript frontend.

## Features

- Create, read, update, and delete tasks
- Mark tasks as complete/incomplete
- Real-time statistics (total tasks and completed count)
- Responsive design with smooth animations
- File-based persistence (JSON)
- RESTful API architecture

## Tech Stack

**Backend:**
- Node.js
- Express.js
- File system-based storage

**Frontend:**
- HTML5
- CSS3 (with animations and gradient backgrounds)
- Vanilla JavaScript (Fetch API)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

### Running the Application

Start the server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

### API Endpoints

- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create a new todo (requires `{text: string}` in body)
- `PUT /api/todos/:id` - Update a todo (accepts `{text: string}` and/or `{completed: boolean}`)
- `DELETE /api/todos/:id` - Delete a todo

## Project Structure

```
.
├── server.js           # Express server and API routes
├── package.json        # Project dependencies
├── todos.json          # Data storage (created automatically)
└── public/
    ├── index.html      # Frontend HTML
    ├── style.css       # Styling and animations
    └── app.js          # Frontend JavaScript
```

## Usage

1. Type a task in the input field
2. Click "Add Task" or press Enter
3. Check the checkbox to mark a task as complete
4. Click "Delete" to remove a task
5. View statistics at the top showing total and completed tasks