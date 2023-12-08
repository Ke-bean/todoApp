document.addEventListener('DOMContentLoaded', function () {
    // Check local storage for saved tasks
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    renderTasks(savedTasks);
});

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const task = {
            text: taskText,
            important: false,
        };

        // Retrieve tasks from local storage
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        // Add new task
        tasks.unshift(task);

        // Save tasks to local storage
        localStorage.setItem('tasks', JSON.stringify(tasks));

        // Render updated tasks
        renderTasks(tasks);

        // Clear input field
        taskInput.value = '';
    }
}

function deleteTask(index) {
    // Retrieve tasks from local storage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Remove task at the specified index
    tasks.splice(index, 1);

    // Save updated tasks to local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Render updated tasks
    renderTasks(tasks);
}

function toggleImportant(index) {
    // Retrieve tasks from local storage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Toggle the 'important' status of the task at the specified index
    tasks[index].important = !tasks[index].important;

    // Save updated tasks to local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Render updated tasks
    renderTasks(tasks);
}

function renderTasks(tasks) {
    const taskList = document.getElementById('taskList');

    // Clear existing tasks
    taskList.innerHTML = '';

    // Render each task
    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span style="${task.important ? 'color: red;' : ''}">${task.text}</span>
            <div>
                <button onclick="toggleImportant(${index})">Toggle Important</button>
                <button onclick="deleteTask(${index})">Delete</button>
            </div>
        `;
        taskList.appendChild(listItem);
    });
}
