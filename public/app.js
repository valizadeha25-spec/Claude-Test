// API Base URL
const API_URL = '/api/todos';

// DOM Elements
const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const emptyState = document.getElementById('emptyState');
const totalTasksEl = document.getElementById('totalTasks');
const completedTasksEl = document.getElementById('completedTasks');

// State
let todos = [];

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    loadTodos();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    addBtn.addEventListener('click', addTodo);
    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    });
}

// Load todos from API
async function loadTodos() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to load todos');

        todos = await response.json();
        renderTodos();
    } catch (error) {
        console.error('Error loading todos:', error);
        showNotification('Failed to load todos', 'error');
    }
}

// Add a new todo
async function addTodo() {
    const text = todoInput.value.trim();

    if (!text) {
        todoInput.focus();
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text }),
        });

        if (!response.ok) throw new Error('Failed to add todo');

        const newTodo = await response.json();
        todos.push(newTodo);
        todoInput.value = '';
        renderTodos();
        showNotification('Task added successfully!', 'success');
    } catch (error) {
        console.error('Error adding todo:', error);
        showNotification('Failed to add task', 'error');
    }
}

// Toggle todo completion
async function toggleTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ completed: !todo.completed }),
        });

        if (!response.ok) throw new Error('Failed to update todo');

        todo.completed = !todo.completed;
        renderTodos();
    } catch (error) {
        console.error('Error toggling todo:', error);
        showNotification('Failed to update task', 'error');
    }
}

// Delete a todo
async function deleteTodo(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) throw new Error('Failed to delete todo');

        todos = todos.filter(t => t.id !== id);
        renderTodos();
        showNotification('Task deleted', 'success');
    } catch (error) {
        console.error('Error deleting todo:', error);
        showNotification('Failed to delete task', 'error');
    }
}

// Render todos to the DOM
function renderTodos() {
    // Clear the list
    todoList.innerHTML = '';

    // Update stats
    const completedCount = todos.filter(t => t.completed).length;
    totalTasksEl.textContent = `Total: ${todos.length}`;
    completedTasksEl.textContent = `Completed: ${completedCount}`;

    // Show/hide empty state
    if (todos.length === 0) {
        emptyState.classList.remove('hidden');
    } else {
        emptyState.classList.add('hidden');
    }

    // Render each todo
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;

        li.innerHTML = `
            <input
                type="checkbox"
                class="todo-checkbox"
                ${todo.completed ? 'checked' : ''}
                onchange="toggleTodo(${todo.id})"
            >
            <span class="todo-text">${escapeHtml(todo.text)}</span>
            <div class="todo-actions">
                <button class="delete-btn" onclick="deleteTodo(${todo.id})">Delete</button>
            </div>
        `;

        todoList.appendChild(li);
    });
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Show notification (simple version)
function showNotification(message, type) {
    console.log(`[${type.toUpperCase()}] ${message}`);
    // You can enhance this with a toast notification library
}
