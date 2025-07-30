let tasks = []
let taskIdCounter = 1;

const taskForm = document.getElementById('task-form')
const taskInput = document.getElementById('task-input')
const taskList = document.getElementById('task-list')
const emptyMessage = document.getElementById('empty-message')
const totalTasksSpan = document.getElementById('total-tasks')
const completedTasksSpan = document.getElementById('completed-tasks')
const completionRateSpan = document.getElementById('completion-rate')

// Event Listeners
taskForm.addEventListener('submit', function(event){
    event.preventDefault();
    addTask();
});

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === ''){
        alert('Please enter a task!')
        return;
    }

    const task = {
        id: taskIdCounter++,
        text: taskText,
        complted: false,
        createdAt: new Date()

    };
    tasks.push(task);

    taskInput.value = '';

    renderTasks();
    updateProgress();

    console.log('Task added:', task)
}
function renderTasks(){
    taskList.innerHTML = '';
    if(tasks.length === 0){
        emptyMessage.classList.remove('hidden');
        return;
    } 
    else {
        emptyMessage.classList.add('hidden');
    }

    tasks.forEach(function(task){
        const taskElement = createTaskElement(task);
        taskList.appendChild(taskElement);
    });
}
function createTaskElement(task){
    const taskItem = document.createElement('div');
    taskItem.className = 'task-item';
    if (task.completed){
        taskItem.classList.add('completed');
    }

    const taskText = document.createElement('span');
    taskText.className = 'task-text';
    taskText.textContent = task.text;

    const taskActions = document.createElement('div');
    taskActions.className = task.text;

    const completeBtn = document.createElement('button');
    completeBtn.className = 'complete-btn';
    completeBtn.textContent = task.completed ? 'undo' : 'complete';
    completeBtn.addEventListener('click', function() {
        toggleTask(task.id)
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', function(){
        deleteTask(task.id);
    });

    taskActions.appendChild(completeBtn);
    taskActions.appendChild(deleteBtn);
    taskItem.appendChild(taskText);
    taskItem.appendChild(taskActions);

    return taskItem;

}
// Function to toggle task completion
function toggleTask(taskId) {
    // Find the task in our array
    const task = tasks.find(function(task) {
        return task.id === taskId;
    });
    
    if (task) {
        task.completed = !task.completed;
        renderTasks();
        updateProgress();
        console.log('Task toggled:', task);
    }
}

// Function to delete a task
function deleteTask(taskId) {
    // Ask for confirmation
    if (confirm('Are you sure you want to delete this task?')) {
        // Remove task from array
        tasks = tasks.filter(function(task) {
            return task.id !== taskId;
        });
        
        renderTasks();
        updateProgress();
        console.log('Task deleted, remaining tasks:', tasks);
    }
}

// Function to update progress statistics
function updateProgress() {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(function(task) {
        return task.completed;
    }).length;
    
    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    
    // Update the display
    totalTasksSpan.textContent = totalTasks;
    completedTasksSpan.textContent = completedTasks;
    completionRateSpan.textContent = completionRate + '%';
}

// Initialize the application

// Function to initialize the app
function initApp() {
    console.log('Task Manager initialized!');
    renderTasks();
    updateProgress();
    
    // Focus on input field for better user experience
    taskInput.focus();
}

// Start the application when page loads
document.addEventListener('DOMContentLoaded', initApp);