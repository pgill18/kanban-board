// Initial tasks data
const initialTasks = [
    {
        id: 1,
        title: "Set up project repository",
        priority: "high",
        dueDate: "2024-11-15",
        column: "backlog"
    },
    {
        id: 2,
        title: "Define user authentication flow",
        priority: "medium",
        dueDate: null,
        column: "backlog"
    }
];

// Task counter for generating unique IDs
let taskIdCounter = 3;

// Initialize the board
function initBoard() {
    // Load tasks from localStorage or use initial tasks
    const savedTasks = localStorage.getItem('kanbanTasks');
    const tasks = savedTasks ? JSON.parse(savedTasks) : initialTasks;
    
    // Clear all columns
    document.querySelectorAll('.tasks').forEach(column => {
        column.innerHTML = '';
    });
    
    // Render each task
    tasks.forEach(task => {
        renderTask(task);
    });
    
    // Update all column counts and WIP limit
    updateAllColumnCounts();
    checkWIPLimit();
    
    // Set up drag and drop
    setupDragAndDrop();
}

// Create a task element
function createTaskElement(task) {
    const taskDiv = document.createElement('div');
    taskDiv.className = 'task';
    taskDiv.draggable = true;
    taskDiv.dataset.taskId = task.id;
    taskDiv.dataset.priority = task.priority;
    
    const taskHeader = document.createElement('div');
    taskHeader.className = 'task-header';
    
    const taskTitle = document.createElement('div');
    taskTitle.className = 'task-title';
    taskTitle.textContent = task.title;
    
    const priorityBadge = document.createElement('span');
    priorityBadge.className = `priority-badge ${task.priority}`;
    priorityBadge.textContent = task.priority;
    
    taskHeader.appendChild(taskTitle);
    taskHeader.appendChild(priorityBadge);
    taskDiv.appendChild(taskHeader);
    
    // Add due date if available
    if (task.dueDate) {
        const dueDiv = document.createElement('div');
        dueDiv.className = 'task-due';
        const dueDate = new Date(task.dueDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        dueDiv.textContent = `Due: ${formatDate(dueDate)}`;
        
        if (dueDate < today) {
            dueDiv.classList.add('overdue');
        }
        
        taskDiv.appendChild(dueDiv);
    }
    
    return taskDiv;
}

// Format date to readable format
function formatDate(date) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

// Render a task to its column
function renderTask(task) {
    const column = document.getElementById(task.column);
    if (column) {
        const taskElement = createTaskElement(task);
        column.appendChild(taskElement);
    }
}

// Update column task count
function updateColumnCount(columnId) {
    const column = document.querySelector(`[data-column="${columnId}"]`);
    const tasks = column.querySelector('.tasks');
    const count = tasks.children.length;
    const countBadge = column.querySelector('.task-count');
    countBadge.textContent = count;
}

// Update all column counts
function updateAllColumnCounts() {
    ['backlog', 'todo', 'in-progress', 'in-review', 'done'].forEach(columnId => {
        updateColumnCount(columnId);
    });
}

// Check WIP limit for In Progress column
function checkWIPLimit() {
    const inProgressColumn = document.querySelector('[data-column="in-progress"]');
    const tasks = inProgressColumn.querySelector('.tasks');
    const taskCount = tasks.children.length;
    const WIP_LIMIT = 3;
    
    if (taskCount > WIP_LIMIT) {
        inProgressColumn.classList.add('wip-exceeded');
    } else {
        inProgressColumn.classList.remove('wip-exceeded');
    }
}

// Get all tasks from the DOM
function getAllTasks() {
    const tasks = [];
    document.querySelectorAll('.task').forEach(taskElement => {
        const columnElement = taskElement.closest('.tasks');
        const columnId = columnElement.id;
        const taskId = parseInt(taskElement.dataset.taskId);
        
        // Find the task data
        const title = taskElement.querySelector('.task-title').textContent;
        const priority = taskElement.dataset.priority;
        const dueDateElement = taskElement.querySelector('.task-due');
        let dueDate = null;
        
        if (dueDateElement) {
            const dateText = dueDateElement.textContent.replace('Due: ', '');
            // Convert back to ISO format
            const date = new Date(dateText);
            if (!isNaN(date.getTime())) {
                dueDate = date.toISOString().split('T')[0];
            }
        }
        
        tasks.push({
            id: taskId,
            title: title,
            priority: priority,
            dueDate: dueDate,
            column: columnId
        });
    });
    
    return tasks;
}

// Save tasks to localStorage
function saveTasks() {
    const tasks = getAllTasks();
    localStorage.setItem('kanbanTasks', JSON.stringify(tasks));
}

// Setup drag and drop functionality
function setupDragAndDrop() {
    const tasks = document.querySelectorAll('.task');
    const columns = document.querySelectorAll('.tasks');
    
    // Task drag events
    tasks.forEach(task => {
        task.addEventListener('dragstart', handleDragStart);
        task.addEventListener('dragend', handleDragEnd);
    });
    
    // Column drop events
    columns.forEach(column => {
        column.addEventListener('dragover', handleDragOver);
        column.addEventListener('drop', handleDrop);
        column.addEventListener('dragleave', handleDragLeave);
    });
}

let draggedElement = null;

function handleDragStart(e) {
    draggedElement = this;
    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragEnd(e) {
    this.classList.remove('dragging');
    
    // Remove drag-over class from all columns
    document.querySelectorAll('.tasks').forEach(column => {
        column.classList.remove('drag-over');
    });
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    
    e.dataTransfer.dropEffect = 'move';
    this.classList.add('drag-over');
    
    return false;
}

function handleDragLeave(e) {
    this.classList.remove('drag-over');
}

function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    
    e.preventDefault();
    this.classList.remove('drag-over');
    
    if (draggedElement !== null) {
        // Move the task
        this.appendChild(draggedElement);
        
        // Update counts and WIP limit
        updateAllColumnCounts();
        checkWIPLimit();
        
        // Save to localStorage
        saveTasks();
    }
    
    return false;
}

// Initialize the board when the page loads
document.addEventListener('DOMContentLoaded', initBoard);
