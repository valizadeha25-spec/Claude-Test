const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'todos.json');

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Initialize data file if it doesn't exist
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}

// Helper function to read todos
function readTodos() {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
}

// Helper function to write todos
function writeTodos(todos) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(todos, null, 2));
}

// API Routes

// Get all todos
app.get('/api/todos', (req, res) => {
    try {
        const todos = readTodos();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ error: 'Failed to read todos' });
    }
});

// Create a new todo
app.post('/api/todos', (req, res) => {
    try {
        const { text } = req.body;
        if (!text) {
            return res.status(400).json({ error: 'Text is required' });
        }

        const todos = readTodos();
        const newTodo = {
            id: Date.now(),
            text: text,
            completed: false,
            createdAt: new Date().toISOString()
        };

        todos.push(newTodo);
        writeTodos(todos);

        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create todo' });
    }
});

// Update a todo (toggle completion or edit text)
app.put('/api/todos/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { text, completed } = req.body;

        const todos = readTodos();
        const todoIndex = todos.findIndex(t => t.id === id);

        if (todoIndex === -1) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        if (text !== undefined) {
            todos[todoIndex].text = text;
        }
        if (completed !== undefined) {
            todos[todoIndex].completed = completed;
        }

        writeTodos(todos);
        res.json(todos[todoIndex]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update todo' });
    }
});

// Delete a todo
app.delete('/api/todos/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const todos = readTodos();
        const filteredTodos = todos.filter(t => t.id !== id);

        if (filteredTodos.length === todos.length) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        writeTodos(filteredTodos);
        res.json({ message: 'Todo deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete todo' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`✓ Server running at http://localhost:${PORT}`);
    console.log(`✓ API available at http://localhost:${PORT}/api/todos`);
});
